import UserModel from "../Models/user.model.js";
import bcryptjs from "bcryptjs";
import generatedAccessToken from "../Utils/genaratedAccessToken.js";
import generatedRefreshToken from "../Utils/genaratedRefreshToken.js";
import { generateRandomString } from "../Utils/genarateRoomid.js";
import NotificationModel from "../Models/notification.model.js";
import { findRelevantTag } from "../Utils/genarateTag.js";
import { publishTask } from "../Queue/publisher.js";

export async  function loginController(req,res){
    try {
        const {email,password} = req.body ;
        if(!email || !password){
            return res.status(400).json({
                message : "All fields are required",
                error : true ,
                success : false 
            })
        }
        const user = await UserModel.findOne({email})
        if(!user){
            return res.status(400).json({
                message : "User not found",
                error : true ,
                success : false 
            })
        }
        const isMatch = await bcryptjs.compare(password,user.password)
        if(!isMatch){
            return res.status(400).json({
                message : "Invalid password",
                error : true ,
                success : false 
            })
        }
        const accessToken = await generatedAccessToken(user._id)
        const refreshToken = await generatedRefreshToken(user._id)
        // persist refresh token
        await UserModel.findByIdAndUpdate(user._id, { refresh_token: refreshToken });

        const isProd = process.env.NODE_ENV === 'production'
        const cookiesOption = {
            httpOnly: true,
            secure: isProd, // secure only in production (https)
            sameSite: isProd ? 'None' : 'Lax'
        }

        res.cookie('accessToken',accessToken,cookiesOption)
        res.cookie('refreshToken',refreshToken,cookiesOption)

        return res.json({
            message : "Login Successfully",
            error : false ,
            success : true ,
            data : {
                accessToken,
                refreshToken
            }
        })

    } catch (error) {
        return res.status(500).json({
            message : "Internal Server Error",
            error : true ,
            success : false 
        })
    }
}

export async function logoutController(req,res){
        try {
            const userid = req.userId
            const isProd = process.env.NODE_ENV === 'production'
            const cookiesOption = {
                httpOnly: true,
                secure: isProd,
                sameSite: isProd ? 'None' : 'Lax'
            }
            res.clearCookie("accessToken",cookiesOption);
            res.clearCookie("refreshToken",cookiesOption);
            const removeRefreshToken = await UserModel.findByIdAndUpdate(userid,{
                refresh_token : ""
            })
    
            res.json({
                message : "Successfully Loggedout",
                error : false ,
                success : true
            })
        } catch (error) {
            return res.status(500).json({
                message : error.message || error,
                error : true ,
                success : false 
            })
        }
}

export async function registerController(req,res){
    try {
        const {username , email , password , skills} = req.body ;
        if(!username || !email || !password){
            return res.status(400).json({
                message : "All fields are required",
                error : true ,
                success : false 
            })
        }

        const userbyemail = await UserModel.findOne({email})
        const userbyname = await UserModel.findOne({username})

        if(userbyemail){
            return res.status(400).json({
                message : "Email already exists",
                error : true ,
                success : false 
            })
        }
        if(userbyname){
            return res.status(400).json({
                message : "Username already exists",
                error : true ,
                success : false 
            })
        }

        const salt = await bcryptjs.genSalt(10)
        const hashpassword = await bcryptjs.hash(password,salt)
        const payload = {
            username,
            email ,
            password : hashpassword
        }

        const newuser = new UserModel({username,email,password : hashpassword,skills: skills || []})
        const save = await newuser.save()

        return res.json({
            message : "User Register Successfully ",
            error : false ,
            success : true ,
            data : save
        })

    } catch (error) {
        console.error("Registration error:", error);
        return res.status(500).json({
            message : "Internal Server Error",
            error : true ,
            success : false 
        }) 
    }
}

export async function getProfileController(req,res){
    try {
        const userid = req.userId ;
        const user = await UserModel.findById(userid).select("-password -refresh_token -__v");
        if(!user){
            return res.status(404).json({
                message : "User not found",
                error : true ,
                success : false 
            })
        }
        return res.status(200).json({
            message : "Profile fetched successfully" ,
            error : false ,
            success : true ,
            data : user
        })
    } catch (error) {
        console.error("Get Profile failed :", error);
        return res.status(500).json({
            message : "Internal Server Error",
            error : true ,
            success : false 
        }) 
    }
}

export async function isLoginController (req,res){
    try {
        // If auth middleware passed, userId exists and token is valid
        const userid = req.userId;
        if (!userid) {
            return res.status(401).json({
                message: "User not logged in",
                error: true,
                success: false
            })
        }
        return res.status(200).json({
            message: "User is logged in",
            error: false,
            success: true
        })
    } catch (error) {
        console.error("Is Login check failed :", error);
        return res.status(500).json({
            message : "Internal Server Error",
            error : true ,
            success : false 
        }) 
    }
}

export async function fetchMyCoinController(req,res){
    try {
        const userid = req.userId ;

        const user = await UserModel.findById(userid).select("coins");

        if(!user){
            return res.status(404).json({
                message : "User not found",
                error : true ,
                success : false 
            })
        }

        return res.status(200).json({
            message : "Coins fetched successfully" ,
            error : false ,
            success : true ,
            coins : user.coins
        })
    } catch (error) {
        console.error("Fetch My Coin failed :", error);
        return res.status(500).json({
            message : "Internal Server Error",
            error : true ,
            success : false 
        }) 
    }
}

export async function updateProfileController(req,res){
    try {
        const {new_username ,new_password , new_skills } = req.body ;
        const userid = req.userId; 

        if( !new_username || !new_password || !new_skills ){
            return res.status(400).json({
                message : "Pass the required inputs " , 
                error : true ,
                success : false 
            })
        }
        const existingUser = await UserModel.findOne({ 
            username: new_username, 
            _id: { $ne: userid } 
        });
        
        if(existingUser){
            return res.status(400).json({
                message : "Username already exists",
                error : true ,
                success : false 
            })
        }

        const salt = await bcryptjs.genSalt(10);
        const hashpassword = await bcryptjs.hash(new_password, salt);

        const update_user = await UserModel.findByIdAndUpdate(userid , {
            username : new_username ,
            password : hashpassword ,
            skills : new_skills
        }, { new: true }) 

        return res.status(200).json({
            message : "Profile Updated" , 
            error : false ,
            success : true ,
            data : update_user
        })

    }
    catch (error) {
        console.error("Update Profile failed :", error);
        return res.status(500).json({
            message : "Internal Server Error",
            error : true ,
            success : false 
        }) 
    }
}

export async function fetchNotications(req,res){
    try {
        const userid = req.userId ;
        const user_notifications = await UserModel.findById(userid).populate("notifications");
        return res.status(200).json({
            message : "Notifications fetched successfully" ,
            error : false ,
            success : true ,
            data : user_notifications
        })
    }
    catch (error) {
        console.error("Fetch Notifications failed :", error);
        return res.status(500).json({
            message : "Internal Server Error",
            error : true ,
            success : false 
        }) 
    }
}

export async function submitPromptController(req,res){
    try {
        const {prompt} = req.body ;
        const userid = req.userId ;

        const relevant_tag = await findRelevantTag(prompt);
        const roomid =  generateRandomString();

        const new_notification = new NotificationModel({
            userId:userid,
            prompt:prompt,
            tag:relevant_tag,
            roomId:roomid
        })
        
        const save_notification = await new_notification.save() ;

        await publishTask({
            notificationId:save_notification._id,
            tag:relevant_tag,
        })

        return res.status(200).json({
            message : "Prompt submitted successfully" ,
            error : false ,
            success : true ,
            roomId: roomid,
            data : save_notification
        })
    } catch (error) {
        console.log("Submit Prompt failed : ", error.message) ;
        return res.status(500).json({
            message : "Internal server error " ,
            error : true , 
            success : false 
        })
    }
}

// export async function transactionController(req,res){
//     try {
//         const userid = req.userId ;
//         const { from , to , amount } = req.body ;
//         const user_transactions = await TransactionModel.find({
//             user:userid,
//             createdAt:{$gte:from,$lte:to}
//         });
        
//         return res.status(200).json({
//             message : "Transactions fetched successfully" ,
//             error : false ,
//             success : true ,
//             data : user_transactions
//         })
//     }
//     catch (error) {
//         console.error("Fetch Transactions failed :", error);
//         return res.status(500).json({
//             message : "Internal Server Error",
//             error : true ,
//             success : false 
//         }) 
//     }
// }