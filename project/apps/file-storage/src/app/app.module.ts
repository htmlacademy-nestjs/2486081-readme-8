import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FileVaultConfigModule } from '@project/file-config';
import { FileUploaderModule } from '@project/file-uploader'
import { getMongooseOptions } from '@project/user-config';

@Module({
  imports: [
    FileVaultConfigModule,
    FileUploaderModule,
    MongooseModule.forRootAsync(
      getMongooseOptions()
    )
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
