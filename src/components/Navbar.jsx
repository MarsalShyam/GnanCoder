import React from 'react';
const Navbar = () => {
    return (
        <nav className='bg-slate-800 text-white '>
            <div className="mycontainer flex justify-between items-center px-4 py-5 h-14">
                <div className='logo font-bold text-white text-xl md:text-2xl'>
                    <span className='text-green-500'>&lt;</span>
                    Gnan
                    <span className='text-green-500'>CODER/&gt;</span>
                </div>

                
                    
                    <div className="text-white bg-green-700 my-5 mx-2 rounded-full flex justify-between items-center ring-white ring-1">
                        <a
                            href={`${import.meta.env.BASE_URL}/javapdf/javaq.pdf`} // Relative path to the PDF file
                            download="javaq.pdf" // Suggested filename for the downloaded file
                            className="py-0 md:py-2 font-bold px-2"
                        >
                            Download-Q
                        </a>
                    </div>

                
            </div>

        </nav>
    )
}
export default Navbar
// https://onecompiler.com/java
