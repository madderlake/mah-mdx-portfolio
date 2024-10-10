import Intro from '@/components/intro'
import NewsletterForm from '@/components/newsletter-form'
import RecentPosts from '@/components/recent-posts'
import RecentProjects from '@/components/recent-projects'

export default function Home() {
  return (
    <section className='pb-24 pt-20'>
      <div className='container mt-0 max-w-5xl bg-white py-20'>
        <Intro />
        <RecentProjects />
        <RecentPosts />
        <NewsletterForm />
      </div>
    </section>
  )
}
