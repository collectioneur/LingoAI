import OpenAI from "openai";
import { NextRequest, NextResponse } from "next/server";

const client = new OpenAI({
  apiKey: process.env.OPEN_AI_API_KEY,
});

export async function POST(req: NextRequest) {
  const { language, lyrics } = await req.json();
  try {
    const chatCompletion = await client.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are a translator. You should only provide the translated lyrics of the song line by line, without any additional text or explanation.You must translate every line of the text exactly.",
        },
        {
          role: "user",
          content: `Translate to ${language} this song line by line(with title) send back only translated lyrics: ${lyrics}`,
        },
      ],
      model: "gpt-4o-mini",
    });
    return NextResponse.json({
      data: chatCompletion.choices[0].message.content,
    });
  } catch (err) {
    console.error("Error Genius API:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
