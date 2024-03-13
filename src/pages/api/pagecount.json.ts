import type { APIRoute } from "astro";
import { db, PageCount, eq, sql } from "astro:db";

export const prerender = false;

export const GET: APIRoute = async ({ request }) => {
  // we get the slug from the url, passed as a query param,
  // eg /api/pagecount?slug=hello-world
  const slug = new URL(request.url).searchParams.get("slug");

  // if no slug provided, we return a bad request response
  if (!slug) {
    return new Response(
      JSON.stringify({
        message: 0,
      }),
      {
        status: 400,
        statusText: "Bad Request.",
      }
    );
  }

  // if slug provided, we increment the view count using upsert
  const upCount = await db
    .insert(PageCount)
    .values({ slug })
    .onConflictDoUpdate({
      target: PageCount.slug,
      set: { views: sql`views + 1` },
    });

  // if no rows affected, we return a bad request
  if (upCount.rowsAffected === 0) {
    return new Response(
      JSON.stringify({
        message: 0,
      }),
      {
        status: 400,
      }
    );
  }

  // if rows affected, we return the current view count
  const currCount = await db
    .select({ views: PageCount.views })
    .from(PageCount)
    .where(eq(PageCount.slug, slug));

  return new Response(
    JSON.stringify({
      message: currCount[0].views,
    }),
    {
      status: 200,
    }
  );
};
