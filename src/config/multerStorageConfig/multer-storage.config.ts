import { extname } from 'path';
import * as process from 'process';

export const storageOptions = {
  projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
  keyFilename: process.env.GOOGLE_CLOUD_KEY_FILE_NAME,
  bucket: process.env.GOOGLE_CLOUD_BUCKET,
  filename: (req, file, cb) => {
    const name = file.originalname.split('.');
    const fileExtName = extname(file.originalname);
    const randomName = Array(4)
      .fill(null)
      .map(() => Math.round(Math.random() * 16).toString(16))
      .join('');
    cb(null, `image/${name[0]}-${randomName}${fileExtName}`);
  },
};
