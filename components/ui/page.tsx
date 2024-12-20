export default function Page({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <section className='mt-20 pb-24 pt-36 sm:p-32'>
      <div className='container mt-0 max-w-4xl bg-white/75 py-16 shadow-md'>
        {children}
      </div>
    </section>
  )
}
