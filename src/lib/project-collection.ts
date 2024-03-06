import { getCollection } from "astro:content";
import { type Project } from "@lib/types";

export async function getProjects(homepage: boolean) {
  const data = (
    await getCollection("projects", ({ data }) => {
      // if the featured prop is true, then filter the collection
      if (homepage) {
        return data.featured === true;
      }
      // else just return the full collection
      return true;
    })
  ).sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

  return data;
}

export function filterProjectByTag(projects: Project[], tag: string) {
  return projects.filter((project) => project.data.tags.includes(tag));
}

export async function getProjectTags() {
  const data = await getProjects(false);
  const tags = Array.from(new Set(data.flatMap((item) => item.data.tags))).map(
    (tag) => ({ tag })
  );

  return tags;
}
