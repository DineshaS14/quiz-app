// This will  let the user add their name to the quiz before they get started 
// so it can appear on the results page once they finish
import React, { createContext, useState, ReactNode } from "react";

// Define the context value type
interface UserContextType {
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
}

// Initialize the UserContext with a safe default value
export const UserContext = createContext<UserContextType>({
  name: "",
  setName: () => {
    throw new Error("setName was called outside of a UserProvider");
  },
});

// Define the type for the provider's props
interface UserProviderProps {
  children: ReactNode;
}

// Create the UserProvider component
export function UserProvider({ children }: UserProviderProps) {
  const [name, setName] = useState<string>("");

  return (
    <UserContext.Provider value={{ name, setName }}>
      {children}
    </UserContext.Provider>
  );
}

