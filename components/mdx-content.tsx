import { JSX } from 'react'
import { highlight } from 'sugar-high'
import { MDXRemote, MDXRemoteProps } from 'next-mdx-remote/rsc'
import Image, { ImageProps } from 'next/image'
import sizeOf from 'image-size'
import Counter from '@/components/counter'
import ProgressBarApp from '@/content/apps/progress-bar'
import path from 'path'

// Custom component to handle code highlighting
function Code({ children, ...props }: any) {
  const codeHTML = highlight(children)
  return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />
}

// Custom Next/Image component for markdown
const MarkdownImage = ({ src, alt }: ImageProps) => {
  const imageDirectory = path.join(process.cwd(), 'public')
  const dir = path.join(imageDirectory, src as string)
  const imgSize = sizeOf(dir as string)
  return (
    <Image
      src={src}
      alt={alt || 'Image'}
      width={imgSize?.width}
      height={imgSize?.height}
      fill={imgSize === undefined}
      style={{ maxWidth: '100%', height: 'auto' }}
    />
  )
}

const ProgressBar = (props: any) => <ProgressBarApp />
// Define custom components to override default markdown rendering
const components = {
  code: Code,
  img: (props: any) => <MarkdownImage {...props} />,
  Counter,
  ProgressBar
}

export default function MDXContent(
  props: JSX.IntrinsicAttributes & MDXRemoteProps
) {
  return (
    <MDXRemote
      {...props}
      components={{ ...components, ...(props.components || {}) }}
    />
  )
}
