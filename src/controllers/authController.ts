import { Request, Response } from 'express';
import jwt, { Secret } from 'jsonwebtoken';
import  User  from '../models-mongoose/User';

import bcrypt from "bcrypt";
import { generarJWT } from '../helpers/jwt-helper';
import { getMenuFrontEnd } from '../helpers/menu';
import Empresa from '../models-mongoose/Company';

export const login = async  (req:Request, resp:Response)=>{
    
    const {username, password} = req.body
    console.log(username, password);

    
    try {
        
        const usuarioDB = await User.findOne({username}).select('+password')

        if(!usuarioDB){
            return resp.status(404).json({
                ok:false,
                msg:'Datos no validos'
            })
        }

         const validPassword = bcrypt.compareSync(password, usuarioDB.password);
         if(!validPassword){
             return resp.status(400).json({
                 ok:false,
                 msg:'password invalido'
             })
         }
        
        const token = await generarJWT(usuarioDB._id);
        return resp.status(200).json({
            ok:true,
            token,
            menu:getMenuFrontEnd(usuarioDB.role)
        })


    } catch (error) {

        return resp.status(500).json({
            okay:false,
            msg:'Porfavor hable con el administrador'+error
        })
    }


}

  export const renewToken = async(req:any, resp:Response)=>{
    
    const uid = req.uid;    
    

    const token =await generarJWT(uid);

    //return user
    let usuario = await User.findById(uid).select('+password');   

    if(!usuario){
        return resp.status(404).json({
            ok:false,
            msg:'No se encontro el usuario'
        })
    }

    let company = await Empresa.findOne({adminId:uid})

    
    

    
    return resp.status(200).json({
        ok:true,
        token,
        uid,
        usuario,
        company,
        menu:getMenuFrontEnd(usuario?.role)

    });


}


