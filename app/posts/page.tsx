import { getItemsOfType, ItemType } from '@/lib/content-type'
import PostsWithSearch from '@/components/posts-with-search'
import Page from '@/components/ui/page'
import { notFound } from 'next/navigation'

export default async function PostsPage() {
  const type: ItemType = 'posts'

  if (!type) {
    return notFound()
  }
  const posts = type && (await getItemsOfType(type))

  return (
    <Page>
      <h1 className='title mb-12'>Posts</h1>
      <PostsWithSearch posts={posts} />
    </Page>
  )
}
