const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const crypto = require('crypto');

const S3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const uploadToS3=(fileBuffer, fileType)=> {
  const imageName = `${crypto.randomUUID()}.${fileType}`;

  const command = new PutObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET,
    Key: imageName,
    Body: fileBuffer,
    ContentType: `image/${fileType}`,
  });

  return S3.send(command)
    .then(() => {
      return `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${imageName}`;
    })
    .catch((err) => {
      console.error('Error uploading to S3:', err);
      throw err;
    });
}

module.exports = { uploadToS3 };