

const Home = () => {
  return (

      <div className="min-h-screen flex flex-col items-center justify-center bg-white p-8 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome</h1>
        <p className="text-gray-600 mb-6">You're now on the home page of your dashboard</p>

        <button
          className="px-6 py-2 
             bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500
             hover:from-red-600 hover:via-orange-600 hover:to-orange-500
             text-white font-medium rounded-lg 
             shadow-lg hover:shadow-xl 
             transition duration-300 ease-in-out"
        >
          Logout
        </button>
      </div>

  )
}

export default Home
