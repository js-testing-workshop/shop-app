import { useState, FC, PropsWithChildren, useCallback } from 'react';
import LocalStorageService from '../../services/local-storage';
import { useUpdateEffect } from '../../hooks/use-update-effect';
import { useAlert } from '../../components/alert/useAlert';
import { signin, signOut } from '../../api/auth';
import { UserContext, UserContextProps } from './UserContext';

const IS_AUTHORIZED_KEY = 'isAuthorized';

export const UserProvider: FC<PropsWithChildren> = ({ children }) => {
  const { showAlert } = useAlert();
  const [storage] = useState(new LocalStorageService(sessionStorage, 'user-storage'));
  const [isAuthorized, setIsAuthorized] = useState<boolean>(() => storage.get<boolean>(IS_AUTHORIZED_KEY) ?? false);

  useUpdateEffect(() => {
    storage.set(IS_AUTHORIZED_KEY, isAuthorized);
  }, [isAuthorized]);

  const login: UserContextProps['login'] = useCallback(async ({ data, onSuccess, onFailure }) => {
    try {
      await signin({ body: JSON.stringify(data) });
      showAlert('success', 'Login success');
      setIsAuthorized(true);
      onSuccess?.();
    } catch {
      showAlert('danger', 'Login error');
      onFailure?.();
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await signOut();

      setIsAuthorized(false);
      showAlert('success', 'Logout success');
    } catch (error) {
      showAlert('danger', (error as Error).message);
    }
  }, []);

  const providerValue: UserContextProps = {
    isAuthorized,
    login,
    logout
  };

  return <UserContext.Provider value={providerValue}>{children}</UserContext.Provider>;
};
