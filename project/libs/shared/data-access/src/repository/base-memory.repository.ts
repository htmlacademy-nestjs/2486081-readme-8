import { Entity, EntityFactory, StorableEntity } from "@project/core";
import { randomUUID } from "crypto";

export abstract class BaseMemoryRepository<T extends Entity & StorableEntity<ReturnType<T['toPOJO']>>> {
  protected entities: Map<T['id'], ReturnType<T['toPOJO']>> = new Map();

  constructor(
    protected entityFactory: EntityFactory<T>
  ) {}

  public async findByID(id: T['id']): Promise<T> {
    const foundEntity = this.entities.get(id) || null;
    if (! foundEntity) {
      return null;
    }

    return this.entityFactory.create(foundEntity)
  }

  public async save(entity: T): Promise<void> {
    if (! entity.id) {
      entity.id = randomUUID();
    }

    this.entities.set(entity.id, entity.toPOJO());
  }

  public async update(entity: T): Promise<void> {
    if (this.entities.has(entity.id)) {
      throw new Error('Entity not found');
    }

    this.entities.set(entity.id, entity.toPOJO());
  }

  public async deleteByID(id: T['id']): Promise<void> {
    if (!  this.entities.has(id)) {
      throw new Error('Entity not found');
    }
    this.entities.delete(id);
  }
}
