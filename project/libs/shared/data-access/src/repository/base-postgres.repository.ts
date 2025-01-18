import { Entity, EntityFactory, StorableEntity } from "@project/core";
import { Repository } from "./repository.interface";
import { Document } from "mongoose";
import {  PrismaClientService } from '../../../../blog/models/src/prisma-client-module/prisma-client.service' // '@project/blog-models' не работает =(
//import { PrismaClientService } from '@project/blog-models'

export abstract class BasePostgresRepository<
T extends Entity & StorableEntity<ReturnType<T['toPOJO']>>,
DocumentType extends Document
> implements Repository<T> {
  constructor(
    protected entityFactory: EntityFactory<T>,
    protected client: PrismaClientService
  ) {}

  protected createEntityFromDocument(document: DocumentType): T | null {
    if (! document ) {
      return null;
    }
    return this.entityFactory.create(document as ReturnType<T['toPOJO']>)
  }

  public async findByID(id: T["id"]): Promise<T> {
    throw new Error(`In process id - ${id}`)
  }

  public async save(entity: T): Promise<void> {
    throw new Error(`In process  entity - ${entity}`)
  }

  public async update(entity: T): Promise<void> {
    throw new Error(`In process  entity - ${entity}`)
  }

  public async deleteByID(id: T["id"]): Promise<void> {
    throw new Error(`In process id - ${id}`)
  }
}
