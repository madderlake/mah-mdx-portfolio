import Page from '@/components/ui/page'
import MDXContent from '@/components/mdx-content'
import { getPageBySlug, PageMetadata, PageData } from '@/lib/pages'
import notFound from '../not-found'
import Image from 'next/image'

export default async function PageContent({
  params
}: {
  params: { slug: string }
}) {
  const { slug } = params
  const page: PageData | null = await getPageBySlug(slug)

  if (!page) {
    return notFound()
  }

  const { metadata, content } = page
  const { imageData, title } = metadata as PageMetadata

  return (
    <Page>
      {imageData && (
        <div className='h-w-full relative mb-6 h-96 overflow-hidden rounded-lg'>
          <Image
            src={imageData?.src}
            alt={title || ''}
            className='!absolute !bottom-auto !right-auto !h-auto'
            fill
            priority
          />
        </div>
      )}
      <h1 className='title'>{title}</h1>
      <div className='project prose mt-10 text-lg dark:prose-invert'>
        <MDXContent source={content} />
      </div>
    </Page>
  )
}
