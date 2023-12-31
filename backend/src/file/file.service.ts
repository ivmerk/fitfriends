import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { ensureDir } from 'fs-extra';
import * as dayjs from 'dayjs';
import uploaderConfig from 'src/config/uploader.config';
import { writeFile } from 'node:fs/promises';
import * as crypto from 'node:crypto';
import { extension } from 'mime-types';
import { FileRepository } from './file.repository';
import { FileEntity } from './file.entity';

type WritedFile = {
  hashName: string;
  fileExtension: string;
  subDirectory: string;
  path: string;
};

@Injectable()
export class FileService {
  constructor(
    @Inject(uploaderConfig.KEY)
    private readonly applicationConfig: ConfigType<typeof uploaderConfig>,
    private readonly fileRepository: FileRepository,
  ) {}

  public async writeFile(file: Express.Multer.File): Promise<WritedFile> {
    const [year, month] = dayjs().format('YYYY MM').split(' ');

    const { uploadDirectory } = this.applicationConfig;

    const subDirectory = `${year}/${month}`;

    const uuid = crypto.randomUUID();
    const fileExtension = extension(file.mimetype) || '';
    const hashName = `${uuid}.${fileExtension}`;

    const uploadDirectoryPath = `${uploadDirectory}/${year}/${month}`;
    const destinationFile = `${uploadDirectoryPath}/${hashName}`;

    await ensureDir(uploadDirectoryPath);
    await writeFile(destinationFile, file.buffer);
    return {
      hashName,
      fileExtension,
      subDirectory,
      path: `/${subDirectory}/${hashName}`,
    };
  }

  public async saveFile(file: Express.Multer.File) {
    const writedFile = await this.writeFile(file);
    const newFile = new FileEntity({
      size: file.size,
      hashName: writedFile.hashName,
      mimetype: file.mimetype,
      originalName: Buffer.from(file.originalname, 'latin1').toString('utf8'),
      path: writedFile.path,
    });

    return this.fileRepository.create(newFile);
  }

  public async getFileById(fileId: number) {
    const existFile = await this.fileRepository.findById(fileId);

    if (!existFile) {
      throw new NotFoundException(`File with ${fileId} not found.`);
    }

    return existFile;
  }

  public async getFileByHasName(hashName: string) {
    const existFile = await this.fileRepository.findByHashName(hashName);

    if (!existFile) {
      throw new NotFoundException(`File with ${hashName} not found.`);
    }

    return existFile;
  }
}
