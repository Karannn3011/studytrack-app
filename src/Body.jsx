import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencil,
  faPlus,
  faCircleQuestion,
  faTrash,
  faNoteSticky,
} from "@fortawesome/free-solid-svg-icons";
import { Dialog1, Dialog2, Dialog8 } from "./Dialog.jsx";
import { useSubject } from "./SubjectContext";
import Topics from "./Topics.jsx";
import { useEffect, useState } from "react";

function Body(props) {
  const [viewedTopic, setViewedTopic] = useState(null);
  const { selectedSubject, setSelectedSubject } = useSubject();

  const determineProgress = (subject) => {
    const currentSub = props.subjects.find((sub) => sub.id === subject.id);
    if (
      !currentSub ||
      !Array.isArray(currentSub.topics) ||
      currentSub.topics.length === 0
    )
      return 0;

    const completedCount = currentSub.topics.filter(
      (topic) => topic.completed
    ).length;
    const progress = Math.round(
      (completedCount / currentSub.topics.length) * 100
    );
    return progress;
  };
  function handleNewSubAdd(e) {
    e.preventDefault();
    const subnametemp = document.getElementById("subjectname").value.trim();
    const subname = capitalizeFirstLetter(subnametemp);
    const subdesc = document.getElementById("subjectdesc").value.trim();
    const subtags = document
      .getElementById("subjecttags")
      .value.trim()
      .split(" ")
      .filter((tag) => tag.length > 0);

    props.setSubjects([
      ...props.subjects,
      {
        id: Date.now(),
        subname,
        tags: subtags,
        currentstatus: "Studying",
        subdesc,
        resources: [],
        topics: [],
      },
    ]);
    document.getElementById("my_modal_2").close();
  }
  function capitalizeFirstLetter(str) {
    return `${str[0].toUpperCase()}${str.slice(1)}`;
  }
  function handleDeleteSub(id) {
    if (window.confirm("Are you sure you want to delete this subject?")) {
      const tempSub = props.subjects.filter((e) => e.id !== parseInt(id));
      props.setSubjects(tempSub);
    }
  }

  const handleTopicDelete = (topicId, selectedSubject) => {
    if (!selectedSubject) return;
    if (window.confirm("Are you sure you want to delete the topic?")) {
      props.setSubjects((prevSubjects) =>
        prevSubjects.map((sub) =>
          sub.id === selectedSubject.id
            ? {
                ...sub,
                topics: sub.topics.filter((topic) => topic.id !== topicId),
              }
            : sub
        )
      );
    }

    setTimeout(() => document.getElementById("topicheader").click(), 200);
  };

  const handleStarChange = (topicId, selectedSubject) => {
    if (!selectedSubject) return;
    props.setSubjects((prevSubjects) =>
      prevSubjects.map((sub) =>
        sub.id === selectedSubject.id
          ? {
              ...sub,
              topics: sub.topics.map((t) =>
                t.id === topicId
                  ? {
                      ...t,
                      isStarred: !t.isStarred,
                    }
                  : t
              ),
            }
          : sub
      )
    );
  };

  const handleTopicStatusChange = (topicId, selectedSubject) => {
    if (!selectedSubject) return;
    props.setSubjects((prevSubjects) =>
      prevSubjects.map((sub) =>
        sub.id === selectedSubject.id
          ? {
              ...sub,
              topics: sub.topics.map((t) =>
                t.id === topicId
                  ? {
                      ...t,
                      completed: !t.completed,
                    }
                  : t
              ),
            }
          : sub
      )
    );
  };

  const handleRemarkChange = (topicId, newRemark) => {
    if (!selectedSubject) return;
    props.setSubjects((prevSubjects) =>
      prevSubjects.map((sub) =>
        sub.id === selectedSubject.id
          ? {
              ...sub,
              topics: sub.topics.map((t) =>
                t.id === topicId ? { ...t, remark: newRemark } : t
              ),
            }
          : sub
      )
    );
  };

  return (
    <>
      <div className="px-5 my-7 flex items-center gap-x-5 ">
        <h1 className="text-3xl lg:text-4xl">
          Welcome, <span className="font-semibold">{props.userName}</span>!
        </h1>
        <div
          className="cursor-pointer"
          onClick={() => document.getElementById("my_modal_1").showModal()}
        >
          <FontAwesomeIcon icon={faPencil} />
        </div>
        <Dialog1 userName={props.userName} setUsername={props.setUsername} />
      </div>
      <div className="flex justify-end px-3 lg:px-7">
        <div
          onClick={() => document.getElementById("my_modal_2").showModal()}
          className="btn btn-md lg:btn-lg flex flex-row items-center"
        >
          <FontAwesomeIcon icon={faPlus} />
          <p>Add a subject</p>
          <Dialog2 handleNewSubAdd={handleNewSubAdd} />
        </div>
      </div>
      <div className="px-3 mt-5 w-full flex flex-col gap-y-4">
        {props.subjects.map((e, i) => (
          <div
            id={`sub${e.id}`}
            key={i}
            onClick={() => setSelectedSubject(e)}
            className="bg-base-100 border-base-300 overflow-x-scroll w-full collapse border"
          >
            <input type="checkbox" className="peer" />
            <div className="collapse-title md:pt-6 md:pb-6 w-full grid grid-cols-2 md:grid-rows-[auto_20px] md:grid-cols-3 grid-rows-2 bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content">
              <div className="justify-self-start col-start-1 row-start-1">
                <p className="font-bold text-4xl font-arial">{e.subname}</p>
              </div>
              <div className="md:row-start-2  md:col-start-1 justify-self-end md:justify-self-start">
                <div className="flex flex-row md:justify-start flex-wrap gap-2">
                  {Array.isArray(e.tags) && e.tags.length > 0 ? (
                    e.tags.map((t, j) => (
                      <div
                        key={j}
                        className="badge bg-base-100/50 text-base-content/75 font-bold"
                      >
                        {t}
                      </div>
                    ))
                  ) : (
                    <span className="text-base-content/50 italic">
                      (No tags)
                    </span>
                  )}
                </div>
              </div>
              <div className="md:row-start-1 z-10 md:scale-120  md:col-start-2 md:row-end-2 justify-self-start md:justify-self-center flex md:justify-center md:items-center flex-col gap-2">
                <p className="text-base-accent italic text-xl font-semibold">
                  Currently:
                </p>
                <label className="swap z-10 swap-flip">
                  <input
                    type="checkbox"
                    checked={e.currentstatus === "Revising"}
                    readOnly
                  />
                  <div className="swap-on">
                    <button
                      type="button"
                      className="btn"
                      onClick={() => {
                        props.setSubjects((prevSubjects) =>
                          prevSubjects.map((sub) =>
                            sub.id === e.id
                              ? { ...sub, currentstatus: "Studying" }
                              : sub
                          )
                        );
                      }}
                    >
                      Revising
                    </button>
                  </div>
                  <div className="swap-off">
                    <button
                      type="button"
                      className="btn"
                      onClick={() => {
                        props.setSubjects((prevSubjects) =>
                          prevSubjects.map((sub) =>
                            sub.id === e.id
                              ? { ...sub, currentstatus: "Revising" }
                              : sub
                          )
                        );
                      }}
                    >
                      Studying
                    </button>
                  </div>
                </label>
              </div>
              <div className="md:scale-120 justify-self-end">
                <div
                  className="radial-progress"
                  style={{ "--value": determineProgress(e) }}
                  aria-valuenow={determineProgress(e)}
                  role="progressbar"
                >
                  {`${determineProgress(e)}%`}
                </div>
              </div>
            </div>
            <div className="collapse-content w-full grid grid-cols-2 md:grid-cols-3 md:grid-rows-[40px_auto] gap-y-3 grid-rows-[50px_50px_auto] bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content">
              <div className="row-start-1 md:col-span-1  justify-self-center md:justify-self-start col-span-2 w-full ">
                <div className="flex justify-center md:justify-start *:w-full"><button
                  id={`resbtn-${e.id}`}
                  onClick={() => {
                    setSelectedSubject(e);

                    document.getElementById("my_modal_6").showModal();
                  }}
                  className="btn md:w-[95%] max-w-75 md:max-w-60"
                >
                  <FontAwesomeIcon icon={faNoteSticky} />
                  Resources
                </button></div>
                
              </div>
              <div className="row-start-2 md:row-start-1 justify-self-start md:justify-center md:justify-self-center flex justify-start w-full col-span-1">
                <button
                  onClick={() => {
                    setSelectedSubject(e);
                    document.getElementById("my_modal_3").showModal();
                  }}
                  disabled={e.subdesc == null}
                  className="btn w-[95%] py-6 md:py-0 max-w-60"
                >
                  <FontAwesomeIcon icon={faCircleQuestion} /> Show Description
                </button>
              </div>
              <div className="row-start-2 md:row-start-1 md:col-start-3 md:justify-end md:justify-self-end col-start-2 justify-self-end flex md:self-start justify-end w-full">
                <button onClick={() => handleDeleteSub(e.id)} className="btn w-[95%] py-6 md:py-0 max-w-60">
                  <FontAwesomeIcon icon={faTrash} /> Delete Subject
                </button>
              </div>
              <div className="row-start-3 md:col-span-3 col-span-2 w-full">
                <div onClick={() => setSelectedSubject(e)}>
                  <Topics
                    subid={e.id}
                    subject={e}
                    setSubjects={props.setSubjects}
                    handleTopicDelete={handleTopicDelete}
                    handleStarChange={handleStarChange}
                    handleTopicStatusChange={handleTopicStatusChange}
                    handleRemarkChange={handleRemarkChange}
                    setViewedTopic={setViewedTopic}
                    viewedTopic={viewedTopic}
                  />
                  <Dialog8
                    handleRemarkChange={handleRemarkChange}
                    topic={viewedTopic}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Body;
