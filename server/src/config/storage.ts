import { promises as fs } from 'node:fs';
import path from 'node:path';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

export interface StorageAdapter {
  upload: (key: string, buffer: Buffer, mimeType: string) => Promise<string>;
}

const storageMode = process.env.S3_ENDPOINT ? 's3' : 'local';
const uploadDir = path.resolve(process.cwd(), 'uploads');

class LocalStorage implements StorageAdapter {
  async upload(key: string, buffer: Buffer) {
    await fs.mkdir(uploadDir, { recursive: true });
    const destination = path.join(uploadDir, key);
    await fs.writeFile(destination, buffer);
    return `/files/${key}`;
  }
}

class S3Storage implements StorageAdapter {
  private client = new S3Client({
    endpoint: process.env.S3_ENDPOINT,
    region: process.env.S3_REGION,
    forcePathStyle: true,
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY ?? '',
      secretAccessKey: process.env.S3_SECRET_KEY ?? ''
    }
  });

  async upload(key: string, buffer: Buffer, mimeType: string) {
    const bucket = process.env.S3_BUCKET ?? '';
    await this.client.send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: key,
        Body: buffer,
        ContentType: mimeType
      })
    );
    return `${process.env.S3_ENDPOINT}/${bucket}/${key}`;
  }
}

export const storageAdapter: StorageAdapter =
  storageMode === 's3' ? new S3Storage() : new LocalStorage();
