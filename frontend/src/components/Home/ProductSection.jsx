import React from 'react'
import Card from '../General/Card'

const ProductSection = () => {
  return (
    <div className='flex flex-col w-screen my-4 gap-10'>
        <div className='flex flex-col gap-4'>
            <div className='text-3xl ml-6 font-semibold text-blue-800'>
                Trending Stories
            </div>
            <div className='flex flex-col md:flex-row justify-evenly items-center gap-4 w-[94vw] mx-auto overflow-x-hidden'>
                <Card ImageSrc={"hero.jpg"} Title="Lost in the Storm" Author="Kevin Fiege" Category="Sci-fi" Rating="4.7" to="1"/>
                <Card ImageSrc={"hero.jpg"} Title="The Story of the Dragon" Author="Justin Denney" Category="Fantasy" Rating="4.9" to="1"/>
                <Card ImageSrc={"hero.jpg"} Title="Lost in the Storm" Author="Kevin Fiege" Category="Sci-fi" Rating="4.7" to="1"/>
                <Card ImageSrc={"hero.jpg"} Title="Lost in the Storm" Author="Kevin Fiege" Category="Sci-fi" Rating="4.7" to="1"/>
            </div>
        </div>
        <div className='flex flex-col gap-4'>
            <div className='text-3xl ml-6 font-semibold text-blue-800'>
                Latest Stories
            </div>
            <div className='flex flex-col md:flex-row justify-evenly items-center gap-4 w-[94vw] mx-auto overflow-x-hidden'>
                <Card ImageSrc={"hero.jpg"} Title="Lost in the Storm" Author="Kevin Fiege"  Rating="4.7" to="1"/>
                <Card ImageSrc={"hero.jpg"} Title="The Story of the Dragon" Author="Justin Denney" Rating="4.9" to="1"/>
                <Card ImageSrc={"hero.jpg"} Title="Lost in the Storm" Author="Kevin Fiege"  Rating="4.7" to="1"/>
                <Card ImageSrc={"hero.jpg"} Title="Lost in the Storm" Author="Kevin Fiege"  Rating="4.7" to="1"/>
            </div>
        </div>
        <div className='flex flex-col gap-4'>
            <div className='text-3xl ml-6 font-semibold text-blue-800'>
                Top Categories
            </div>
            <div className='flex flex-col md:flex-row justify-evenly items-center gap-4 w-[94vw] mx-auto overflow-x-hidden font-semibold text-3xl'>
                    <div className='rounded-lg min-w-[20vw] bg-blue-800 text-white shadow mx-auto p-4 border border-gray-300 hover:bg-blue-600 hover:border-gray-500 text-center cursor-pointer'>
                        Sci-fi
                    </div>
                    <div className='rounded-lg min-w-[20vw] bg-blue-800 text-white shadow mx-auto p-4 border border-gray-300 hover:bg-blue-600 hover:border-gray-500 text-center cursor-pointer'>
                        Romance
                    </div>
                    <div className='rounded-lg min-w-[20vw] bg-blue-800 text-white shadow mx-auto p-4 border border-gray-300 hover:bg-blue-600 hover:border-gray-500 text-center cursor-pointer'>
                        Horror
                    </div>
                    <div className='rounded-lg min-w-[20vw] bg-blue-800 text-white shadow mx-auto p-4 border border-gray-300 hover:bg-blue-600 hover:border-gray-500 text-center cursor-pointer'>
                        Fantasy
                    </div>
            </div>
        </div>
    </div>
  )
}

export default ProductSection