import type { CollectionEntry } from "astro:content";

export type Navlinks = {
    href: string;
    label: string;
};

export type Project = CollectionEntry<"projects">;
export type Blog = CollectionEntry<"blog">;
