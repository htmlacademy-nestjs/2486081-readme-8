import { Module } from '@nestjs/common'
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq'
import { getRabbitMQOptions } from '@project/helpers'
import { NotifyUserService } from './notify-user.service'

@Module({
  imports: [
    RabbitMQModule.forRootAsync(
      RabbitMQModule,
      getRabbitMQOptions('rabbit')
    )
  ],
  providers: [ NotifyUserService ],
  exports: [ NotifyUserService ]
})
export class NotifyUserModule {}
