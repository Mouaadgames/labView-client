function page() {
  const currentDate = new Date()
  return (
    <>

      <main className="relative flex flex-col items-center justify-center min-h-[calc(100vh-72px)] px-6 py-12 text-center">


        <div className="relative z-10 mt-10 bg-white border-2 border-black rounded-xl p-6 w-full max-w-md fade-in-up space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-left">Login:</h2>
            {/* <span className="bg-gradient-to-r from-yellow-200 to-pink-200 text-black px-4 py-1 rounded-full text-sm">Welcome again</span> */}
          </div>

          <form className="space-y-4">
            <div className="text-left">
              <label htmlFor="CNI" className="block font-semibold">CNI:</label>
              <input type="text" id="CNI" placeholder="P123456"
                className="w-full px-4 py-2 border rounded-full text-center focus:outline-none focus:ring-2 focus:ring-pink-300" />
            </div>

            <div className="text-left">
              <label htmlFor="birthDate" className="block font-semibold">Birth Date:</label>
              <input type="Date" id="birthDate" placeholder="" max={(new Date()).toISOString().split('T')[0]}
                className="w-full px-4 py-2 border rounded-full text-center focus:outline-none focus:ring-2 focus:ring-pink-300" />
            </div>

            {/* <p className="text-xs text-gray-600 text-left pl-1">
              You have forgot your password, <a href="#" className="text-blue-600 underline">click here</a>
            </p> */}

            <button type="submit" className="w-full bg-gradient-to-r from-yellow-200 to-pink-300 py-2 rounded-full font-semibold hover:opacity-90 transition cursor-pointer">
              Login
            </button>
            <div className="text-red-400">
              You are have no number registered to you
            </div>
            <div className="flex justify-between items-center text-sm pt-2">
              <span>You will receive and SMS verification code</span>
            </div>
          </form>

          {/* <div className="flex justify-between items-center text-sm pt-2">
            <span>Is it your first time?</span>
            <a href="signup.html" className="bg-gradient-to-r from-yellow-200 to-pink-300 px-4 py-1 rounded-full font-semibold hover:opacity-90 transition">Sign in</a>
          </div> */}
        </div>
      </main>
    </>
  )
}
export default page