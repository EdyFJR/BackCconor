import jwt, { Secret } from 'jsonwebtoken';


import { Request, Response, NextFunction } from 'express';


export function verifyToken(req: Request, res: Response, next: NextFunction) {
  const token = req.header('authorization');

  if (!token) {
    return res.status(403).json({ error: 'Token no proporcionado' });
  }
  console.log(token)
  console.log(process.env.JWT)
  jwt.verify(token, process.env.JWT as Secret, (err, decoded) => {
    if (err) {
      console.log(err)
      console.log(decoded)
      return res.status(401).json({ error: 'Token inválido' });
    }

    // Agregamos el ID del usuario decodificado a la solicitud para su posterior uso
    req.userId = (decoded as any).userId;
    next();
  });
}
