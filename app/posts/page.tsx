import { getPosts } from '@/lib/posts'
import PostsWithSearch from '@/components/posts-with-search'
import Page from '@/components/ui/page'
export default async function PostsPage() {
  const posts = await getPosts()

  return (
    <Page>
      <h1 className='title mb-12'>Posts</h1>
      <PostsWithSearch posts={posts} />
    </Page>
  )
}
