"use client";

import { useEffect, useState } from "react";
import { Task } from "@/types/task";
import TaskItem from "./task-item";

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchTasks = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/tasks");
      if (!response.ok) {
        throw new Error("タスクの取得に失敗しました");
      }

      const data = await response.json();
      setTasks(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // タスクが更新されたときのハンドラー
  const handleTaskUpdated = () => {
    fetchTasks();
  };

  // タスクが削除されたときのハンドラー
  const handleTaskDeleted = () => {
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  if (loading) {
    return <div className="text-center p-4">読み込み中...</div>;
  }

  if (error) {
    return <div className="text-red-500 p-4 text-center">{error}</div>;
  }

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
        <TaskItem
          key={task.id}
          task={task}
          onTaskUpdated={handleTaskUpdated}
          onTaskDeleted={handleTaskDeleted}
        />
      ))}
    </div>
  );
}
