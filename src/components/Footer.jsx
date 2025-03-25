import React from 'react'
import {AiFillHeart} from 'react-icons/ai'


const Footer = () => {
    return (
        <div className='bg-slate-800 text-white flex flex-col justify-center items-center bottom-0 w-full'>
            <div className='logo font-bold text-white text-xl md:text-2xl '>
                <span className='text-green-500'>&lt;</span>
                Gnan
                <span className='text-green-500'>CODER/&gt;</span>
            </div>
            <div className='flex justify-center items-center '>
            Supported <AiFillHeart className="w-6 text-red-500 cursor-pointer" />
            by Dr.Umamaheswari (CSE,HOD)
            </div>
        </div>
    )
}

export default Footer
