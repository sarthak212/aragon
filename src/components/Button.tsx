import React from "react";

export function Button({
  children,
  ...props
}: {
  children: React.ReactNode;
  [key: string]: any;
}) {
  return (
    <button
      {...props}
      className="bg-indigo-500 py-3 px-5 text-xs font-semibold rounded-3xl text-gray-50 dark:text-white hover:bg-indigo-700 dark:hover:bg-gray-700"
    >
      {children}
    </button>
  );
}
