import Link from 'next/link'
import { getItemsOfType, ItemType } from '@/lib/content-type'
import Posts from '@/components/posts'

const type: ItemType = 'posts'

export default async function RecentPosts() {
  const posts = await getItemsOfType(type, 4)

  return (
    <section className='pb-24'>
      <div>
        <h2 className='title mb-12'>Recent posts</h2>
        <Posts posts={posts} />
        <Link
          href='/posts'
          className='mt-8 inline-flex items-center gap-2 text-muted-foreground underline decoration-1 underline-offset-2 transition-colors hover:text-foreground'
        >
          <span className='text-base'>All posts</span>
        </Link>
      </div>
    </section>
  )
}
