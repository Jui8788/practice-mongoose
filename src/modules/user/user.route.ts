//  /create-admin, superAdmin,admin [post]
// /:userId- admin, superAdmin [put]
// /:userId-  [get]
// /me - user own data. [put]

import express from "express";
import { UserControllers } from "./user.controller";
import validateRequest from "../../middleware/validateRequest";
import { UserValidations } from "./user.validation";
import { auth } from "../../middleware/auth";
import { USER_ROLE } from "./user.constant";

const router = express.Router();

router.post(
  "/create-admin",
  auth(USER_ROLE.ADMIN, USER_ROLE.SUPER_ADMIN),
  validateRequest(UserValidations.createAdminValidations),
  UserControllers.createAdmin
);

router.put(
  "/:userId",
  auth(USER_ROLE.ADMIN, USER_ROLE.SUPER_ADMIN),
  validateRequest(UserValidations.updateUserValidations),
  UserControllers.updateUser
);

router.put(
  "/me",
  auth(USER_ROLE.ADMIN, USER_ROLE.SUPER_ADMIN, USER_ROLE.USER),
  validateRequest(UserValidations.updateUserValidations),
  UserControllers.updateUser
);

export const UserRoutes = router;

//login /api/auth/login
//register /api/users/create-student : /api/auth/register
//forgot password /api/auth/forgot-password
//refresh token /api/auth/refresh-token
