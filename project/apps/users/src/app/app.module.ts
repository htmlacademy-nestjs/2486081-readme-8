import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthenticationModule} from '@project/authentication'
import { BlogUserModule } from '@project/blog-user';
import { NotifyUserModule } from '@project/notify-user';
import { getMongooseOptions, UserConfigModule } from '@project/user-config'
@Module({
  imports: [
    AuthenticationModule,
    BlogUserModule,
    UserConfigModule,
    MongooseModule.forRootAsync(
      getMongooseOptions()
    ),
    NotifyUserModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
