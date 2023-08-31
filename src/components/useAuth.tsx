import { useSessionStorage } from 'react-use';
import { Auth } from './types';

export const useAuth = () => {
  const [user, setUser] = useSessionStorage<Auth['user']>('user', null);

  const login = (userData: Auth['user']) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return { user, login, logout };
};
