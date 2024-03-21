import React from 'react'

const AddChapter = () => {
  return (
    <div className='w-[96w] h-screen flex flex-col mx-6 mt-8 gap-6'>
        <h1>Add Chapter</h1>
        <form action="" className='flex flex-col gap-4'>
            <div className='flex flex-col gap-4'>
                <label htmlFor="chapterTitle">Chapter Title</label>
                <input type="text" name="chapterTitle" id="chapterTitle" className='border border-gray-500 rounded-md w-full px-2 py-1' placeholder='Enter Chapter Title' />
            </div>
            <div className='flex flex-col gap-4'>
                <label htmlFor="chapterContent">Content</label>
                <textarea name="chapterContent" id="chapterContent" cols="30" rows="10" className='border border-gray-500 rounded-md w-full px-2 py-1'></textarea>
            </div>
            <button type="submit" className='text-white bg-blue-800 hover:bg-blue-900 py-1 px-3 rounded-md shadow text-lg font-medium'>Add Chapter</button>
        </form>

    </div>
  )
}

export default AddChapter