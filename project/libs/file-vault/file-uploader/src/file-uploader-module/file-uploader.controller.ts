import 'multer'
import { Controller, Get, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common'
import { FileUploaderService } from './file-uploader.service'
import { FileInterceptor } from '@nestjs/platform-express'
import { fillDto } from '@project/helpers'
import { UploadedFileRdo } from './rdo/uploaded-file.rdo'

@Controller('files')
export class FileUploaderController {
  constructor(
    private readonly fileUploaderService: FileUploaderService
  ) {}

  @Post('/upload')
  @UseInterceptors(FileInterceptor('file'))
  public async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const fileEntity = await this.fileUploaderService.saveFile(file)
    return fillDto(UploadedFileRdo, fileEntity.toPOJO());
  }

  @Get(':fileId')
  public async show(@Param('fileId')fileId: string) {
    const existFile = await this.fileUploaderService.getFile(fileId);
    return fillDto(UploadedFileRdo, existFile);
  }
}
