import Image from 'next/image'
import { getImageData } from '@/lib/content-type'

export default function Intro() {
  const authorImage = '/images/authors/maryahayne-sq.jpg'
  const imageData = getImageData(authorImage)

  return (
    <section className='flex flex-col-reverse items-start justify-center gap-x-8 gap-y-4 pb-24 sm:flex-row sm:items-center sm:pr-16'>
      <div className='mt-2 flex-1 text-center sm:mt-0 sm:text-left'>
        <h2 className='title no-underline'>Hello!</h2>
        <p className='mt-3 font-light text-muted-foreground'>
          I&#39;m a designer and frontend engineer based in San Francisco,
          CA.,over a decade of experience using modern technologies to make
          sites and applications beautiful, accessible, and performant.
        </p>

        <p className='mt-3 font-light text-muted-foreground'>
          I&#39;m currently focused on projects using React, NextJS 14+, Node,
          PHP, and WordPress, as well as other headless CMS implementations
          (Shopify, Payload, Prisma, et al).
        </p>
      </div>
      <div className='relative w-48 items-center pt-8'>
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
