import { NextRequest, NextResponse } from "next/server";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "https://admasdev.ct.ws/api";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const endpoint = searchParams.get("endpoint") || "profile";

  try {
    const res = await fetch(`${API_BASE}/${endpoint}`, {
      headers: { Accept: "application/json" },
      cache: "no-store"
    });

    if (!res.ok) {
      return NextResponse.json({ error: "API error" }, { status: res.status });
    }

    const data = await res.json();

    return NextResponse.json(data, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "no-store"
      }
    });
  } catch {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}
