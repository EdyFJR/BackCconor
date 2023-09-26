import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import  User  from '../models-sequelize/User';

class AuthController {
  static async login(req: Request, res: Response) {
    try {
      const { username, password } = req.body;

      // Verificar las credenciales del usuario en la base de datos
      const user = await User.findOne({ username });

      if (!user || user.password !== password) {
        return res.status(401).json({ error: 'Credenciales incorrectas' });
      }

      // Generar un token JWT con la información del usuario
      const token = jwt.sign({ userId: user._id }, 'tu_clave_secreta', {
        expiresIn: '1h', // Tiempo de expiración del token (ejemplo: 1 hora)
      });

      res.json({ token });
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      res.status(500).json({ error: 'Error al iniciar sesión' });
    }
  }
}

export default AuthController;
