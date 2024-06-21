
import AWS from 'aws-sdk';
import { S3Client, DeleteObjectCommand } from '@aws-sdk/client-s3';
import multer from 'multer';
import multerS3 from 'multer-s3';
import { Request, Response } from 'express';
import User from "../models-mongoose/User";
import Empresa from "../models-mongoose/Company";
import Product from "../models-mongoose/Products";
import { Bucket } from 'aws-sdk/clients/iotsitewise';

// otras importaciones ...
const tiposPermitidos = ['usuarios', 'empresas', 'productos'];


const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;

AWS.config.update({
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    region: 'us-east-2'
});

const s3 = new S3Client({
    region: 'us-east-2',
    credentials: {
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,

    }
})
s3.config.credentials()


// Configuración de multer-s3
const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'poscconor',
        key: function (req: Request, file, cb) {
            const tipo = req.params.tipo; // 'usuario', 'producto', 'compania'
            const id = req.params.id; // ID de MongoDB
            const nombreArchivo = `${Date.now().toString()}-${file.originalname}`;
            const rutaArchivo = `img/${tipo}/${id}/${nombreArchivo}`;
            cb(null, rutaArchivo);
        }
    })
});

// Controlador de carga
export const subirArchivo = (req: Request, res: Response) => {
    const { tipo, id } = req.params



    if (!tiposPermitidos.includes(tipo)) {
        return res.status(400).json({ error: 'Tipo no permitido' });
    }

    const singleUpload = upload.single('img');

    

    singleUpload(req, res, async function (error) {
       
        
        try {
            if (error) {
                return res.status(500).json({ error: error.message });
            }
    
            if (!req.file) {
                return res.status(400).json({ error: 'Archivo no encontrado' });
            }
    
            const url = req.file.location;

            console.log(url);
            let urlImagenActual;

            console.log(`imagen actual: ${urlImagenActual}`);
            
            switch (tipo) {
                case 'usuarios':
                    const user = await User.findById(id, { img: url });
                    urlImagenActual = user ? user.img : null;
                    if (!user) {  
                        return res.status(404).json({ error: 'usuario no encontrado' });
                    }
                    await User.findByIdAndUpdate(id, { img: url });
                    break;
                case 'empresas':
                    const empresa = await Empresa.findById(id, { img: url });
                    urlImagenActual = empresa ? empresa.img : null;
                    if (!empresa) {
                        return res.status(404).json({ error: 'empresa no encontrado' });
                    }
                    await Empresa.findByIdAndUpdate(id, { img: url });
                    break;
                case 'productos':
                    const producto = await Product.findById(id, { img: url });
                    urlImagenActual = producto ? producto.img : null;
                    if (!producto) {
                        return res.status(404).json({ error: 'producto no encontrado' });
                    }
                    await Product.findByIdAndUpdate(id, { img: url });
                    break;
                default:
                    return res.status(400).json({ error: 'Tipo no válido' });
            }



            const bucketUrl = "https://poscconor.s3.us-east-2.amazonaws.com/";

            const keyImagenActual = urlImagenActual!.replace(bucketUrl, '');


            // Después de cargar la nueva imagen y actualizar la base de datos
            
            if (keyImagenActual) {
                await eliminarImagenS3('poscconor', keyImagenActual);
            }

            return res.status(200).json({
                mensaje: 'Archivo subido y URL actualizada con éxito',
                url: url
            });

        } catch (dbError) {
            return res.status(500).json({ error: 'Error al actualizar la base de datos', dbError });
        }
    });

};






const eliminarImagenS3 = async (bucket: string, key: string) => {
    const deleteParams = {
        Bucket: bucket,
        Key: key,
    };
    try {
        await s3.send(new DeleteObjectCommand(deleteParams))
            .catch(err => { 
                console.log(`error al subir imagen ${err}`)
                return err
             })
        console.log(`Archivo ${key} eliminado con éxito`);
    } catch (err) {
        console.error("Error al eliminar archivo:", err);
    }
};