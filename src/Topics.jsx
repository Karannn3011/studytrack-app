import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSubject } from "./SubjectContext.jsx";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
function Topics(props) {
  const { selectedSubject } = useSubject();
  return (
    <div
      tabIndex={0}
      className="collapse w-full overflow-x-scroll collapse-open bg-base-100 mt-4 border-base-300 border"
    >
      <div className="collapse-title w-[100%] font-semibold">
        <div className="flex justify-between items-center">
          <p className="text-base-content">Topics <span className="md:hidden">(Scroll for smaller devices)</span></p>
          <div
            onClick={(e) => {
              e.stopPropagation();
              document.getElementById("my_modal_5").showModal();
            }}
            className="btn hover:bg-base-100/50"
          >
            + Add a Topic
          </div>
        </div>
      </div>

      <div id="topicheader" className="collapse-content w-full text-sm">
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th></th>
                <th>Topic</th>

                <th>Remarks</th>
                <th>Star</th>
                <th>Completed</th>
                <th></th>
              </tr>
            </thead>
            {selectedSubject?.topics?.length == 0 ? (
              <tbody>
              <tr>
                <td
                  colSpan={7}
                  className="text-xl mt-5 italic text-center text-base-content/50"
                >
                  No topics added currently...
                </td>
              </tr>
              </tbody>
            ) : (
              <tbody className="text-base-content *:hover:bg-base-300">
                {props.subject?.topics.map((t, ix) => (
                  <tr key={ix}>
                    <th>{ix + 1}</th>
                    <td>{t.topicname}</td>
                    <td>
                      <button
                        onClick={() => {
                          props.setViewedTopic(t);
                          document.getElementById("my_modal_8").showModal();
                        }}
                        className="btn"
                      >
                        View
                      </button>
                    </td>
                    <td>
                      <div className="bg-base-content/20 rounded-full w-10 h-10 flex py-3 justify-center items-center">
                        <input
                          type="checkbox"
                          checked={t.isStarred}
                          onChange={() =>
                            props.handleStarChange(t.id, selectedSubject)
                          }
                          className="mask mask-star checkbox text-transparent bg-transparent checked:border-orange-500 checked:bg-orange-400"
                        />
                      </div>
                    </td>
                    <td>
                      <select
                        onChange={() =>
                          props.handleTopicStatusChange(t.id, selectedSubject)
                        }
                        defaultValue="No"
                        className="select"
                      >
                        <option>Yes</option>
                        <option>No</option>
                      </select>
                    </td>
                    <td>
                      <button
                        className="cursor-pointer hover:-translate-y-1 transition-transform duration-200"
                        onClick={() =>
                          props.handleTopicDelete(t.id, selectedSubject)
                        }
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        </div>
      </div>
    </div>
  );
}

export default Topics;
