import Header from "./Header";
import { useState, useEffect } from "react";
import Body from "./Body";
import { SubjectProvider } from "./SubjectContext";
import { useSubject } from "./SubjectContext";
import { Dialog3, Dialog4, Dialog6, Dialog7 } from "./Dialog";
const App = () => {
  const { selectedSubject } = useSubject;
  const [theme, setTheme] = useState("light");
  const [userName, setUsername] = useState(
    () => localStorage.getItem("userName") || ""
  );

  const [subjects, setSubjects] = useState(() => {
    const stored = localStorage.getItem("subjects");
    return stored ? JSON.parse(stored) : [];
  });
  let nexttopicid = 0;
  const handleNewResourceAdd = () => {
    alert("TEST")
  };
  
  useEffect(() => {
    if (userName) {
      localStorage.setItem("userName", userName);
    }
  }, [userName]);

  useEffect(() => {
    localStorage.setItem("subjects", JSON.stringify(subjects));
  }, [subjects]);

  useEffect(() => {
    document.querySelector("html").setAttribute("data-theme", theme);
  }, [theme]);
  return (
    <>
      <SubjectProvider>
        <Header theme={theme} setTheme={setTheme} />
        <Body
          userName={userName}
          setUsername={setUsername}
          subjects={subjects}
          setSubjects={setSubjects}
        />
        <Dialog3 />
        <Dialog4 />
        <Dialog6 />
        <Dialog7 handleNewResourceAdd={handleNewResourceAdd} />
      </SubjectProvider>
    </>
  );
};

export default App;
