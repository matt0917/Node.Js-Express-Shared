import express from "express";
import passport from 'passport';
import { forwardAuthenticated } from "../middleware/checkAuth";

const router = express.Router();

// check if the current user is already logged in with forwardAuthenticated() function, if not, redirect to the login page.
router.get("/login", forwardAuthenticated, (req, res) => {
  const message = req.session.messages ? req.session.messages[0] : null;
  res.render("login", { message: message });
  // Clear the messages after rendering and ensure session is saved
  req.session.messages = [];
  req.session.save((err) => {
    if (err) {
      console.error("Session save error:", err);
    }
  });
})

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/auth/login",
    /* FIXED : failureMsg needed when login fails */
    failureMessage: true, // the failure message sets in req.session
  }),
);

router.get("/logout", (req, res) => {
  // Destroy the current logged in user's session by calling logout() function from Passport.
  req.logout((err) => {
    if (err) console.log(err);
  });
  res.redirect("/auth/login");
});

export default router;
