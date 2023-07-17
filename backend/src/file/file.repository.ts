import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CRUDRepository } from 'src/types/crud-repository';
import { FileEntity } from './file.entity';
import { File } from 'src/types/file.interface';

@Injectable()
export class FileRepository
  implements CRUDRepository<FileEntity, number, File>
{
  constructor(private readonly prisma: PrismaService) {}

  public async create(fileEntity): Promise<File> {
    const entity = fileEntity.toObject();
    return await this.prisma.file.create({
      data: { ...entity },
    });
  }
  public async destroy(fileId: number): Promise<void> {
    await this.prisma.file.delete({ where: { fileId } });
  }

  public async findById(fileId: number): Promise<File> {
    return await this.prisma.file.findFirst({ where: { fileId } });
  }

  public async findByHashName(hashName: string): Promise<File> {
    return await this.prisma.file.findFirst({ where: { hashName } });
  }
}
