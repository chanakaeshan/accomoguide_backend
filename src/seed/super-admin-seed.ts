import UserStatus from "../enums/UserStatus";
import UserType from "../enums/UserType";
import { DUser } from "../models/user-model";
import User from "../schemas/user-schema";

export default async function seedSuperAdmin() {
  const data01: DUser = {
    name: "Web Master",
    email: "webmaster@mail.com",
    userType: UserType.WEB_MASTER,
    password: "abc123",
    userStatus: UserStatus.ACTIVE,
  };

  const webMaster = await createWebMaster(data01);

  return [webMaster];
}

async function createWebMaster(data: DUser) {
  const existingUser = await User.findOne({ email: data.email });
  if (existingUser) {
    return existingUser;
  }
  return await User.create(data);
}
