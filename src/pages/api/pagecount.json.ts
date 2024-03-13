import type { APIRoute } from "astro";
import { sql } from "drizzle-orm/sql";
import { page } from "@db/schema";
import { db } from "@db/db";

export const prerender = false;

export const GET: APIRoute = async ({ request }) => {
  // we get the slug from the url, passed as a query param,
  // eg /api/pagecount?slug=hello-world
  const slug = new URL(request.url).searchParams.get("slug");

  // if no slug provided, we return a bad request response
  if (!slug) {
    return new Response(
      JSON.stringify({
        message: "Bad request on slug: " + slug + ", url: " + request.url,
      }),
      {
        status: 400,
        statusText: "Bad Request.",
      }
    );
  }

  // if slug provided, we increment the view count using upsert,
  // we also return the new count in the same query
  const upCount = await db
    .insert(page)
    .values({ slug: slug })
    .onConflictDoUpdate({
      target: page.slug,
      set: { views: sql`views + 1` },
    })
    .returning({ views: page.views });

  return new Response(
    JSON.stringify({
      message: upCount[0].views,
    }),
    {
      status: 200,
    }
  );
};
