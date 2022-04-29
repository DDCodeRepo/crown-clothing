import { createContext, useState, useEffect } from "react";
import { createUserDocumentFromAuth, onAuthStateChangedListener, signOutUser } from "../utils/firebase/firebase.utils";

export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

export const UserProvider = ({ children }) => {
  console.log("HIITT");
  const [currentUser, setCurrentUser] = useState(null);
  const value = { currentUser, setCurrentUser };

  signOutUser();

  useEffect(() => {
      const unsubcribe = onAuthStateChangedListener((user) => {
          console.log("USER CONTEXT::",user);

          if(user){
            createUserDocumentFromAuth(user);
          }

          setCurrentUser(user);
      });
      return unsubcribe;
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
