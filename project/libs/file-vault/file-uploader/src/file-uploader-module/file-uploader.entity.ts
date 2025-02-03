import { Entity, StorableEntity, File } from '@project/core'
export class FileUploaderEntity extends Entity implements StorableEntity<File> {
  public originalName: string;
  public size: number;
  public mimetype: string;
  public hashName: string;
  public path: string;
  public subDirectory: string;
  public createdAt: Date;
  public updatedAt: Date;

  constructor(file?: File) {
    super();
    this.populate(file);
  }

  public populate(file: File): void {
    if (! file ) {
      return
    }
    this.createdAt = file.createdAt;
    this.hashName = file.hashName;
    this.mimetype = file.mimetype;
    this.originalName = file.originalName;
    this.path = file.path;
    this.size = file.size;
    this.updatedAt = file.updatedAt
    this.subDirectory = file.subDirectory
  }

  public toPOJO(): File {
    return {
      originalName: this.originalName,
      path: this.path,
      size: this.size,
      hashName: this.hashName,
      createdAt: this.createdAt,
      subDirectory: this.subDirectory,
      mimetype: this.mimetype,
      updatedAt: this.updatedAt
    }
  }
}
