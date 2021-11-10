import { readdirSync } from 'fs'
import path from 'path'

export const POSTS_PATH = path.join(process.cwd(), 'data')

export const postFilePaths = readdirSync(POSTS_PATH)
