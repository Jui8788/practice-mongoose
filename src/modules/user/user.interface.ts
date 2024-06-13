import { USER_ROLE, USER_STATUS } from "./user.constant";

export type TUSER = {
  name: string;
  role: keyof typeof USER_ROLE;
  email: string;
  password: string;
  status: keyof typeof USER_STATUS;
  passwordChangedAt?: Date;
};
