import TaskItem from "./task-item";
import { getTasks } from "@/lib/data";

export default async function TaskList() {
  const tasks = await getTasks();

  if (tasks.length === 0) {
    return (
      <div className="text-center p-4 text-gray-500">
        タスクがありません。新しいタスクを追加してください。
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">タスク一覧</h2>
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
}
