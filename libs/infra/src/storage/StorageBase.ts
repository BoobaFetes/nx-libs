import { logger } from '@boobafetes/core';
import { IStorage } from './IStorage';

// import { IStorage } from './IStorage';
export class StorageBase<T> implements IStorage<T> {
  public readonly storage: Storage;
  public readonly key: string;

  constructor(key: string, storage: Storage) {
    this.key = key;
    this.storage = storage;
  }

  public get(): T | null {
    const item = this.storage.getItem(this.key);
    if (item === null) return null;

    let value = null;
    try {
      value = JSON.parse(item) as T;
    } catch (ex) {
      logger.technical.warn(
        `storage[key=${this.key}] : value can not be deserialised, may be should you use getItem instead ? `
      );
    }
    return value;
  }

  public set(value: T | null): boolean {
    if (value === null) {
      this.storage.removeItem(this.key);
      return true;
    }

    try {
      this.storage.setItem(this.key, JSON.stringify(value));
      return true;
    } catch (ex) {
      logger.technical.warn(
        `storage[key=${this.key}] : value can not be serialised, may be should you use setItem instead ? `
      );
    }

    return false;
  }
}
