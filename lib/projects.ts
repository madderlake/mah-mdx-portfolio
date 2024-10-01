import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
const sizeOf = require('image-size')

const rootDirectory = path.join(process.cwd(), 'content', 'projects')
const imageDirectory = path.join(process.cwd(), 'public')

export type Project = {
  metadata: ProjectMetadata
  content: string
}

export type ProjectMetadata = {
  title?: string
  summary?: string
  image?: string
  thumb?: string
  thumbData?: {
    width: number
    height: number
    type?: string
  } | null
  imageData?: {
    width: number
    height: number
    type?: string
  }
  author?: string
  publishedAt?: string
  slug: string
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    const filePath = path.join(rootDirectory, `${slug}.mdx`)
    const fileContent = fs.readFileSync(filePath, { encoding: 'utf8' })
    const { data, content } = matter(fileContent)
    const imageData = getImageSize(data.image)
    const thumbData = data.thumb !== undefined ? getImageSize(data.thumb) : null
    return { metadata: { ...data, slug, thumbData, imageData }, content }
  } catch (error) {
    return null
  }
}

export async function getProjects(limit?: number): Promise<ProjectMetadata[]> {
  const files = fs.readdirSync(rootDirectory)

  const projects = files
    .map(file => getProjectMetadata(file))
    .sort((a, b) => {
      if (new Date(a.publishedAt ?? '') < new Date(b.publishedAt ?? '')) {
        return 1
      } else {
        return -1
      }
    })

  if (limit) {
    return projects.slice(0, limit)
  }

  return projects
}
export function getImageSize(filepath: string): ProjectMetadata['imageData'] {
  const imagePath = path.join(imageDirectory, filepath)
  const dimensions = sizeOf(imagePath)
  return dimensions
}

export function getProjectMetadata(filepath: string): ProjectMetadata {
  const slug = filepath.replace(/\.mdx$/, '')
  const filePath = path.join(rootDirectory, filepath)
  const fileContent = fs.readFileSync(filePath, { encoding: 'utf8' })
  const { data } = matter(fileContent)
  const imageData = getImageSize(data.image)
  const thumbData = data.thumb !== undefined ? getImageSize(data.thumb) : null
  return { ...data, slug, thumbData, imageData }
}
