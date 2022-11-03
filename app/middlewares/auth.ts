import { Response, NextFunction, Request } from 'express';

import SessionManager, { HEADER_NAME } from '../services/session';
import userService from '../services/users';
import { User } from '../models/user';
import { authenticationError } from '../errors';

export async function secure(req: Request, res: Response, next: NextFunction): Promise<void> {
  const auth = req.headers[HEADER_NAME] as string;

  if (auth) {
    const payload: User = SessionManager.decode(auth);
    console.log('payload', payload)
    const user: User | undefined = await userService.findUser({ id: payload.id });
    console.log('user', user)
    if (user) {
      req.user = user;
      return next();
    }
  }
  return next(authenticationError);
}
