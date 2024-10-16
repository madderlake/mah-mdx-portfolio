import Projects from '@/components/projects'
import { getProjects, ProjectMetadata } from '@/lib/projects'
import Page from '@/components/ui/page'

export default async function ProjectsPage() {
  const projects: ProjectMetadata[] = await getProjects()

  return (
    <Page>
      <h1 className='title mb-12'>Projects</h1>
      <Projects projects={projects} />
    </Page>
  )
}
