"use client";

import { useState } from "react";
import { Task, UpdateTaskInput } from "@/types/task";
import Button from "./ui/button";

interface TaskItemProps {
  task: Task;
  onTaskUpdated: () => void;
  onTaskDeleted: () => void;
}

export default function TaskItem({
  task,
  onTaskUpdated,
  onTaskDeleted,
}: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || "");
  const [completed, setCompleted] = useState(task.completed);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleString("ja-JP", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleToggleComplete = async () => {
    await updateTask({ completed: !completed });
    setCompleted(!completed);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateTask({ title, description });
    setIsEditing(false);
  };

  const updateTask = async (data: UpdateTaskInput) => {
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch(`/api/tasks/${task.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const responseData = await response.json();
        throw new Error(responseData.error || "タスクの更新に失敗しました");
      }

      onTaskUpdated();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("このタスクを削除してもよろしいですか？")) {
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch(`/api/tasks/${task.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "タスクの削除に失敗しました");
      }

      onTaskDeleted();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow-md mb-4">
      {error && <p className="text-red-500 mb-2">{error}</p>}
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
            <Button type="submit" disabled={isSubmitting || !title}>
              保存
            </Button>
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
              disabled={isSubmitting}
            >
              編集
            </button>
            <button
              onClick={handleDelete}
              className="text-red-500 hover:underline text-sm"
              disabled={isSubmitting}
            >
              削除
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
