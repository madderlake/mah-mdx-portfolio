import Page from '@/components/ui/page'
import MDXContent from '@/components/mdx-content'
import { getItemBySlug, ItemType, Item, ItemMetadata } from '@/lib/content-type'
import notFound from '../not-found'
import Image from 'next/image'

const type: ItemType = 'pages'

export default async function PageContent({
  params
}: {
  params: { slug: string }
}) {
  const { slug } = params
  const page: Item | null = await getItemBySlug(type, slug)

  if (!page) {
    return notFound()
  }

  const { metadata, content } = page
  const { imageData, title } = metadata as ItemMetadata

  return (
    <Page>
      {imageData?.src && (
        <div className='h-w-full relative mb-6 overflow-hidden rounded-lg sm:h-96'>
          <Image
            src={imageData?.src}
            alt={title || ''}
            width={imageData?.width}
            height={imageData?.height}
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
