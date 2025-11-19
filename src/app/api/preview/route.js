import { NextResponse } from "next/server";
import { draftMode } from "next/headers";

export async function GET(req) {
    try {
        const secret = req.nextUrl.searchParams.get("secret");
        const slug = req.nextUrl.searchParams.get("slug");

        // Check for secret token
        if (!secret || secret !== process.env.PREVIEW_SECRET) {
            return NextResponse.json({ error: "Invalid secret" }, { status: 401 });
        }

        // Check for slug
        if (!slug) {
            return NextResponse.json({ error: "Missing slug" }, { status: 400 });
        }

        // Enable draft mode
        draftMode().enable();

        // CREATE ABSOLUTE URL FOR REDIRECT
        const redirectUrl = new URL(`/work/${slug}`, req.url).toString();

        // Enable preview mode
        const res = NextResponse.redirect(redirectUrl);
        // res.cookies.set("__prerender_bypass", "1");
        // res.cookies.set("__next_preview_data", "1");

        return res;

    } catch (err) {
        console.error("PREVIEW ROUTE ERROR:", err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
