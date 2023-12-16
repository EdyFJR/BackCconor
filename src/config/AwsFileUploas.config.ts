import AWS from 'aws-sdk';
import { S3Client } from '@aws-sdk/client-s3';
import multer from 'multer';
import multerS3 from 'multer-s3';
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
const accessKeyId= process.env.AWS_ACCESS_KEY_ID;

AWS.config.update({
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    region: 'us-east-2'
});

const s3 = new S3Client({
    region: 'us-east-2',
    credentials:{
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,

    }
})

