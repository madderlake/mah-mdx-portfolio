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
  } | null
  author?: string
  publishedAt?: string
  slug: string
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    const filePath = path.join(rootDirectory, `${slug}.mdx`)
    const fileContent = fs.readFileSync(filePath, { encoding: 'utf8' })
    const { data, content } = matter(fileContent)
    const { image, thumb } = data

    const imageData = getImageData(image)
    const thumbData = getImageData(thumb)
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

export function getImageData(url: string): ProjectMetadata['imageData'] {
  if (!url) return
  const imagePath = path.join(imageDirectory, url)
  const imageSize = sizeOf(imagePath)
  return (
    imageSize && {
      src: url,
      width: imageSize?.width,
      height: imageSize?.height,
      type: imageSize?.type
    }
  )
}

export function getProjectMetadata(filepath: string): ProjectMetadata {
  const slug = filepath.replace(/\.mdx$/, '')
  const filePath = path.join(rootDirectory, filepath)
  const fileContent = fs.readFileSync(filePath, { encoding: 'utf8' })
  const { data } = matter(fileContent)
  const { image, thumb } = data
  const imageData = getImageData(image)
  const thumbData = getImageData(thumb)
  return { ...data, slug, thumbData, imageData }
}
