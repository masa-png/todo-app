"use server";

import { createTask, deleteTask, updateTask } from "./data";
import { revalidatePath } from "next/cache";

export async function createTaskAction(formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;

  await createTask(title, description);
  revalidatePath("/");
}

export async function updateTaskAction(id: string, data: any) {
  await updateTask(id, data);
  revalidatePath("/");
}

export async function deleteTaskAction(id: string) {
  await deleteTask(id);
  revalidatePath("/");
}
