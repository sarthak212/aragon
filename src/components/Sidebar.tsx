"use client";

import { useTask } from "@/hooks/task";

export default function Sidebar({
  items,
  setModalBoard,
}: {
  items: any[];
  setModalBoard: any;
}) {
  const selectBoard = useTask((state: any) => state.setSelectedBoard);
  const selectedBoard = useTask((state: any) => state.selectedBoard);
  return (
    <>
      <aside
        id="default-sidebar"
        className="highlight pt-7  flex justify-center flex-col fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 text-white"
        aria-label="Sidebar"
      >
        <a
          href="https://flowbite.com/"
          className="flex items-center space-x-3 px-7 rtl:space-x-reverse"
        >
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-8"
            alt="Flowbite Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Flowbite
          </span>
        </a>
        <small className="font-semibold mt-7 px-7">
          ALL BOARDS {items.length ? `(${items.length})` : ""}
        </small>
        <div className="h-full overflow-y-auto">
          <ul className="space-y-2 font-medium">
            {items.map((e) => (
              <li
                key={e.id}
                onClick={() => selectBoard(e.id)}
                className={`${
                  selectedBoard == e.id ? "bg-indigo-500" : ""
                } py-2 rounded-r-3xl mt-3 text-gray-50 w-11/12 dark:text-white hover:bg-indigo-700 dark:hover:bg-gray-700`}
              >
                <a href="#" className="flex items-center px-7 group">
                  <svg
                    className="flex-shrink-0 w-5 h-4 text-base text-gray-50 transition duration-75 dark:text-white group-hover:text-gray-50 dark:group-hover:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 18 18"
                  >
                    <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
                  </svg>
                  <span className="ms-3">{e.title}</span>
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-3">
            <a
              onClick={() => {
                setModalBoard(true);
              }}
              href="#"
              className="flex items-center px-7 group text-purple-500 hover:text-purple-700"
            >
              <svg
                className="flex-shrink-0 w-5 h-4 text-base text-purple-500 transition duration-75 dark:text-white group-hover:text-purple-700 dark:group-hover:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 18 18"
              >
                <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
              </svg>
              <span className="ms-3">+ Create New Board</span>
            </a>
          </div>
        </div>
      </aside>
    </>
  );
}
