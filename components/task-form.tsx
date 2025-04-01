"use client";

import { useRef } from "react";
import { createTaskAction } from "@/lib/actions";
import Button from "./ui/button";

export default function TaskForm() {
  const formRef = useRef<HTMLFormElement>(null);

  async function action(formData: FormData) {
    await createTaskAction(formData);
    formRef.current?.reset();
  }

  return (
    <div className="bg-white p-6 rounded shadow-md max-w-xl mx-auto mb-8">
      <h2 className="text-xl font-bold mb-6 text-center">Todoアプリ</h2>
      <form ref={formRef} action={action} className="space-y-4">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            タイトルを入力
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded focus:outline-none"
            placeholder="例:Javaの学習"
            required
          />
        </div>
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            タスクの詳細を入力
          </label>
          <textarea
            id="description"
            name="description"
            className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded focus:outline-none"
            rows={3}
            placeholder="例:Spring Bootでアプリ作成"
          />
        </div>
        <div className="flex justify-center mt-4">
          <Button type="submit" className="w-auto min-w-[150px]">
            タスクを追加
          </Button>
        </div>
      </form>
    </div>
  );
}
