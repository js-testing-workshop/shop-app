import { createContext } from 'react';

export interface UserContextProps {
  isAuthorized: boolean;
  login: (data: { email: string, password: string }, callbacks?: {
    onSuccess?: () => void,
    onFailure?: () => void
  }) => Promise<void>;
  logout: () => Promise<void>;
}

export const UserContext = createContext<UserContextProps | undefined>(undefined);
