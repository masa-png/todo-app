"use client";

import { useState } from "react";
import { Task } from "@prisma/client";
import { deleteTaskAction, updateTaskAction } from "@/lib/actions";
import Button from "./ui/button";

interface TaskItemProps {
  task: Task;
}

export default function TaskItem({ task }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || "");

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleString("ja-JP", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // const handleToggleComplete = async () => {
  //   await updateTask({ completed: !completed });
  //   setCompleted(!completed);
  // };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateTaskAction(task.id, { title, description });
    setIsEditing(false);
  };

  const handleDelete = async () => {
    if (!confirm("このタスクを削除してもよろしいですか？")) {
      return;
    }
    await deleteTaskAction(task.id);
  };

  return (
    <div className="bg-white p-4 rounded shadow-md mb-4">
      {isEditing ? (
        <form onSubmit={handleUpdate}>
          <div className="mb-3">
            <label
              htmlFor={`title-${task.id}`}
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              タイトル *
            </label>
            <input
              type="text"
              id={`title-${task.id}`}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded focus:outline-none"
              required
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor={`description-${task.id}`}
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              説明
            </label>
            <textarea
              id={`description-${task.id}`}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded focus:outline-none"
              rows={2}
            />
          </div>
          <div className="flex space-x-2">
            <Button type="submit">保存</Button>
            <Button
              type="button"
              onClick={() => setIsEditing(false)}
              className="bg-gray-300 text-gray-700 hover:bg-gray-400"
            >
              キャンセル
            </Button>
          </div>
        </form>
      ) : (
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3">
            <div>
              <h3 className="text-lg font-medium">{task.title}</h3>
              <p className="text-xs text-gray-500 mt-1">
                {formatDate(task.createdAt)}
              </p>
            </div>
          </div>
          <div className="flex space-x-2 items-center">
            <a href="#" className="text-blue-500 hover:underline text-sm">
              詳細
            </a>
            <button
              onClick={() => setIsEditing(true)}
              className="text-blue-500 hover:underline text-sm"
            >
              編集
            </button>
            <button
              onClick={handleDelete}
              className="text-red-500 hover:underline text-sm"
            >
              削除
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
