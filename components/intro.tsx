import Image from 'next/image'
import authorImage from '@/public/images/authors/mahayne-profile-updated-SQ.jpg'
import { getImageSize } from '@/lib/projects'

export default function Intro() {
  const imageData = getImageSize(
    '/images/authors/mahayne-profile-updated-SQ.jpg'
  )

  return (
    <section className='flex flex-col-reverse items-start gap-x-10 gap-y-4 pb-24 md:flex-row md:items-center'>
      <div className='mt-2 flex-1 md:mt-0'>
        <h2 className='title no-underline'>
          Hey, I&#39;m Mary. Great to meet you.
        </h2>
        <p className='mt-3 font-light text-muted-foreground'>
          I&#39;m a frontend engineer and ux designer based in San Francisco,
          CA. I&#39;m passionate about learning new technologies and making
          things look beautiful.
        </p>
      </div>
      <div className='relative'>
        <Image
          className='flex-1 rounded-lg grayscale'
          src={authorImage}
          alt='Mary A. Hayne'
          width={imageData ? imageData?.width * 0.8 : undefined}
          height={imageData ? imageData?.height * 0.8 : undefined}
          fill={imageData === undefined}
          priority
        />
      </div>
    </section>
  )
}
