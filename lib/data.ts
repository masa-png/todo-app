import prisma from "./client";
import { Task } from "@prisma/client";

// タスク一覧の取得
export async function getTasks() {
  try {
    const tasks = await prisma.task.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return tasks;
  } catch (error) {
    throw new Error("タスクの取得に失敗しました");
  }
}

// タスクの作成
export async function createTask(title: string, description?: string) {
  try {
    const task = await prisma.task.create({
      data: {
        title,
        description,
      },
    });
    return task;
  } catch (error) {
    throw new Error("タスクの作成に失敗しました");
  }
}

// タスクの更新
export async function updateTask(id: string, data: Partial<Task>) {
  try {
    const task = await prisma.task.update({
      where: { id },
      data,
    });
    return task;
  } catch (error) {
    throw new Error("タスクの更新に失敗しました");
  }
}

// タスクの削除
export async function deleteTask(id: string) {
  try {
    await prisma.task.delete({
      where: { id },
    });
  } catch (error) {
    throw new Error("タスクの削除に失敗しました");
  }
}
