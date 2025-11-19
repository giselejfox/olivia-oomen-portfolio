import { NextResponse } from "next/server";
import { draftMode } from "next/headers";

export async function GET(req) {

    console.log("HIT /api/preview ROUTE");

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

        // ⭐ Enable draft mode BEFORE redirect
        draftMode().enable();

        // ⭐ Redirect MUST be relative to preserve cookies on Vercel
        return NextResponse.redirect(`/work/${slug}`);

    } catch (err) {
        console.error("PREVIEW ROUTE ERROR:", err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
