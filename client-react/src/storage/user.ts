import LocalStorageService from "../services/local-storage/index.ts";

class UserStore {
  abortController = new AbortController();
  storage = new LocalStorageService(window.sessionStorage);

  isAuthorized() {
    return this.storage.get("isAuthorized");
  }

  login() {
    this.storage.add("isAuthorized", true);
  }

  logout() {
    this.storage.remove("isAuthorized");
  }

  destroy() {
    this.abortController.abort();
  }
}

const userStore = new UserStore();

export default userStore;
