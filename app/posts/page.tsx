import { getPosts } from '@/lib/posts'
import PostsWithSearch from '@/components/posts-with-search'

export default async function PostsPage() {
  const posts = await getPosts()

  return (
    <section className='pb-24 pt-20'>
      <div className='container h-screen max-w-5xl bg-white py-16'>
        <h1 className='title mb-12'>Posts</h1>

        <PostsWithSearch posts={posts} />
      </div>
    </section>
  )
}
