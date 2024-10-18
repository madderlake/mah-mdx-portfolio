import Projects from '@/components/projects'
import { ItemMetadata, getItemsOfType, ItemType } from '@/lib/content-type'
import Page from '@/components/ui/page'
import { notFound } from 'next/navigation'

export default async function ProjectsPage() {
  const type: ItemType = 'projects'

  if (!type) {
    return notFound()
  }
  const projects: ItemMetadata[] = await getItemsOfType(type)

  return (
    <Page>
      <h1 className='title mb-12'>Projects</h1>
      <Projects projects={projects} />
    </Page>
  )
}
