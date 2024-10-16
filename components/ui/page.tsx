export default function Page({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <section className='pb-24 pt-32'>
      <div className='container mt-0 max-w-4xl bg-white/75 py-20 shadow-md'>
        {children}
      </div>
    </section>
  )
}
