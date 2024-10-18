import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
const sizeOf = require('image-size')

const rootDirectory = path.join(process.cwd(), 'content')
const imageDirectory = path.join(process.cwd(), 'public')

export type ItemType = 'pages' | 'projects' | 'posts'
export type Item = {
  metadata: ItemMetadata
  content: string
}

export type ItemMetadata = {
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

export async function getItemBySlug(
  type: ItemType,
  slug: string
): Promise<Item | null> {
  const itemTypeDirectory = path.join(rootDirectory, type)
  try {
    const filePath = path.join(itemTypeDirectory, `${slug}.mdx`)
    const fileContent = fs.readFileSync(filePath, { encoding: 'utf8' })
    const { data, content } = matter(fileContent)
    const { image, thumb } = data

    const imageData = image && getImageData(image)
    const thumbData = thumb && getImageData(thumb)
    return { metadata: { ...data, slug, thumbData, imageData }, content }
  } catch (error) {
    return null
  }
}

export async function getItemsOfType(
  type: ItemType,
  limit?: number
): Promise<ItemMetadata[]> {
  const itemTypeDirectory = path.join(rootDirectory, `${type}`)

  const files = fs.readdirSync(itemTypeDirectory)
  const items = files
    .map(file => getItemMetadata(type, file))
    .sort((a, b) => {
      if (new Date(a?.publishedAt ?? '') < new Date(b?.publishedAt ?? '')) {
        return 1
      } else {
        return -1
      }
    })

  if (limit) {
    return items.slice(0, limit)
  }

  return items
}

export function getImageData(url: string): ItemMetadata['imageData'] {
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

export function getItemMetadata(
  type: ItemType,
  filepath: string
): ItemMetadata {
  const itemTypeDirectory = path.join(rootDirectory, `${type}`)
  const slug = filepath.replace(/\.mdx$/, '')
  const filePath = path.join(itemTypeDirectory, filepath)
  const fileContent = fs.readFileSync(filePath, { encoding: 'utf8' })
  const { data } = matter(fileContent)
  const { image, thumb } = data
  const imageData = getImageData(image)
  const thumbData = getImageData(thumb)
  return { ...data, slug, thumbData, imageData }
}
