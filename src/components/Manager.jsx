import React from 'react'
import { useRef, useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid'
import { AiOutlineCopy } from "react-icons/ai";

const Manager = () => {
  const psRef = useRef();
  const passworRef = useRef();

  const [form, setform] = useState({ site: "", username: "", password: "" })
  const [passwordArray, setPasswordArray] = useState([])

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      setPasswordArray(JSON.parse(passwords))
    }
  }, []);

  const copyText = (text) => {
    navigator.clipboard.writeText(text);
    toast('Copied to Clipboard!', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      // transition: Bounce,
    });
  }

  const showPassword = () => {
    passworRef.current.type = "text"
    // alert("show the password")
    if (psRef.current.src.includes("/icons/eye-off-fill.svg")) {
      psRef.current.src = "/icons/eye-fill.svg"
      passworRef.current.type = "password"
    }
    else {
      psRef.current.src = "/icons/eye-off-fill.svg"
      passworRef.current.type = "text"
    }
  }

  const savePassword = () => {
    if (form.site.length > 3 && form.username.length > 3 && form.password.length> 3) {
      setPasswordArray([...passwordArray, { ...form, id: uuidv4() }])
      localStorage.setItem("passwords", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))
      // console.log([...passwordArray, form]);
      setform({ site: "", username: "", password: "" })
      toast('Password Saved!', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        // transition: Bounce,
      });
    }else{
      toast('Error: Password not Saved!', {
        position: "top-right",
        autoClose: 2000,
      });
    }
  }

  const deletePassword = (id) => {
    let c = confirm("Do you really want to delete this password?");
    if (c) {
      console.log("deleting password", id)
      setPasswordArray(passwordArray.filter(item => item.id !== id))

      localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id !== id)))
      toast('Deleted Succesfull!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        // transition: Bounce,
      });
    }

    // console.log([...passwordArray, form]);
  }
  const editPassword = (id) => {
    console.log("editing password", id)
    setform(passwordArray.filter(i => i.id === id)[0])
    //arrays first item will come using [0]
    setPasswordArray(passwordArray.filter(item => item.id !== id))


  }


  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value })
  }
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      // transition={Bounce}
      />
      <div className="absolute inset-0 -z-10 h-full w-full bg-green-100 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,#d5c5ff,transparent)]"></div>
        </div>

      <div className=" pt-2 md:mycontainer px-2 md:px-0 min-h-[86vh]">
        
        <h1 className='text text-4xl font-bold text-center'>
          <span className='text-green-500'>&lt;</span>
          Gnan
          <span className='text-green-500'>CODE/&gt;</span>
        </h1>
        <p className='text-green-900 text-lg text-center'>Your own Password Manager</p>

        <div className=" text-black flex flex-col p-4 gap-8 items-center ">
          <input onChange={handleChange} value={form.site} placeholder='Enter Day' className='rounded-full border border-green-500 w-full p-4 py-1' type="text" id="site" name="site" />

          <div className="flex flex-col md:flex-row w-full justify-between gap-8">
            <input onChange={handleChange} value={form.username} placeholder='Enter Username' className='rounded-full border border-green-500 w-full p-4 py-1' type="text" id="username" name="username" />

            <div className="relative">
              <input ref={passworRef} onChange={handleChange} value={form.password} placeholder='Enter Password' className='rounded-full border border-green-500 w-full p-4 py-1' type="password" id="password" name="password" />

              <span className='absolute right-[20px] top-[7px] hover:cursor-pointer' onClick={showPassword}>
                <img ref={psRef} className='w-[20px]' src="/icons/eye-fill.svg" alt='' />
              </span>
            </div>


          </div>
          <button onClick={savePassword} className='flex justify-center items-center bg-green-400 rounded-full w-fit hover:bg-green-300 px-3 py-2 gap-2 border border-green-900'><lord-icon
            src="https://cdn.lordicon.com/jgnvfzqg.json"
            trigger="hover">
          </lord-icon>Save Password</button>
        </div>

        
        <div className="passwords">
          <h2 className='font-bold text-2xl py-4'>Your Passwords</h2>
          {passwordArray.length === 0 && <div>No Passwords to show.</div>}
          {passwordArray.length != 0 &&

            <table className="table-auto w-full overflow-hidden rounded-md mb-10">
              <thead className='bg-green-800 text-white'>
                <tr>
                  <th className='py-2'>Site</th>
                  <th className='py-2'>Username</th>
                  <th className='py-2'>Password</th>
                  <th className='py-2'>Action</th>
                </tr>
              </thead>
              <tbody className='bg-[#cff1db]'>
                {passwordArray.map((item, index) => {
                  return <tr key={index}>

                    <td className='py-2 border border-white text-center'>
                      <div className='flex items-center justify-center gap-3'>
                        <a href={item.site} target='_black'>{item.site}</a>
                        <div className='copyicon size-7 cursor-pointer' onClick={() => { copyText(item.site) }}>
                          
                          <AiOutlineCopy className="text-[23px] pt-[3px] pl-[3px] text-gray-600 cursor-pointer" />
                        </div>
                      </div>
                    </td>

                    <td className='py-2 text-center border border-white'>
                      <div className='flex items-center justify-center gap-3'>
                        <span>{item.username} </span>
                        <div className='copyicon size-7 cursor-pointer' onClick={() => { copyText(item.username) }}>
                        <AiOutlineCopy className="text-[23px] pt-[3px] pl-[3px] text-gray-600 cursor-pointer" />
                        </div>
                      </div>
                    </td>

                    <td className='py-2 text-center border border-white'>
                      <div className='flex items-center justify-center gap-3'>
                        <span>{item.password}</span>
                        <div className='copyicon size-7 cursor-pointer' onClick={() => { copyText(item.password) }}>
                        <AiOutlineCopy className="text-[23px] pt-[3px] pl-[3px] text-gray-600 cursor-pointer" />
                        </div>
                      </div>
                    </td>
                    <td className='py-2 text-center border border-white'>
                      <div className='flex items-center justify-center gap-2'>
                        <span className='cursor-pointer' onClick={() => { editPassword(item.id) }}>
                          <lord-icon
                            src="https://cdn.lordicon.com/fikcyfpp.json"
                            trigger="hover"
                            stroke="bold"
                            colors="primary:#121331,secondary:#000000"
                            style={{ "width": "22px", "height": "22px" }}>
                          </lord-icon>
                        </span>
                        <span className='cursor-pointer' onClick={() => { deletePassword(item.id) }}>
                          <lord-icon
                            src="https://cdn.lordicon.com/skkahier.json"
                            trigger="hover"
                            style={{ "width": "20px", "height": "20px" }}
                          >
                          </lord-icon>
                        </span>
                      </div>
                    </td>

                  </tr>
                })}


              </tbody>
            </table>}

        </div>
      </div>
    </>
  )
}

export default Manager
