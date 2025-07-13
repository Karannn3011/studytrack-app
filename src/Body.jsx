import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencil,
  faPlus,
  faCircleQuestion,
  faTrash,
  faNoteSticky,
  faStickyNote,
  faBook,
} from "@fortawesome/free-solid-svg-icons";
import { Dialog1, Dialog2, Dialog3, Dialog4 } from "./Dialog.jsx";
import { useSubject } from "./SubjectContext";
import Topics from "./Topics.jsx";

function Body(props) {
  const { setSelectedSubject } = useSubject();
  function handleNewSubAdd(e) {
    e.preventDefault();

    let subname = document.getElementById("subjectname").value.trim();
    let subdesc = document.getElementById("subjectdesc").value.trim();
    let subtags = document
      .getElementById("subjecttags")
      .value.trim()
      .split(" ");

    props.setSubjects([
      ...props.subjects,
      {
        id: Date.now(),
        subname: subname,
        tags: subtags,
        currentstatus: "Studying",
        subdesc: subdesc,
        resources: [],
        topics: [],
      },
    ]);
    document.getElementById("my_modal_2").close();
  }

  function handleDeleteSub(id) {
    const tempSub = props.subjects.filter((e) => e.id !== parseInt(id));
    props.setSubjects(tempSub);
  }

  function handleNewTopicAdd(id) {
    alert("TEST");
  }
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
        <button
          onClick={() => document.getElementById("my_modal_2").showModal()}
          className="btn btn-md lg:btn-lg flex flex-row items-center"
        >
          <FontAwesomeIcon icon={faPlus} />
          <p>Add a subject</p>
          <Dialog2 handleNewSubAdd={handleNewSubAdd} />
        </button>
      </div>
      <div className="px-3 lg:px-7 mt-5 flex flex-col gap-y-4">
        {props.subjects.map((e, i) => {
          return (
            <div
              key={i}
              className="bg-base-100 border-base-300 collapse border"
            >
              <input type="checkbox" className="peer" />
              <div className="collapse-title flex justify-between bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content">
                <div className="flex flex-col">
                  <p className="font-bold text-3xl font-arial">{e.subname}</p>
                  <div className="flex flex-row flex-wrap w-50 gap-2 mt-2">
                    {e.tags.map((t, j) => (
                      <div
                        key={j}
                        className="badge bg-base-100/50 text-base-content/75 font-bold"
                      >
                        {t}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="gap-y-3 flex flex-col items-start">
                  <p className="text-base--100 text-xl font-semibold">Currently:</p>

                  <label className="swap z-10 swap-flip">
                    {/* this hidden checkbox controls the state */}
                    <input type="checkbox" />

                    <div className="swap-on">
                      <btn className="btn">Studying</btn>
                    </div>
                    <div className="swap-off">
                      <btn className="btn">Revising</btn>
                    </div>
                  </label>
                </div>
                <div
                  className="radial-progress"
                  style={{ "--value": 70 } /* as React.CSSProperties */}
                  aria-valuenow={70}
                  role="progressbar"
                >
                  70%
                </div>
              </div>
              <div className="collapse-content  bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content">
                <div className="flex justify-between">
                  <button 
                    onClick={() => {
                      setSelectedSubject(e);
                      document.getElementById("my_modal_6").showModal();
                    }}
                  className="btn"><FontAwesomeIcon icon={faNoteSticky} />Resources</button>
                  <button
                    onClick={() => {
                      setSelectedSubject(e);
                      document.getElementById("my_modal_3").showModal();
                    }}
                    disabled={e.subdesc == null}
                    className="btn"
                  >
                    <FontAwesomeIcon icon={faCircleQuestion} /> Show Description
                  </button>

                  <button onClick={() => handleDeleteSub(e.id)} className="btn">
                    <FontAwesomeIcon icon={faTrash} /> Delete Subject
                  </button>
                </div>
                <Topics
                  subid={e.id}
                  handleNewSubAdd={() => handleNewSubAdd(e.id)}
                  subjects={props.subjects}
                  setSubjects={props.setSubjects}
                />
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Body;
