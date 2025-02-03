import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { EmailSubscriberModel, EmailSubscriberSchema } from "./email-subscriber.model";
import { EmailSubscriberService } from "./email-subscriber.service";
import { EmailSubscriberFactory } from "./email-subscriber.factory";
import { EmailSubscriberRepository } from "./email-subscriber.repository";
import { RabbitMQModule } from "@golevelup/nestjs-rabbitmq";
import { getRabbitMQOptions } from '@project/helpers'
import { EmailSubscriberController } from "./email-subscriber.controller";
import { MailModule } from "./mail-module/mail.module";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: EmailSubscriberModel.name, schema: EmailSubscriberSchema}
    ]),
    RabbitMQModule.forRootAsync(
      RabbitMQModule,
      getRabbitMQOptions('application.rabbit')
    ),
    MailModule
  ],
  controllers: [
    EmailSubscriberController
  ],
  providers: [
    EmailSubscriberService,
    EmailSubscriberRepository,
    EmailSubscriberFactory,
  ]
})
export class EmailSubscriberModule {}
