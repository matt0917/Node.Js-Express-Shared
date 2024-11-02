import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { getUserByEmailIdAndPassword, getUserById} from "../../controllers/userController";
import { PassportStrategy } from '../../interfaces/index';

const localStrategy = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
  },
  (email, password, done) : void => {
    const {user, message} = getUserByEmailIdAndPassword(email, password);
    if (!user) {
      return done(null, false, { message });
    }
    return done(null, user);
  }
);

/*
FIXED (types)
*/
// req.session.passport.user
// This is called by the login() function under the hood, which is invoked after the done() function 
// in the LocalStrategy() above -> authenticate() function in authRoute.ts
passport.serializeUser(function (user: Express.User, done: Function) : void  {
  // stores entire current user object to the created var. : req.user 
  done(null, user.id);
});

/*
FIXED (types)
*/
// called when the user is in the protected page(dashboard), using refresh(F5)
passport.deserializeUser(function (id: string, done: Function) : void {
  let user = getUserById(id);
  if (user) {
    // re assign the user object, after verification with user id, to the var: req.user
    // so we always have the most up to date user object(information)
    done(null, user);
  } else {
    done({ message: "User not found" }, null);
  }
});

const passportLocalStrategy: PassportStrategy = {
  name: 'local',
  strategy: localStrategy,
};

export default passportLocalStrategy;
