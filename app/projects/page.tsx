import Projects from '@/components/projects'
import { getProjects } from '@/lib/projects'

export default async function ProjectsPage() {
  const projects = await getProjects()

  return (
    <section className='pb-24 pt-16'>
      <div className='container h-auto min-h-screen max-w-5xl bg-white py-16'>
        <h1 className='title mb-12'>Projects</h1>

        <Projects projects={projects} />
      </div>
    </section>
  )
}
