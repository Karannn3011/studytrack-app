import { useSubject } from "./SubjectContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf, faNewspaper } from "@fortawesome/free-solid-svg-icons";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import { useState, useEffect } from "react";
import logonew from "./assets/logonew.png";

export function Dialog1(props) {
  return (
    <>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg mb-4">
            Hello! Please enter your name:
          </h3>
          <form
            className="flex flex-col lg:flex-row gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              props.setUsername(
                document.getElementById("usernameinput").value.trim()
              );
              localStorage.setItem("userName", props.userName);
              document.getElementById("my_modal_1").close();
            }}
          >
            <input
              id="usernameinput"
              type="text"
              placeholder="Type here"
              className="input"
            />
            <button type="submit" className="btn ">
              OK
            </button>
          </form>
        </div>
      </dialog>
    </>
  );
}

export function Dialog2(props) {
  return (
    <dialog id="my_modal_2" className="modal">
      <div className="modal-box">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg mb-4">
          Enter details for new subject:
        </h3>
        <form
          className=""
          onSubmit={(e) => {
            e.stopPropagation();
            props.handleNewSubAdd(e);
          }}
        >
          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full border p-4">
            <legend className="fieldset-legend">
              <p className="lg:text-lg font-semibold">Details:</p>
            </legend>

            <label className="label">Title</label>
            <input
              id="subjectname"
              type="text"
              className="input w-full"
              placeholder="Eg: Math"
            />

            <label className="label">Description</label>

            <textarea
              id="subjectdesc"
              type="text"
              placeholder="About the subject"
              className="textarea h-24 w-full"
            ></textarea>

            <label className="label">Tags (separate by commas)</label>
            <input
              id="subjecttags"
              type="text"
              className="input w-full"
              placeholder=""
            />
          </fieldset>
          <button type="submit" className="btn mt-3 w-full">
            Add
          </button>
        </form>
      </div>
    </dialog>
  );
}

export function Dialog3() {
  const { selectedSubject } = useSubject();

  return (
    <dialog id="my_modal_3" className="modal">
      <div className="modal-box ">
        <h3 className="font-bold text-lg">Subject Description</h3>
        <div className="w-[90%]"></div>
        <p className="py-4 w-full">{selectedSubject?.subdesc || " "}</p>
        <div className="modal-action">
          <form method="dialog">
            <button className="btn">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  );
}

export function Dialog4() {
  return (
    <dialog id="my_modal_4" className="modal">
      <div className="modal-box">
        <img src={logonew} alt="StudyTrack" className="w-1/2 mx-auto" />
        <p className="py-4 text-sm md:text-md">
          StudyTrack helps you organize your learning by allowing you to create
          subjects, add topics, and track your progress visually. You can attach
          resources like videos, PDFs, and articles to each subject, add
          personal notes, and mark topics as completed or starred for easy
          revision. The app provides a simple interface to manage your study
          workflow and keep all your materials in one place.
        </p>
        <p className="text-center mt-3">
          Made by: <a target="_blank"
                            rel="noopener noreferrer" href="https://github.com/Karannn3011">Karannn3011</a>
        </p>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}

export function Dialog5(props) {
  const { selectedSubject } = useSubject();
  return (
    <>
      <dialog id="my_modal_5" className="modal">
        <div className="modal-box">
          <fieldset className="fieldset bg-base-200 border-base-300 w-full rounded-box border p-4">
            <legend className="fieldset-legend text-xl">Topic</legend>
            <div className="">
              <form className="flex gap-x-10">
                <input
                  id="newtopicname"
                  type="text"
                  className="input "
                  placeholder="Topic Name"
                />
                <button
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault();
                    props.handleNewTopicAdd(selectedSubject);
                  }}
                  className="btn"
                >
                  Add
                </button>
              </form>
            </div>
          </fieldset>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
      </dialog>
    </>
  );
}

export function Dialog6(props) {
  const { selectedSubject } = useSubject();
  return (
    <>
      <dialog id="my_modal_6" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Resources</h3>
          <div className="py-4 text-base-content">
            {!selectedSubject ? (
              <p className="flex items-center justify-center">
                No subject selected.
              </p>
            ) : !Array.isArray(selectedSubject.resources) ||
              selectedSubject.resources.length === 0 ? (
              <p className="flex items-center justify-center">
                No resources added yet.
              </p>
            ) : (
              <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
                <table className="table">
                  {/* head */}
                  <thead>
                    <tr>
                      <th></th>
                      <th>Name</th>
                      <th>Link</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {(selectedSubject.resources || []).map((res, idx) => (
                      <tr key={res.id || idx}>
                        <th>{idx + 1}</th>
                        <td>{res.name}</td>
                        <td>
                          <a
                            href={res.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            title={res.type}
                            className="*:scale-150"
                          >
                            {res.type === "PDF" && (
                              <FontAwesomeIcon icon={faFilePdf} />
                            )}
                            {res.type === "Video" && (
                              <FontAwesomeIcon icon={faYoutube} />
                            )}
                            {res.type === "Article" && (
                              <FontAwesomeIcon icon={faNewspaper} />
                            )}
                            {/* fallback if type is unknown */}
                            {!["PDF", "Video", "Article"].includes(
                              res.type
                            ) && <FontAwesomeIcon icon={faNewspaper} />}
                          </a>
                        </td>
                        <td>
                          <btn
                            onClick={() =>
                              props.handleResourceDelete(
                                res.id,
                                selectedSubject
                              )
                            }
                            className="btn btn-xs"
                          >
                            X
                          </btn>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
          <div className="flex justify-between">
            <button
              onClick={() => document.getElementById("my_modal_7").showModal()}
              className="btn"
            >
              Add a resource
            </button>
            <button
              onClick={() => document.getElementById("my_modal_6").close()}
              className="btn"
            >
              Close
            </button>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}

export function Dialog7(props) {
  const { selectedSubject } = useSubject();
  return (
    <>
      <dialog id="my_modal_7" className="modal">
        <div className="modal-box">
          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full *:w-full border p-4">
            <legend className="fieldset-legend text-xl">
              Resource details
            </legend>

            <label className="label">Name</label>
            <input
              id="resourceName"
              type="text"
              className="input"
              placeholder="Eg: Lecture 1 - Introduction to Arrays"
              required
            />

            <label className="label">Link</label>
            <input
              id="resourceLink"
              type="url"
              className="input"
              placeholder="https://youtube.com/...."
              required
            />

            <label className="label">Type:</label>
            <select id="resourceType" defaultValue="Video" className="select">
              <option disabled={true}>Type of resource</option>
              <option>Video</option>
              <option>PDF</option>
              <option>Article</option>
            </select>
          </fieldset>
          <div className="flex justify-between mt-4">
            <button
              onClick={() => props.handleNewResourceAdd(selectedSubject)}
              className="btn"
            >
              + Add
            </button>
            <button
              onClick={() => document.getElementById("my_modal_7").close()}
              className="btn"
            >
              Close
            </button>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}

export function Dialog8(props) {
  const [localRemark, setLocalRemark] = useState("");
  useEffect(() => {
    setLocalRemark(props.topic?.remark || "");
  }, [props.topic]);

  return (
    <dialog id="my_modal_8" className="modal">
      <div className="modal-box">
        <fieldset className="fieldset text-base-content bg-base-200 border-base-300 rounded-box w-full border p-4">
          <legend className="fieldset-legend text-xl">Remarks</legend>
          <label className="label text-lg">Notes (Edit to change)</label>
          <textarea
            id="remarkinput"
            value={localRemark}
            onChange={(e) => setLocalRemark(e.target.value)}
            onBlur={(e) =>
              props.handleRemarkChange(props.topic?.id, e.target.value)
            }
            className="textarea w-full text-base-content"
            placeholder="Bio"
          ></textarea>
        </fieldset>
        <button
          onClick={() => document.getElementById("my_modal_8").close()}
          className="btn w-full mt-3"
        >
          Close
        </button>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}
