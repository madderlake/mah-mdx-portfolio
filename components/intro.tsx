import Image from 'next/image'
import { getImageSize } from '@/lib/projects'

export default function Intro() {
  const authorImage = '/images/authors/maryahayne-sq.jpg'
  const imageData = getImageSize(authorImage)

  return (
    <section className='flex flex-col-reverse items-start gap-x-8 gap-y-4 pb-24 pr-16 md:flex-row md:items-center'>
      <div className='mt-2 flex-1 md:mt-0'>
        <h2 className='title no-underline'>Hey, Mary here. Welcome in!</h2>
        <p className='mt-3 font-light text-muted-foreground'>
          I&#39;m a frontend engineer and ux designer based in San Francisco,
          CA. I&#39;m passionate about learning new technologies that help me
          make the user experience beautiful, accessible, and performant.
        </p>
      </div>
      <div className='relative w-48 pt-8'>
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
