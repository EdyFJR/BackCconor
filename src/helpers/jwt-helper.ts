import jwt, { Secret } from 'jsonwebtoken';

const key = process.env.JWT

export const generateToken = (uid:string) => {

  return new Promise((resolve, reject) => {

      const payload = { 
          uid
      };

      jwt.sign(payload,
          process.env.JWT_SECRET as string, {
              expiresIn: '24h'
          },
          (err, token) => {
              if (err) {
                  console.log(token);
                  reject('could not generate JWT')
              }else{
                  resolve(token)
              }

          }
      )

  })

}

export function validateToken(token: string): boolean {
  try {
    jwt.verify(token, process.env.JWT as Secret);
    return true;
  } catch (error) {
    return false;
  }
}
