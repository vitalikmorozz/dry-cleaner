import { S3 } from 'aws-sdk';

const s3 = new S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

export const uploadImage = (file, res) => {
    s3.upload(
        {
            Bucket: 'guider.storage',
            Key: `${Date.now()}_${file.originalname}`,
            Body: file.buffer,
            ACL: 'public-read',
            ContentType: file.mimetype,
        },
        (err, data) => {
            if (err) return err;
            res.send({ url: data.Location });
        },
    );
};
