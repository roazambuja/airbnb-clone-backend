import passport from "passport";
import { Request, Response, NextFunction } from "express";

export function login(req: Request, res: Response, next: NextFunction) {
  passport.authenticate("local-login", (err, user, info) => {
    if (err) return res.status(400).json({ error: err, info });
    if (!user) return res.status(401).json({ error: "No user found", info });

    // criar sessão
    req.logIn(user, (err) => {
      if (err) return res.status(401).json({ error: err });
      return res.status(200).json({ user });
    });
  })(req, res, next);
}

export function register(req: Request, res: Response, next: NextFunction) {
  passport.authenticate("local-register", (err, user, info) => {
    if (err) return res.status(400).json({ error: err, info });
    if (!user) return res.status(401).json({ error: "No user found", info });

    // criar sessão
    req.logIn(user, (err) => {
      if (err) return res.status(401).json({ error: err });
      return res.status(200).json({ user });
    });
  })(req, res, next);
}

export function logOff(req: Request, res: Response){
  req.logOut();
  return res.status(200).send();
}

export function ensureAuthentication(req: Request, res: Response, next: NextFunction) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    return res.send(401);
  }
}

export function isAuthenticated(req: Request, res: Response) {
  if (req.isAuthenticated()) {
    return res.status(200).json({ isAuthenticated: true, user: req.user });
  } else {
    return res.status(200).json({ isAuthenticated: false });
  }
}
