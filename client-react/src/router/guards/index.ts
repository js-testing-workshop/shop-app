import userStore from "../../storage/user.ts";

export const isAuthorized = (): boolean => {
  return userStore.isAuthorized() as boolean;
};
