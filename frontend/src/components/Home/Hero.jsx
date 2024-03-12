

const Hero = () => {
  return (
    <div className="w-screen h-screen top-0 left-0 relative">
        <div className="absolute w-2/3 h-full flex flex-col z-20 gap-6 my-20 mx-12">
            <div className="text-5xl font-bold text-blue-800">Escape the <span className="text-5xl font-bold text-gray-800">Ordinary</span>. Dive into <span className="text-5xl font-bold text-gray-800">Extraordinary</span> Stories</div>
            <div className="text-2xl font-semibold text-white lg:text-gray-800">Find tales that spark your imagination and ignite your soul.</div>
            <div className="text-xl font-semibold text-white bg-blue-800 hover:bg-blue-900 shadow-lg rounded-md px-6 py-3 mr-auto cursor-pointer">Explore Stories Now</div>
        </div>
        <img src="hero.jpg" alt="hero" className=" absolute w-full h-full object-cover" />
    </div>
  )
}

export default Hero