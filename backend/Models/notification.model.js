import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  tag: { type: String, required: true },
  prompt: { type: String, required: true },
  roomId : {type: String},
  read: { type: Boolean, default: false }
});

const NotificationModel = mongoose.model('Notification', notificationSchema);
export default NotificationModel;