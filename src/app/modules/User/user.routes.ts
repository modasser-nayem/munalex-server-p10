import { Router } from "express";
import userControllers from "./user.controllers";
import requestValidate from "../../middlewares/requestValidation";
import { userValidationSchemas } from "./user.validation";

const router = Router();

// Register new user
router.post(
  "/register",
  requestValidate(userValidationSchemas.userRegisterValidationSchema),
  userControllers.registerUser,
);

// Login user
router.post(
  "/login",
  requestValidate(userValidationSchemas.userLoginValidationSchema),
  userControllers.loginUser,
);

// get user profile
router.get("/me", userControllers.getMe);

const userRoutes = router;
export default userRoutes;
