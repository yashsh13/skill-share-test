import { startConsumer } from "../Queue/consumer.js";
import UserModel from "../Models/user.model.js";
import dotenv from "dotenv"
dotenv.config()
import connectDB from "../Configs/connectDB.js";
await connectDB();

async function workHandler(task){
    try{
        const {notificationId,tag} = task;
        if(!tag || !notificationId){
            return;
        }
        // await connectDB();

        // Find users whose skills array contains the tag
        const recipientUsers = await UserModel.find({
            skills: tag
        }).select("_id");

        if(recipientUsers.length === 0){
            return;
        }

        // Bulk add the notificationId to each recipient's notifications array
        const bulkOps = recipientUsers.map(u => ({
            updateOne: {
                filter: { _id: u._id },
                update: { $addToSet: { notifications: notificationId } }
            }
        }));

        await UserModel.bulkWrite(bulkOps);
    }
    catch(error){
        console.error("Worker failed:", error);
    }
}

startConsumer(workHandler); 