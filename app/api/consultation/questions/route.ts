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

    // Set cache-control header (cache for 10 minutes)
    const headers = new Headers({
        //"Cache-Control": "public, max-age=600, stale-while-revalidate=300", // Cache for 10 minutes
        "Cache-Control": "public, max-age=86400, immutable", // Cache for 1 day
    });

    return NextResponse.json(filteredQuestions, {headers});
}
