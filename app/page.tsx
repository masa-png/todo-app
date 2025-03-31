"use client";

import { useState } from "react";
import TaskForm from "@/components/task-form";
import TaskList from "@/components/task-list";

export default function Home() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleTaskCreated = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div className="bg-gray-50">
      <header className="py-4 bg-gray-100 flex justify-around px-4 w-auto">
        <div className="text-purple-800 font-bold text-xl">
          <a href="/">ToDoアプリ</a>
        </div>
        <button className="text-purple-800 hover:text-purple-600">
          ログアウト
        </button>
      </header>

      <div className="max-w-4xl mx-auto min-h-screen flex flex-col">
        <main className="flex-grow px-4 py-8">
          <div className="max-w-xl mx-auto">
            <TaskForm onTaskCreated={handleTaskCreated} />
            <TaskList key={refreshKey} />
          </div>
        </main>
      </div>

      <footer className="py-4 text-center text-gray-500 text-sm bg-gray-100">
        © ToDoアプリ All rights reserved.
      </footer>
    </div>
  );
}
