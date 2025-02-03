import { Entity, EntityFactory, StorableEntity } from "@project/core";
import { Repository } from "./repository.interface";
import { PrismaClientService } from '@project/blog-models'

export abstract class BasePostgresRepository<
T extends Entity & StorableEntity<ReturnType<T['toPOJO']>>,
DocumentType = ReturnType<T['toPOJO']>
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

  public async findById(id: T["id"]): Promise<T> {
    throw new Error(`In process id - ${id}`)
  }

  public async save(entity: T): Promise<void> {
    throw new Error(`In process  entity - ${entity}`)
  }

  public async update(entity: T): Promise<void> {
    throw new Error(`In process  entity - ${entity}`)
  }

  public async deleteById(id: T["id"]): Promise<void> {
    throw new Error(`In process id - ${id}`)
  }
}
