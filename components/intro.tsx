import Image from 'next/image'
import { getImageData } from '@/lib/projects'

export default function Intro() {
  const authorImage = '/images/authors/maryahayne-sq.jpg'
  const imageData = getImageData(authorImage)

  return (
    <section className='flex flex-col-reverse items-start justify-center gap-x-8 gap-y-4 pb-24 sm:flex-row sm:items-center sm:pr-16'>
      <div className='mt-2 flex-1 text-center sm:mt-0 sm:text-left'>
        <h2 className='title no-underline'>
          Hello! Mary here. Nice to meet you.
        </h2>
        <p className='mt-3 font-light text-muted-foreground'>
          I&#39;m a frontend engineer and ux designer based in San Francisco,
          CA. I&#39;m passionate about learning new technologies that make the
          user experience beautiful, accessible, and performant.
        </p>
      </div>
      <div className='relative w-48 self-center pt-8 sm:self-end'>
        <Image
          className='flex-1 rounded-lg grayscale hover:filter-none'
          src={authorImage}
          alt='Mary A. Hayne'
          width={imageData ? imageData?.width : undefined}
          height={imageData ? imageData?.height : undefined}
          fill={imageData === undefined}
          priority
        />
      </div>
    </section>
  )
}
