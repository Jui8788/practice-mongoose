//  /create-admin, superAdmin,admin post
// /:authId- admin, superAdmin put
// /:authId-  get
// /me - auth own data. put
//

import express from "express";
import { authControllers } from "./auth.controller";

const router = express.Router();

router.post("/register", authControllers.register);
router.post("/login", authControllers.login);

export const AuthRoutes = router;

//login /api/auth/login
//register /api/auth/create-student : /api/auth/register
//forgot password /api/auth/forgot-password
//refresh token /api/auth/refresh-token
