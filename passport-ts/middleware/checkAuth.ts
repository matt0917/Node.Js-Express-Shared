import {Request, Response, NextFunction} from 'express'

/*
FIXED (types)
*/
export const ensureAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  // isAuthenticated() is a function of Passport to check if the current user has the session stored in the server.
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/auth/login");
}

/*
FIXED (types)
*/
// To prevent the logged-in user from being redirected to the login page, but stay logged in page(/dashboard)
// when the user try to go login page by typing auth/login in the address field.
// req.session.passport.user = 5(user id) is attached to the server
export const forwardAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    if (!req.isAuthenticated()) {
      return next();
    }
    res.redirect("/dashboard");
}