import { useSubject } from "./SubjectContext";

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
      <div className="modal-box">
        <h3 className="font-bold text-lg">Subject Description</h3>
        <p className="py-4">{selectedSubject?.subdesc || " "}</p>
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
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg">Hello!</h3>
        <p className="py-4">Press ESC key or click on ✕ button to close</p>
      </div>
    </dialog>
  );
}

export function Dialog5(props) {
  return (
    <>
      <dialog id="my_modal_5" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <fieldset className="fieldset bg-base-200 border-base-300 w-full rounded-box border p-4">
            <legend className="fieldset-legend text-xl">Topic</legend>
            <div className="join gap-x-10">
              <input
                id="newtopicname"
                type="text"
                className="input join-item"
                placeholder="Topic Name"
              />
              <button
                onClick={() => props.handleNewTopicAdd(props.subid)}
                className="btn join-item"
              >
                Add
              </button>
            </div>
          </fieldset>
        </div>
      </dialog>
    </>
  );
}

export function Dialog6() {
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
              <ul>
                {(selectedSubject.resources || []).map((res, idx) => (
                  <li key={idx}>{res}</li>
                ))}
              </ul>
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
  const {selectedSubject} = useSubject();
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
              onClick={props.handleNewResourceAdd}
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
