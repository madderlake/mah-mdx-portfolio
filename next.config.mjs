/** @type {import('next').NextConfig} */
import nextMDX from '@next/mdx'
import rehypeImgSize from 'rehype-img-size'

const withMDX = nextMDX({
  options: {
    rehypePlugins: [rehypeImgSize]
  }
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure `pageExtensions` to include MDX files
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx']
}

export default withMDX(nextConfig)
