import React from 'react';
import { AiFillHeart } from 'react-icons/ai';
import { FaGithub, FaDiscord, FaTwitter, FaBookOpen } from 'react-icons/fa';

const Footer = () => {
    return (
        <div className='bg-slate-800 text-white flex flex-col justify-center items-center bottom-0 w-full py-1'>

            {/* Logo */}
            <div className='logo font-bold text-white text-xl md:text-2xl mb-1'>
                <span className='text-green-500'>&lt;</span>
                Gnan
                <span className='text-green-500'>CODER/&gt;</span>
            </div>

            {/* Social Icons Section */}
            <div className='flex gap-6 mb-1'>
                {/* GitHub */}
                <a href="https://github.com/notNowWaitSomeTime" target="_blank" rel="noopener noreferrer"
                    className="relative group">
                    <FaGithub className="text-2xl hover:text-gray-400 transition" />
                    <span className="absolute left-1/2 -top-10 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-gray-800 text-white text-xs px-3 py-1 rounded-md transition">
                        Contribute on GitHub
                    </span>
                </a>

                {/* Discord */}
                <a href="https://discord.gg/fYRyFUkM" target="_blank" rel="noopener noreferrer"
                    className="relative group">
                    <FaDiscord className="text-2xl hover:text-blue-500 transition" />
                    <span className="absolute left-1/2 -top-10 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-gray-800 text-white text-xs px-3 py-1 rounded-md transition">
                        Join community on Discord
                    </span>
                </a>

                {/* Twitter/X */}
                <a href="https://twitter.com/dostAfterSomeTime" target="_blank" rel="noopener noreferrer"
                    className="relative group">
                    <FaTwitter className="text-2xl hover:text-blue-400 transition" />
                    <span className="absolute left-1/2 -top-10 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-gray-800 text-white text-xs px-3 py-1 rounded-md transition">
                        Follow us on Twitter/X
                    </span>
                </a>

                {/* Blog */}
                <a href="/blog" target="_blank" rel="noopener noreferrer"
                    className="relative group">
                    <FaBookOpen className="text-2xl hover:text-green-400 transition" />
                    <span className="absolute left-1/2 -top-10 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-gray-800 text-white text-xs px-3 py-1 rounded-md transition">
                        Read our Blog
                    </span>
                </a>
            </div>

            {/* Supporter Section */}
            <div className='flex justify-center items-center text-sm'>
                Guided and supported <AiFillHeart className="w-5 text-red-500 mx-1 cursor-pointer" />
                by Dr.Umamaheswari (CSE, HOD)
            </div>

        </div>
    );
};

export default Footer;
