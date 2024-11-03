import { Strategy as GitHubStrategy, Profile } from 'passport-github2';
import { PassportStrategy } from '../../interfaces/index';
import { Request } from 'express';
import { database, userModel } from '../../models/userModel'; // your user model
import 'dotenv/config'; // dotenv config (confidential information for github authentication)


const githubStrategy: GitHubStrategy = new GitHubStrategy(
    {
        clientID: process.env.GITHUB_CLIENT_ID || "",
        clientSecret: process.env.GITHUB_CLIENT_SECRET ||"",
        callbackURL: process.env.GITHUB_CALLBACK_URL || "",
        passReqToCallback: true,
    },
    
    /* FIXED */
    async (req: Request, accessToken: string, refreshToken: string, profile: Profile, done: Function) => {
      try {
        let user = userModel.findById(profile.id);
        if (!user) {
          // add new user based on github profile
          user = {
            id: profile.id,
            name: profile.displayName || profile.username || "Unknown User",
            email: profile.emails ? profile.emails[0].value : "No email",
            password: "", // OAuth doesn't need pw.
          };
          database.push(user); // add user to the database
          console.log(`New user added: ${user.name}`);
        }
        return done(null, user);
      } catch (err) {
        console.error("Error in GitHub strategy:", err);
        return done(err);
      }
    }
);

const passportGitHubStrategy: PassportStrategy = {
    name: 'github',
    strategy: githubStrategy,
};

export default passportGitHubStrategy;
