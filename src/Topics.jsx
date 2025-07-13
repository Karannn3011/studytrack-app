import{ Dialog5} from "./Dialog.jsx";

function Topics(props) {
  

    function handleNewTopicAdd(subid) {
        props.handleNewTopicAdd(subid);
    }
  return (
    <>
      <div
        tabIndex={0}
        className="collapse bg-base-100 mt-4 border-base-300 border"
      >
        <div className="collapse-title font-semibold">
          <div className="flex justify-between items-center">
            <p className="text-base-content">Topics</p>
            <button onClick={() => {
                document.getElementById("my_modal_5").showModal();
            }} className="btn">+ Add a Topic</button>
          </div>
        </div>
        <Dialog5 subid={props.subid} handleNewTopicAdd={() => props.handleNewTopicAdd(props.subid)} />
        <div className="collapse-content text-sm">
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th></th>
                  <th>Topic</th>
                  <th>Resources</th>
                  <th>Remarks</th>
                  <th>Star</th>
                  <th>Completed</th>
                </tr>
              </thead>
              <tbody className="text-base-content *:hover:bg-base-300">
                <tr>
                  <th>1</th>
                  <td>Cy Ganderton</td>
                  <td>Quality Control Specialist</td>
                  <td>Blue</td>
                </tr>
                {/* row 2 */}
                <tr className="">
                  <th>2</th>
                  <td>Hart Hagerty</td>
                  <td>Desktop Support Technician</td>
                  <td>Purple</td>
                </tr>
                {/* row 3 */}
                <tr>
                  <th>3</th>
                  <td>Brice Swyre</td>
                  <td>Tax Accountant</td>
                  <td>Red</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default Topics;
