import { StorageBase } from './StorageBase';

interface ObjectToStore {
  property: string;
  array: unknown[];
}

describe('StorageBase', () => {
  let actual: StorageBase<ObjectToStore>;
  beforeEach(() => {
    jest.clearAllMocks();
    actual = new StorageBase<ObjectToStore>('key', new mockStorage());
  });
  afterEach(() => {
    actual = undefined as unknown as StorageBase<ObjectToStore>;
  });
  const mockStorage = jest.fn(() => {
    const impl: Partial<Storage> = {
      getItem: mockGetItem,
      setItem: mockSetItem,
      removeItem: mockRemoveItem,
    };
    return impl as Storage;
  });
  const mockGetItem = jest.fn();
  const mockSetItem = jest.fn();
  const mockRemoveItem = jest.fn();

  describe('get', () => {
    it('should deserialise complex type', () => {
      const expected: ObjectToStore = {
        property: 'my object stored works well !',
        array: ['used by', 100, 'users'],
      };

      mockGetItem.mockImplementationOnce(() => JSON.stringify(expected));

      expect(actual.get()).toStrictEqual(expected);
    });

    it('should return null when no item can be found', () => {
      const actual = new StorageBase<ObjectToStore>('key', new mockStorage());
      expect(actual.get()).toBeNull();
    });

    it('should return null when deserialisation throw', () => {
      mockGetItem.mockImplementationOnce(
        () =>
          'anything else than plain object are not involvded by the StorageBase, instead use directly the Storage interface from lib.dom.d.ts'
      );
      const actual = new StorageBase<ObjectToStore>('key', new mockStorage());
      expect(actual.get()).toBeNull();
    });
  });

  describe('set', () => {
    it('should serialise complex type', () => {
      const expected: ObjectToStore = {
        property: 'my object stored works well !',
        array: ['used by', 100, 'users'],
      };
      const actual = new StorageBase<ObjectToStore>('key', new mockStorage());
      expect(actual.set(expected)).toBeTruthy();
      expect(mockSetItem).toBeCalledTimes(1);
      expect(mockSetItem.mock.calls[0]).toEqual([
        'key',
        JSON.stringify(expected),
      ]);
    });

    it('should remove key from storage when value to set is null', () => {
      const actual = new StorageBase<ObjectToStore>('key', new mockStorage());
      expect(actual.set(null)).toBeTruthy();
      expect(mockRemoveItem).toBeCalledTimes(1);
      expect(mockRemoveItem.mock.calls[0]).toEqual(['key']);
    });
  });
});
