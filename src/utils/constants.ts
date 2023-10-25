import fs from "fs";
import path from "path";

export const NAME = "kimizuy";
export const SITE_TITLE = "kimizuy.dev";
export const SITE_DESCRIPTION =
  "kimizuy is a front-end engineer specializing in React and TypeScript";
export const SITE_URL = "https://kimizuy.dev";
export const TWITTER = "https://twitter.com/kimizuy";
export const GITHUB = "https://github.com/kimizuy/kimizuy.dev";
export const POSTS_PATH = path.join(process.cwd(), "_posts");
export const POST_FILE_PATHS = fs.readdirSync(POSTS_PATH);
