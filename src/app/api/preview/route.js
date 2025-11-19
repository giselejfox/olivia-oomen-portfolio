import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        const secret = req.nextUrl.searchParams.get("secret");
        const slug = req.nextUrl.searchParams.get("slug");

        // Check for secret token
        if (!secret || secret !== process.env.NEXT_PUBLIC_PREVIEW_SECRET) {
            return NextResponse.json({ error: "Invalid secret" }, { status: 401 });
        }

        // Check for slug
        if (!slug) {
            return NextResponse.json({ error: "Missing slug" }, { status: 400 });
        }

        // Enable preview mode
        const res = NextResponse.redirect(`/work/${slug}`);
        res.cookies.set("__prerender_bypass", "1");
        res.cookies.set("__next_preview_data", "1");

        return res;
    } catch (err) {
        console.error("PREVIEW ROUTE ERROR:", err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
