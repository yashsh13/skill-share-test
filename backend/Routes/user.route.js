import {Router} from "express";
import auth from "../Middlewares/auth.js";
import { registerController , loginController , updateProfileController ,fetchNotications , submitPromptController, logoutController, getProfileController, isLoginController, fetchMyCoinController } from "../Controllers/user.controller.js";

const UserRouter = Router();

UserRouter.post("/register", registerController);
UserRouter.post("/login", loginController);
UserRouter.post("/logout", auth , logoutController);
UserRouter.post("/me", auth, isLoginController);
UserRouter.post("/mycoins", auth, fetchMyCoinController);
UserRouter.get("/get-profile", auth , getProfileController)
UserRouter.put("/update-profile", auth , updateProfileController);
UserRouter.post("/submit-prompt", auth , submitPromptController);
UserRouter.get("/fetch-notifications", auth , fetchNotications);

export default UserRouter;