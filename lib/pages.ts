import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { getImageData } from './projects'

const rootDirectory = path.join(process.cwd(), 'content', 'pages')

export type PageData = {
  metadata: PageMetadata
  content: string
}

export type PageMetadata = {
  title?: string
  summary?: string
  imageData?: {
    src: string
    width: number
    height: number
    type?: string
  }
  author?: string
  publishedAt?: string
  slug: string
}

export async function getPageBySlug(slug: string): Promise<PageData | null> {
  try {
    const filePath = path.join(rootDirectory, `${slug}.mdx`)
    const fileContent = fs.readFileSync(filePath, { encoding: 'utf8' })
    const { data, content } = matter(fileContent)
    const imageData = data.image && getImageData(data.image)
    return { metadata: { ...data, slug, imageData }, content }
  } catch (error) {
    return null
  }
}

export function getPageMetadata(filepath: string): PageMetadata {
  const slug = filepath.replace(/\.mdx$/, '')
  const filePath = path.join(rootDirectory, filepath)
  const fileContent = fs.readFileSync(filePath, { encoding: 'utf8' })
  const { data } = matter(fileContent)
  const imageData = data.image && getImageData(data.image)

  return { ...data, slug, imageData }
}
