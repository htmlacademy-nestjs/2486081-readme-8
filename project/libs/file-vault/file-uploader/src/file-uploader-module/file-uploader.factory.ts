import { EntityFactory, File } from "@project/core";
import { FileUploaderEntity } from "./file-uploader.entity";

export class FileUploaderFactory implements EntityFactory<FileUploaderEntity> {
  public create(entityPlainData: File): FileUploaderEntity {
    return new FileUploaderEntity(entityPlainData)
  }
}
