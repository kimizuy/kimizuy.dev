import fs from "fs";
import path from "path";

export const NAME = "kimizuy";
export const SITE_TITLE = "kimizuy blog";
export const SITE_URL = "https://blog.kimizuy.dev";
export const PROFILE_IMAGE = `${SITE_URL}/profile.jpg`;
export const TWITTER = "https://twitter.com/kimizuy";
export const GITHUB = "https://github.com/kimizuy/blog.kimizuy.dev";
export const POSTS_PATH = path.join(process.cwd(), "_data");
export const POST_FILE_PATHS = fs.readdirSync(POSTS_PATH);