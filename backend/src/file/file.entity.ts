import { Entity } from 'src/types/entity.interface';
import { File } from 'src/types/file.interface';

export class FileEntity implements Entity<FileEntity>, File {
  public hashName: string;
  public mimetype: string;
  public originalName: string;
  public path: string;
  public size: number;

  constructor(file: File) {
    this.fillEntity(file);
  }

  public fillEntity(entity: File) {
    this.hashName = entity.hashName;
    this.mimetype = entity.mimetype;
    this.originalName = entity.originalName;
    this.path = entity.path;
    this.size = entity.size;
  }

  public toObject(): FileEntity {
    return {
      ...this,
    };
  }
}
