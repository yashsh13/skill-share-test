import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username : {type: String, required: true, unique: true},
    email : {type: String, required: true, unique: true},
    password : {type: String, required: true},
    refresh_token: {type : String ,default : ""},
    coins : {type: Number, default: 10},
    skills : [{type: String}],
    notifications : [{type: mongoose.Schema.Types.ObjectId, ref: "Notification"}],
    transactions : [{type: mongoose.Schema.Types.ObjectId, ref: "Transaction"}]
},{
    timestamps : true
})

const UserModel = mongoose.model("User", userSchema)
export default UserModel