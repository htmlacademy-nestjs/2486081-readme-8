import { Inject, Injectable } from '@nestjs/common'
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq'
import { rabbitConfig } from '@project/user-config'
import { ConfigType } from '@nestjs/config'
import { CreateSubscriberDto } from './dto/create-subscriber.dto'
import { RabbitRouting } from '@project/core'

@Injectable()
export class  NotifyUserService {
  constructor(
    private readonly rabbitClient: AmqpConnection,
    @Inject(rabbitConfig.KEY)
    private readonly rabbitOptions: ConfigType<typeof rabbitConfig>
  ) {}

  public async registerSubscriber(dto: CreateSubscriberDto) {
    console.log(dto)
    return this.rabbitClient.publish<CreateSubscriberDto>(
      this.rabbitOptions.exchange,
      RabbitRouting.AddSubscriber,
      { ...dto }
    );
  }
}
