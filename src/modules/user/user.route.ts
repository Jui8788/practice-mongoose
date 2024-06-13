//  /create-admin, superAdmin,admin [post]
// /:userId- admin, superAdmin [put]
// /:userId-  [get]
// /me - user own data. [put]

import express from "express";
import { UserControllers } from "./user.controller";
import validateRequest from "../../middleware/validateRequest";
import { UserValidations } from "./user.validation";

const router = express.Router();

router.post(
  "/create-admin",
  validateRequest(UserValidations.createAdminValidations),
  UserControllers.createAdmin
);

router.put(
  "/:userId",
  validateRequest(UserValidations.updateUserValidations),
  UserControllers.updateUser
);

export const UserRoutes = router;

//login /api/auth/login
//register /api/users/create-student : /api/auth/register
//forgot password /api/auth/forgot-password
//refresh token /api/auth/refresh-token
