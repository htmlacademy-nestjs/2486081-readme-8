import { Entity } from '@project/core'

export interface Repository<T extends Entity> {
  findByID(id: T['id']): Promise<T | null>;
  save(entity: T): Promise<void>;
  update(entity: T): Promise<void>;
  deleteByID(id: T['id']): Promise<void>;
}
