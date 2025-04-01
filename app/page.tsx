import TaskForm from "@/components/task-form";
import TaskList from "@/components/task-list";

export default function Home() {
  return (
    <div className="bg-gray-50">
      <header className="py-4 bg-gray-100 flex justify-around px-4 w-auto">
        <div className="text-gray-500 font-bold text-xl hover:text-gray-400">
          <a href="/">ToDoアプリ</a>
        </div>
        <button className="text-gray-500 hover:text-gray-400">
          ログアウト
        </button>
      </header>

      <div className="max-w-4xl mx-auto min-h-screen flex flex-col">
        <main className="flex-grow px-4 py-8">
          <div className="max-w-xl mx-auto">
            <TaskForm />
            <TaskList />
          </div>
        </main>
      </div>

      <footer className="py-4 text-center text-gray-500 text-sm bg-gray-100">
        © ToDoアプリ All rights reserved.
      </footer>
    </div>
  );
}
