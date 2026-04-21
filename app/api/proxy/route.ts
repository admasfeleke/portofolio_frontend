import { NextRequest, NextResponse } from "next/server";

// Use server-side env var (no NEXT_PUBLIC_ prefix) for the proxy
const API_BASE = process.env.API_URL
  || process.env.NEXT_PUBLIC_API_URL
  || "https://admasdev.ct.ws/api";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const endpoint = searchParams.get("endpoint") || "profile";

  try {
    const url = `${API_BASE}/${endpoint}`;
    console.log(`Proxy fetching: ${url}`);

    const res = await fetch(url, {
      headers: {
        Accept: "application/json",
        "User-Agent": "Mozilla/5.0 (compatible; Portfolio/1.0)"
      },
      cache: "no-store"
    });

    if (!res.ok) {
      console.error(`API returned ${res.status} for ${url}`);
      return NextResponse.json(
        { error: `API error: ${res.status}` },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data, {
      headers: { "Cache-Control": "no-store" }
    });

  } catch (err) {
    console.error(`Proxy error for ${endpoint}:`, err);
    return NextResponse.json(
      { error: "Failed to reach API", detail: String(err) },
      { status: 500 }
    );
  }
}
