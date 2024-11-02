import {userModel} from "../models/userModel";

const getUserByEmailIdAndPassword = (email: string, password: string) => {
  let user = userModel.findOne(email);
  if (!user) {
    return { user: null, message: `Couldn't find user with email: ${email}` };
  }
  if (!isUserValid(user, password)) {
    return { user: null, message: 'Password is incorrect' };
  }
  return { user, message: null };
};

const getUserById = (id: string) : Express.User | null => {
  let user = userModel.findById(id);
  if (user) {
    return user;
  }
  return null;
};

function isUserValid(user: Express.User, password: string) : boolean {
  return user.password === password;
}

export {
  getUserByEmailIdAndPassword,
  getUserById,
};
