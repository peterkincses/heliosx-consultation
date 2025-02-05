import { NextResponse } from "next/server";

// Mock database of questions
import { questions } from "@/data/consultationQuestions";

// API endpoint: `/api/questions?slug=heart`
export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");

    if (!slug) {
        return NextResponse.json({ error: "Missing slug" }, { status: 400 });
    }

    // Filter questions based on the slug
    const filteredQuestions = questions.filter(q => q.category === slug);

    return NextResponse.json(filteredQuestions);
}
