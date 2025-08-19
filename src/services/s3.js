import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import crypto from 'crypto';
import {AWS_SETTINGS } from '../../config/config';

const { region, accessKeyId, secretAccessKey, destBucket } = AWS_SETTINGS;

const S3 = new S3Client({
  region,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});

const uploadToS3 = (buffer) => {
  const imageName = `${crypto.randomUUID()}.png`;

  const command = new PutObjectCommand({
    Bucket: destBucket,
    Key: imageName, 
    Body: buffer,
    ACL: 'public-read',
    ContentType: 'image/png',
  });

  return S3.send(command).then(() => {
    return `https://${destBucket}.s3.${region}.amazonaws.com/${imageName}`;
  });
}

module.exports = {
  uploadToS3,
};
