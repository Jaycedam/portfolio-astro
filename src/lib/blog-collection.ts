import { getCollection } from "astro:content";
import type { Blog } from "@lib/types";

export async function getPosts(homepage: boolean) {
    let data = (await getCollection("blog")).sort(
        (a, b) => b.data.date.valueOf() - a.data.date.valueOf(),
    );

    if (homepage) {
        data.slice(0, 2);
    }

    return data;
}

export function filterPostsByTag(projects: Blog[], tag: string) {
    return projects.filter((project) => project.data.tags.includes(tag));
}

export async function getPostsTags() {
    const data = await getPosts(false);
    const tags = Array.from(
        new Set(data.flatMap((item) => item.data.tags)),
    ).map((tag) => ({ tag }));

    return tags;
}
