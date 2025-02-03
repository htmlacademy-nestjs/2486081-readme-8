import {BaseMongoRepository} from '@project/data-access'
import { EmailSubscriberEntity } from './email-subscriber.entity';
import { EmailSubscriberFactory } from './email-subscriber.factory';
import { InjectModel } from '@nestjs/mongoose';
import { EmailSubscriberModel } from './email-subscriber.model';
import { Model } from 'mongoose';


export class EmailSubscriberRepository extends BaseMongoRepository<EmailSubscriberEntity, EmailSubscriberModel> {
  constructor(
    entityFactory: EmailSubscriberFactory,
    @InjectModel(EmailSubscriberModel.name) emailSubscriberModel: Model<EmailSubscriberModel>
  ) {
    super(entityFactory, emailSubscriberModel)
  }

  public async findByEmail(email: string): Promise<EmailSubscriberEntity> {
    const document = await this.model.findOne({ email })
    return this.createEntityFromDocument(document)
  }
}
