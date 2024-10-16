import Intro from '@/components/intro'
// import NewsletterForm from '@/components/newsletter-form'
import RecentPosts from '@/components/recent-posts'
import RecentProjects from '@/components/recent-projects'
import Page from '@/components/ui/page'
export default function Home() {
  return (
    <Page>
      <Intro />
      <RecentProjects />
      <RecentPosts />
    </Page>
  )
}
