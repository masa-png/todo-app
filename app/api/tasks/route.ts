import prisma from "@/lib/client";
import { NextRequest, NextResponse } from "next/server";

// タスク一覧の取得
export async function GET() {
  try {
    const tasks = await prisma.task.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(tasks);
  } catch (error) {
    return NextResponse.json(
      { error: "タスクの取得に失敗しました" },
      { status: 500 }
    );
  }
}

// 新しいタスクの作成
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, description } = body;

    if (!title) {
      return NextResponse.json(
        { error: "タイトルは必須です" },
        { status: 400 }
      );
    }

    const task = await prisma.task.create({
      data: {
        title,
        description,
      },
    });

    return NextResponse.json(task, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "タスクの作成に失敗しました" },
      { status: 500 }
    );
  }
}
