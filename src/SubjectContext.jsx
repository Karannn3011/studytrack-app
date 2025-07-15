import { createContext, useContext, useState } from "react";

const SubjectContext = createContext();

export function SubjectProvider({ children }) {
  const [selectedSubject, setSelectedSubject] = useState(null);

  return (
    <SubjectContext.Provider value={{ selectedSubject, setSelectedSubject }}>
      {children}
    </SubjectContext.Provider>
  );
}

export const useSubject = () => useContext(SubjectContext);