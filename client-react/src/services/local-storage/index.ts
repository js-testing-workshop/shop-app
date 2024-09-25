export default class LocalStorageService {
  #storage;
  namespace;

  constructor(storage: Storage, namespace: string) {
    this.#storage = storage;
    this.namespace = namespace;
  }

  // TODO: remove
  // add(key: string, value: unknown) {
  //   return this.#storage.setItem(`${this.namespace}_${key}`, JSON.stringify(value));
  // }

  set<T = unknown>(key: string, value: T) {
    return this.#storage.setItem(`${this.namespace}_${key}`, JSON.stringify(value));
  }

  get<T = unknown>(key: string): T | null {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return JSON.parse(this.#storage.getItem(`${this.namespace}_${key}`) ?? "null");
  }

  remove(key: string) {
    this.#storage.removeItem(`${this.namespace}_${key}`);
  }

  getAll() {
    const keys = Object.keys(this.#storage).filter((key) => key.startsWith(`${this.namespace}_`));
  
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
