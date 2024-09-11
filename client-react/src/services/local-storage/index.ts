export default class LocalStorageService {
  #storage;

  constructor(storage: Storage) {
    this.#storage = storage;
  }

  add(key: string, value: unknown) {
    return this.#storage.setItem(key, JSON.stringify(value));
  }

  get(key: string): unknown {
    return JSON.parse(this.#storage.getItem(key) ?? "null");
  }

  remove(key: string) {
    this.#storage.removeItem(key);
  }

  getAll() {
    const keys = Object.keys(this.#storage);
  
    if (keys.length === 0) return null;
  
    return keys.reduce((accum: Record<string, unknown>, key) => {
      accum[key] = this.get(key);
      return accum;
    }, {});
  }

  removeAll() {
    const allRecords = this.getAll();

    if (allRecords === null) return;

    const serviceKeys = Object.keys(allRecords);

    serviceKeys.forEach((key) => {
      this.remove(key);
    });
  }
}
