import { Strategy } from 'passport';

interface PassportStrategy {
    name: string;
    strategy: Strategy;
}

// Override the default Express.User to compensate lack of propertie
declare global {
  namespace Express {
    interface User {
      id: string;
      name: string;
      email: string;
      password: string;
    }
  }
}


export { PassportStrategy };
