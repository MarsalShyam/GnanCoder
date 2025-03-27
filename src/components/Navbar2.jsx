import React, { useState } from "react";
import { FaTimes, FaBars } from "react-icons/fa";
import { LINKS } from "../constants";

const Navbar2 = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSticky, setIsSticky] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    // const handleScroll = (event, targetId) => {
    //     event.preventDefault();
    //     const targetElement = document.getElementById(targetId);
    //     if (targetElement) {
    //         const offsetTop = targetElement.offsetTop - 80;
    //         window.scrollTo({
    //             top: offsetTop,
    //             behavior: "smooth",
    //         });
    //     }
    //     setIsMobileMenuOpen(false);
    // };

    // // Sticky Navbar Effect
    // useEffect(() => {
    //     const handleScroll = () => {
    //         if (window.scrollY > 100) {
    //             setIsSticky(true);
    //         } else {
    //             setIsSticky(false);
    //         }
    //     };

    //     window.addEventListener("scroll", handleScroll);
    //     return () => window.removeEventListener("scroll", handleScroll);
    // }, []);

    return (
        <>
            {/* Navbar */}
            <nav
                id="navbar"
                className={`w-full flex items-center justify-center bg-slate-800 text-white  shadow-md backdrop-blur-lg transition-all duration-300 ${isSticky ? "fixed top-0 left-0 z-50 w-full shadow-lg" : ""
                    }`}
            >
                <div className="flex w-full max-w-6xl items-center justify-between p-4">
                    <div className='logo font-bold text-white text-xl md:text-2xl'>
                        <span className='text-green-500'>&lt;</span>
                        Gnan
                        <span className='text-green-500'>CODER/&gt;</span>
                    </div>

                    {/* Desktop Links */}
                    <div className="hidden space-x-6 lg:flex">
                        {LINKS.map((link, index) => (
                            <a
                                key={index}
                                href={link.url !== "#" ? link.url : "#"}
                                className={`text-sm flex justify-center items-center 
            ${index !== 0 ? "border-l-2 border-neutral-300/20 pl-2" : ""} 
            ${link.url === "#" ? "text-gray-400 cursor-not-allowed" : "hover:opacity-50"}
        `}
                                onClick={(e) => {
                                    if (link.url === "#") {
                                        e.preventDefault(); // Disable click on inactive links
                                    }
                                }}
                            >
                                {link.text}
                            </a>
                        ))}
                        <div className="text-white bg-green-700 rounded-full flex justify-between items-center ring-white ring-1">
                            <a
                                href={`${import.meta.env.BASE_URL}/javapdf/javaq.pdf`} // Relative path to the PDF file
                                download="javaq.pdf" // Suggested filename for the downloaded file
                                className="py-1 px-2"
                            >
                                Download-Q
                            </a>
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="lg:hidden">
                        <button onClick={toggleMobileMenu}>
                            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="fixed pb-3 flex flex-col items-center top-16 w-full bg-[#1e293be2] text-white shadow-md lg:hidden">
                    {LINKS.map((link, index) => (
                        <a
                            key={index}
                            href={link.url !== "#" ? link.url : "#"}
                            className={`block p-3 px-9 uppercase tracking-tighter border-b-2 border-green-400 rounded-sm
            ${link.url === "#" ? "text-gray-400 cursor-not-allowed" : "hover:opacity-50"}
        `}
                            onClick={(e) => {
                                if (link.url === "#") {
                                    e.preventDefault(); // Disable click on inactive links
                                }
                            }}
                        >
                            {link.text}
                        </a>
                    ))}

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
            )}
        </>
    );
};

export default Navbar2;
