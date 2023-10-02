import { Request, Response } from 'express';
import jwt, { Secret } from 'jsonwebtoken';
import  User  from '../models-sequelize/User';

import bcrypt from "bcrypt";

class AuthController {
  static async login(req: Request, res: Response) {
      try {
          const { username, password } = req.body;

          const user = await User.findOne({ username });
          const isPasswordValid = await bcrypt.compare(password, user!.password);
          if (!user || !isPasswordValid) {
              return res.status(401).json({ error: 'Credenciales incorrectas' });
          }

          const token = jwt.sign({ userId: user._id }, process.env.JWT as Secret, {
              expiresIn: '1h',
          });

          res.json({ token });
      } catch (error) {
          console.error('Error al iniciar sesión:', error);
          res.status(500).json({ error: 'Error al iniciar sesión' });
      }
  }
}


export default AuthController;
