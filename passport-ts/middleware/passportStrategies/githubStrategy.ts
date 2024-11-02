import { Strategy as GitHubStrategy, Profile } from 'passport-github2';
import { PassportStrategy } from '../../interfaces/index';
import { Request } from 'express';
import 'dotenv/config'; // dotenv config (confidential information for github authentication)


const githubStrategy: GitHubStrategy = new GitHubStrategy(
    {
        clientID: process.env.GITHUB_CLIENT_ID || "",
        clientSecret: process.env.GITHUB_CLIENT_SECRET ||"",
        callbackURL: process.env.GITHUB_CALLBACK_URL || "",
        passReqToCallback: true,
    },
    
    /* FIX ME 😭 */
    async (req: Request, accessToken: string, refreshToken: string, profile: Profile, done: Function) => {
      try {
      } catch (err) {

      }
    },
);

const passportGitHubStrategy: PassportStrategy = {
    name: 'github',
    strategy: githubStrategy,
};

export default passportGitHubStrategy;
