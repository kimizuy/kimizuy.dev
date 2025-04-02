import fs from "node:fs";
import path from "node:path";

export const NAME = "kimizuy";
export const SITE_TITLE = "kimizuy.dev";
export const SITE_URL = "https://kimizuy.dev";
export const TWITTER = "https://twitter.com/kimizuy";
export const GITHUB = "https://github.com/kimizuy/kimizuy.dev";
export const POSTS_PATH = path.join(process.cwd(), "_posts");
export const POST_FILE_PATHS = fs.readdirSync(POSTS_PATH);
export const DOCS_PATH = path.join(process.cwd(), "_docs");
