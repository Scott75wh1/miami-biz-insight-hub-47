
import { useState, createContext, useContext, ReactNode } from 'react';

export type UserType = 'end_user' | 'marketer';

interface UserTypeContextType {
  userType: UserType;
  setUserType: (type: UserType) => void;
}

const UserTypeContext = createContext<UserTypeContextType | undefined>(undefined);

export function UserTypeProvider({ children }: { children: ReactNode }) {
  const [userType, setUserType] = useState<UserType>('end_user');

  return (
    <UserTypeContext.Provider value={{ userType, setUserType }}>
      {children}
    </UserTypeContext.Provider>
  );
}

export function useUserType() {
  const context = useContext(UserTypeContext);
  if (context === undefined) {
    throw new Error('useUserType must be used within a UserTypeProvider');
  }
  return context;
}
