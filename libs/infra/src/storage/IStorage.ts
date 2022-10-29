export interface IStorage<T> {
  readonly storage: Storage;
  readonly key: string;
  get(): T | null;
  set(value: T | null): boolean;
}
