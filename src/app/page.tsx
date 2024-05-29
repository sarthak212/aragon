"use client";
import Sidebar from "@/components/Sidebar";

import { ThemeProvider } from "next-themes";
import { Button } from "@/components/Button";
import TaskModal from "@/components/TaskModal";
import { useEffect, useRef, useState } from "react";
import { useTask } from "@/hooks/task";
import BoardModal from "@/components/BoardModal";
import EditIcon from "@/svg/EditIcon";

const statusColor = [
  {
    name: "Todo",
    color: "bg-cyan-400",
    key: "todo",
  },
  {
    name: "Doing",
    color: "bg-purple-500",
    key: "inprogress",
  },
  {
    name: "Done",
    color: "bg-green-400",
    key: "done",
  },
];
export default function Home() {
  const [modal, setModal] = useState(false);
  const [modalBoard, setModalBoard] = useState(false);
  const taskDetail = useTask((state: any) => state.taskDetails);
  const selectedBoard = useTask((state: any) => state.selectedBoard);
  const [editBoard, setEditBoard] = useState<any>(null);
  const sidebarRef = useRef<any>(null);
  const [editTask, setEditTask] = useState<any>(null);
  const [displayList, setDisplayList] = useState<any>([]);
  const [sideBarStatus, setSidebarstatus] = useState(window.innerWidth >= 640);

  useEffect(() => {
    if (taskDetail) {
      let list = Object.keys(taskDetail);
      const tempList = [];
      for (let i = 0; i < list.length; i++) {
        tempList.push({
          id: list[i],
          ...taskDetail[list[i]],
        });
      }
      setDisplayList(tempList);
    }
  }, [taskDetail]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640) {
        setSidebarstatus(true); // Show sidebar on screens >= 640px
      } else {
        setSidebarstatus(false); // Hide sidebar on screens < 640px
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (
        window.innerWidth <= 640 &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target)
      ) {
        setSidebarstatus(false); // Close sidebar if clicked outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <ThemeProvider defaultTheme="dark">
      <main className="flex flex-col font-Roboto">
        <Sidebar
          refItem={sidebarRef}
          sidebarStatus={sideBarStatus}
          items={displayList}
          setModalBoard={setModalBoard}
          setEditBoard={setEditBoard}
        />
        <nav className="highlight flex flex-row justify-center text-white ml-0 sm:ml-64">
          {window.innerWidth < 640 ? (
            <button
              data-drawer-target="default-sidebar"
              data-drawer-toggle="default-sidebar"
              aria-controls="default-sidebar"
              type="button"
              onClick={() => setSidebarstatus(!sideBarStatus)}
              className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidde dark:text-gray-400 dark:hover:bg-gray-700"
            >
              <span className="sr-only">Open sidebar</span>
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  clip-rule="evenodd"
                  fill-rule="evenodd"
                  d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                ></path>
              </svg>
            </button>
          ) : (
            ""
          )}
          <div className="w-full flex flex-wrap items-center max-sm:font-normal justify-between p-7">
            <div>
              <h2 className=" text-xl font-bold">
                {selectedBoard && taskDetail[selectedBoard]
                  ? taskDetail[selectedBoard].title
                  : "Welcome To Board"}
              </h2>
            </div>

            <div>
              <Button
                onClick={() => {
                  setModal(true);
                }}
              >
                + Add New Task
              </Button>
            </div>
          </div>
        </nav>
        <div className="ml-0 mt-3 sm:ml-64 text-white flex flex-wrap">
          {statusColor.map((e) => (
            <div key={e.name} className="mx-4 my-3 min-w-80">
              <div className="flex items-center">
                <div className={`rounded-full ${e.color} w-3 h-3`}></div>

                <small className="mx-2 uppercase">{e.name}</small>
              </div>
              <div className="flex flex-col">
                {selectedBoard &&
                  taskDetail[selectedBoard] &&
                  taskDetail[selectedBoard][e.key].map((task: any) => (
                    <div key={task} className="mt-3">
                      <a
                        href="#"
                        className="block w-80 p-6 highlight rounded-lg shadow  dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
                      >
                        <h5 className="mb-2 flex flex-row items-center justify-between text-base tracking-tight text-white dark:text-white">
                          {task.title}
                          <button
                            id="edit-icon"
                            onClick={() => {
                              setEditTask(task);
                            }}
                            className="focus:outline-none"
                          >
                            <EditIcon
                              className={`flex-shrink-0 w-5 h-4 text-base  transition duration-75 dark:text-white dark:group-hover:text-white`}
                            />
                          </button>
                        </h5>
                        <p className="text-xs text-gray-300 dark:text-gray-400">
                          {task.description}
                        </p>
                      </a>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
        {modal ? <TaskModal setModal={setModal} /> : null}
        {modalBoard ? <BoardModal setModal={setModalBoard} /> : null}
        {editBoard ? (
          <BoardModal type="edit" setModal={setEditBoard} data={editBoard} />
        ) : null}
        {editTask ? (
          <TaskModal type="edit" setModal={setEditTask} data={editTask} />
        ) : null}
      </main>
    </ThemeProvider>
  );
}
