import { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type UserContextType = {
  username: string;
  setUsername: (name: string) => void;
};

const UserContext = createContext<UserContextType>({
  username: "",
  setUsername: () => { },
});

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [username, setUsernameState] = useState("");

  // Load saved username on app start
  useEffect(() => {
    AsyncStorage.getItem("username").then((val) => {
      if (val) setUsernameState(val);
    });
  }, []);

  const setUsername = (name: string) => {
    setUsernameState(name);
    AsyncStorage.setItem("username", name);
  };

  return (
    <UserContext.Provider value={{ username, setUsername }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);