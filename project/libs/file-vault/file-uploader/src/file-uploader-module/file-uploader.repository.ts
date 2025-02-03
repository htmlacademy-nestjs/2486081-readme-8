import { BaseMongoRepository } from '@project/data-access'
import { FileUploaderEntity } from "./file-uploader.entity";
import { FileUploaderFactory } from "./file-uploader.factory";
import { InjectModel } from "@nestjs/mongoose";
import { FileModel } from "./file.model";
import { Model } from "mongoose";

export class FileUploaderRepository extends BaseMongoRepository<FileUploaderEntity, FileModel> {
  constructor(
    entityFactory: FileUploaderFactory,
    @InjectModel(FileModel.name) fileModel: Model<FileModel>
  ) {
    super(entityFactory, fileModel)
  }
}
