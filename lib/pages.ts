import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
const sizeOf = require('image-size')

const rootDirectory = path.join(process.cwd(), 'content', 'pages')
const imageDirectory = path.join(process.cwd(), 'public')

export type PageData = {
  metadata: PageMetadata
  content: string
}
export type PageHeaderImage = {
  image: string
}
export type PageMetadata = {
  title?: string
  summary?: string
  thumbData?: {
    src: string
    width: number
    height: number
    type?: string
  } | null
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
    const imageData = getImageData(data.image)
    const thumbData = data.thumb !== undefined ? getImageData(data.thumb) : null
    return { metadata: { ...data, slug, thumbData, imageData }, content }
  } catch (error) {
    return null
  }
}

export function getImageData(filepath: string): PageMetadata['imageData'] {
  const imagePath = path.join(imageDirectory, filepath)
  const dimensions = sizeOf(imagePath)
  return dimensions
}

export function getPageMetadata(filepath: string): PageMetadata {
  const slug = filepath.replace(/\.mdx$/, '')
  const filePath = path.join(rootDirectory, filepath)
  const fileContent = fs.readFileSync(filePath, { encoding: 'utf8' })
  const { data } = matter(fileContent)
  const imageData = getImageData(data.image)
  const thumbData = data.thumb !== undefined ? getImageData(data.thumb) : null
  return { ...data, slug, thumbData, imageData }
}
