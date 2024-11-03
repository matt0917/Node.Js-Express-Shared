import express from "express";
const router = express.Router();
import { ensureAuthenticated } from "../middleware/checkAuth";

router.get("/", (req, res) => {
  res.send("welcome");
});

router.get("/dashboard", ensureAuthenticated, (req, res) => {
  res.render("dashboard", {
    user: req.user,
  });
});

router.get("/admin", ensureAuthenticated, (req, res) => {
  if (req.user?.role === "admin") {
    if (typeof req.sessionStore.all === 'function') {
      req.sessionStore.all((err, sessions) => {
        if (err) {
          console.error("Error fetching sessions:", err);
          res.status(500).send("Error fetching sessions");
          return;
        }
        console.log(sessions);
        res.render("admin", {
          user: req.user,
          sessions: sessions,
        });
      });
    } else {
      console.warn("The session store does not implement the 'all()' method.");
      res.status(500).send("Session store does not support listing all sessions");
    }
  } else {
    res.status(403).send("Unauthorized access");
  }
});


router.get("/admin/revoke-session/:sessionId", (req, res) => {
  if (req.user?.role === "admin") {
    const sessionId = req.params.sessionId;
    // Use req.sessionStore.destroy to remove the session by its ID
    req.sessionStore.destroy(sessionId, (err) => {
      if (err) {
        console.error("Error destroying session:", err);
        res.status(500).send("Failed to revoke session");
      } else {
        console.log(`Session ${sessionId} destroyed successfully`);
        res.redirect("/admin"); // Redirect back to the admin page
      }
    });
  } else {
    res.status(403).send("Unauthorized access");
  }
});



export default router;
