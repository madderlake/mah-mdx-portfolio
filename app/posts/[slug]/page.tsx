import Link from 'next/link'
import Image from 'next/image'
import Page from '@/components/ui/page'
import { formatDate } from '@/lib/utils'
import MDXContent from '@/components/mdx-content'
import { getItemsOfType, getItemBySlug, ItemType } from '@/lib/content-type'
import { ArrowLeftIcon } from '@radix-ui/react-icons'
import { notFound } from 'next/navigation'
// import NewsletterForm from '@/components/newsletter-form'

const type: ItemType = 'posts'

export async function generateStaticParams() {
  const posts = await getItemsOfType(type)
  const slugs = posts.map(post => ({ slug: post.slug }))

  return slugs
}

export default async function Post({ params }: { params: { slug: string } }) {
  const { slug } = params
  const post = await getItemBySlug(type, slug)

  if (!post) {
    notFound()
  }

  const { metadata, content } = post
  const { title, imageData, author, publishedAt } = metadata

  return (
    <Page>
      <Link
        href='/posts'
        className='mb-8 inline-flex items-center gap-2 text-sm font-light text-muted-foreground transition-colors hover:text-foreground'
      >
        <ArrowLeftIcon className='h-5 w-5' />
        <span>Back to posts</span>
      </Link>

      {imageData?.src && (
        <div className='relative mb-6 h-96 w-full overflow-hidden rounded-lg'>
          <Image
            src={imageData.src}
            alt={title || ''}
            className='absolute bottom-auto right-auto h-auto'
            fill
          />
        </div>
      )}

      <header>
        <h1 className='title'>{title}</h1>
        <p className='mt-3 text-xs text-muted-foreground'>
          {author} / {formatDate(publishedAt ?? '')}
        </p>
      </header>

      <main className='prose mt-16 min-w-full dark:prose-invert'>
        <MDXContent source={content} />
      </main>

      <footer className='mt-16'>{/* <NewsletterForm /> */}</footer>
    </Page>
  )
}
