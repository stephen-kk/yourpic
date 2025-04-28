// app/api/generate/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { prompt } = await req.json();
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ error: "Missing OpenAI API Key" }, { status: 500 });
  }

  if (!prompt || typeof prompt !== "string") {
    return NextResponse.json({ error: "Invalid prompt" }, { status: 400 });
  }

  try {
    const response = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "dall-e-3", // ✅ 指定使用 DALL·E 3
        prompt,
        n: 1,
        size: "1024x1024",
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json({ error: data.error?.message || "OpenAI API Error" }, { status: response.status });
    }

    const imageUrl = data.data[0].url;
    return NextResponse.json({ imageUrl });
  } catch (error) {
    console.error("OpenAI API Error:", error);
    return NextResponse.json({ error: "Failed to generate image" }, { status: 500 });
  }
}
