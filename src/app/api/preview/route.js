import { NextResponse } from "next/server";

export async function GET(req) {
  const secret = req.nextUrl.searchParams.get("secret");
  const slug = req.nextUrl.searchParams.get("slug");

  if (secret !== process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN || !slug) {
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }

  // Enable preview mode
  const res = NextResponse.redirect(`/work/${slug}`);
  res.cookies.set("__prerender_bypass", "1");
  res.cookies.set("__next_preview_data", "1");

  return res;
}
