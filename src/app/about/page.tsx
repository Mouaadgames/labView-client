function page() {
  return (
    <main className="relative flex flex-col items-center justify-center px-6 py-10 text-center">
      <div className="absolute top-20 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-gray-200 rounded-full flex items-center z-0 "></div>
      <div className="absolute top-24 left-1/2 transform -translate-x-1/2 w-72 h-72 bg-pink-200 rounded-full flex z-0scale-in z-0 delay-200"></div>
      


      <div className="relative z-10 max-w-xl mt-20 fade-in-up delay-500 shadow-2xl rounded-xl border border-gray-200 p-6 backdrop-blur-sm bg-[#00000011]">
        <h2 className="text-purple-600 text-xl font-bold mb-4">About:</h2>
        <p className="text-black text-lg leading-relaxed">
          This website was crafted by <strong>The Night Knights</strong>, a dynamic team composed of
          <span className="text-green-500 font-semibold text-nowrap"> Ait Ouflih Anouar</span>,
          <span className="text-pink-500 font-semibold text-nowrap"> El Barrik Mouaad</span>, and
          <span className="text-blue-500 font-semibold text-nowrap"> El Idrissi Abdellah</span>,
          as part of their innovative contribution to the <strong>MedTech Competition</strong> at ENSA Marrakech.
        </p>

      </div>
    </main>
  )
}
export default page