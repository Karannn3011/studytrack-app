import  { useState, useEffect } from "react";
import Header from "./Header";
import Body from "./Body";
import { SubjectProvider, useSubject } from "./SubjectContext";
import { Dialog3, Dialog4, Dialog5, Dialog6, Dialog7, Dialog8 } from "./Dialog";

const App = () => {

  const [theme, setTheme] = useState("light");
  const [userName, setUsername] = useState(
    () => localStorage.getItem("userName") || ""
  );


  const [subjects, setSubjects] = useState(() => {
    const stored = localStorage.getItem("subjects");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("userName", userName);
  }, [userName]);

  useEffect(() => {
    localStorage.setItem("subjects", JSON.stringify(subjects));
  }, [subjects]);

  useEffect(() => {
    document.querySelector("html").setAttribute("data-theme", theme);
  }, [theme]);

  const handleNewResourceAdd = (selectedSubject) => {
    const resName = document.getElementById("resourceName").value.trim();
    const resLink = document.getElementById("resourceLink").value.trim();
    const resType = document.getElementById("resourceType").value;

    if (!resName || !resLink || !resType) return;

    setSubjects((prevSubjects) =>
      prevSubjects.map((sub) =>
        sub.id === selectedSubject.id
          ? {
              ...sub,
              resources: [
                ...(sub.resources || []),
                {
                  id: Date.now(),
                  name: resName,
                  link: resLink,
                  type: resType,
                },
              ],
            }
          : sub
      )
    );
    document.getElementById("my_modal_7").close();
    document.getElementById("my_modal_6").close();
    setTimeout(() => {
      const btnId = `resbtn-${selectedSubject.id}`;
      const btn = document.getElementById(btnId);
      if (btn) btn.click();
    }, 100);
  };

  const handleResourceDelete = (resid, selectedSubject) => {
    if (!selectedSubject) return;

    setSubjects((prevSubjects) =>
      prevSubjects.map((sub) =>
        sub.id === selectedSubject.id
          ? {
              ...sub,
              resources: sub.resources.filter((res) => res.id !== resid),
            }
          : sub
      )
    );

    document.getElementById("my_modal_6").close();
    setTimeout(() => {
      const btnId = `resbtn-${selectedSubject.id}`;
      const btn = document.getElementById(btnId);
      if (btn) btn.click();
    }, 100);
  };

  const handleNewTopicAdd = (selectedSubject) => {
    const topicname = document.getElementById("newtopicname").value.trim();
    if (!selectedSubject) return;

    setSubjects((prevSubjects) =>
      prevSubjects.map((sub) =>
        sub.id === selectedSubject.id
          ? {
              ...sub,
              topics: [...sub.topics,
                {
                  id: Date.now(),
                  topicname,
                  remark: "",
                  isStarred: false,
                  completed: false,
                }
              ]
            }
          : sub
      )
    );
    document.getElementById("my_modal_5").close();
    setTimeout(() =>document.getElementById("topicheader").click(), 200 )
    
  }
  

  return (
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
      <Dialog5
        handleNewTopicAdd={handleNewTopicAdd}
      />
      <Dialog6 handleResourceDelete={handleResourceDelete} />
      <Dialog7 handleNewResourceAdd={handleNewResourceAdd} />
      <Dialog8 />
      <Dialog4 />
    </SubjectProvider>
  );
};

export default App;
