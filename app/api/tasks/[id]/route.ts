import prisma from "@/lib/client";
import { NextRequest, NextResponse } from "next/server";

// 特定のタスクを取得
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const task = await prisma.task.findUnique({
      where: { id },
    });

    if (!task) {
      return NextResponse.json(
        { error: "タスクが見つかりません" },
        { status: 404 }
      );
    }

    return NextResponse.json(task);
  } catch (error) {
    return NextResponse.json(
      { error: "タスクの取得に失敗しました" },
      { status: 500 }
    );
  }
}

// タスクの更新
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const body = await request.json();
    const { title, description, completed } = body;

    const updatedTask = await prisma.task.update({
      where: { id },
      data: {
        ...(title !== undefined && { title }),
        ...(description !== undefined && { description }),
        ...(completed !== undefined && { completed }),
      },
    });

    return NextResponse.json(updatedTask);
  } catch (error) {
    return NextResponse.json(
      { error: "タスクの更新に失敗しました" },
      { status: 500 }
    );
  }
}

// タスクの削除
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    await prisma.task.delete({
      where: { id },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return NextResponse.json(
      { error: "タスクの削除に失敗しました" },
      { status: 500 }
    );
  }
}
