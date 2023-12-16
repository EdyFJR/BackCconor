"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const client_s3_1 = require("@aws-sdk/client-s3");
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
aws_sdk_1.default.config.update({
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    region: 'us-east-2'
});
const s3 = new client_s3_1.S3Client({
    region: 'us-east-2',
    credentials: {
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    }
});
