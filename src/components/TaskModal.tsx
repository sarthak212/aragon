import { useTask } from "@/hooks/task";
import { useEffect, useState } from "react";
import { Button } from "./Button";
import { nanoid } from "nanoid";

export default function TaskModal({
  setModal,
  type = "new",
  data,
}: {
  setModal: any;
  type?: string;
  data?: any;
}) {
  const [title, setTitle] = useState("");
  const taskList = useTask((state: any) => state.taskDetails);
  const selectedBoard = useTask((state: any) => state.selectedBoard);
  const setTaskList = useTask((state: any) => state.setTaskDetails);
  const updateTask = useTask((state: any) => state.updateTask);
  const deleteTask = useTask((state: any) => state.deleteTask);
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>({});

  useEffect(() => {
    if (data) {
      setTitle(data.title);
      setDescription(data.description);
      setStatus(data.status);
    }
  }, [data]);
  const handleSubmitForm = (e: any) => {
    e.preventDefault();
    if (!title || !description || !status) {
      if (!title) {
        setError({ title: "Title is required!" });
      } else if (!description) {
        setError({ description: "Description is required!" });
      } else {
        setError({ status: "Status is required!" });
      }
      return;
    }
    if (!selectedBoard) {
      setError("Please select a board or create a new one.");
      return;
    }
    setLoading(true);
    if (type == "new")
      setTaskList({
        [selectedBoard]: {
          ...taskList[selectedBoard],
          [status]: [
            ...taskList[selectedBoard][status],
            { title, description, status, id: nanoid(10) },
          ],
        },
      });
    else {
      updateTask(selectedBoard, data.id, data.status, {
        title,
        description,
        status,
        id: data.id,
      });
    }
    setLoading(false);
    setModal(false);
  };

  const handleDelete = () => {
    deleteTask(selectedBoard, data.id, data.status);
    setModal(false);
  };
  return (
    <div
      tabIndex={-1}
      aria-hidden="true"
      className="overflow-y-auto overflow-x-hidden flex fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-gray-900 bg-opacity-50 dark:bg-gray-900 dark:bg-opacity-50"
    >
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative highlight rounded-lg shadow dark:bg-gray-700">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-xl font-semibold text-white dark:text-white">
              {type == "new" ? "Create Task" : "Update Task"}
            </h3>
            <button
              type="button"
              onClick={() => setModal(false)}
              className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="authentication-modal"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>

          <div className="p-4 md:p-5">
            <form className="space-y-4" action="#">
              <div>
                <label
                  htmlFor="title"
                  className="block mb-2 text-sm font-medium text-gray-300 dark:text-white"
                >
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                    setError({});
                  }}
                  className="bg-gray-900 text-white text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="Resolve Bug"
                  required
                />
              </div>
              {error.title ? (
                <div
                  className="text-red-700 my-1 rounded relative"
                  role="alert"
                >
                  <span className="block sm:inline">{error.title}</span>
                </div>
              ) : (
                ""
              )}
              <div>
                <label
                  htmlFor="description"
                  className="block mb-2 text-sm font-medium text-gray-300 dark:text-white"
                >
                  Description
                </label>
                <input
                  type="text"
                  name="description"
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                    setError({});
                  }}
                  placeholder="Fix the bug in the login page"
                  className="bg-gray-900 text-white text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  required
                />
              </div>
              {error.description ? (
                <div
                  className="text-red-700 my-1 rounded relative"
                  role="alert"
                >
                  <span className="block sm:inline">{error.description}</span>
                </div>
              ) : (
                ""
              )}
              <div>
                <label
                  htmlFor="countries"
                  className="block mb-2 text-sm font-medium text-gray-300 dark:text-white"
                >
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  value={status}
                  onChange={(e) => {
                    setStatus(e.target.value);
                    setError({});
                  }}
                  className="bg-gray-900 text-gray-100 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option selected>Choose a status</option>
                  <option value="todo">To do</option>
                  <option value="inprogress">In progress</option>
                  <option value="done">Done</option>
                </select>
              </div>

              {error.status ? (
                <div
                  className="text-red-700 my-1 rounded relative"
                  role="alert"
                >
                  <span className="block sm:inline">{error.status}</span>
                </div>
              ) : (
                ""
              )}
              {type == "new" ? (
                <Button
                  disabled={loading}
                  onClick={handleSubmitForm}
                  type="submit"
                  className="w-full"
                >
                  Create
                </Button>
              ) : (
                <div className="flex">
                  <Button
                    disabled={loading}
                    onClick={handleDelete}
                    type="submit"
                    className=" bg-red-600 mx-1 w-1/2 hover:bg-red-700"
                  >
                    Delete
                  </Button>
                  <Button
                    disabled={loading}
                    onClick={handleSubmitForm}
                    type="submit"
                    className="mx-1 w-1/2"
                  >
                    Update
                  </Button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
