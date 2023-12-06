'use client';

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import {signIn, signOut, useSession, getProviders} from 'next-auth/react'

const Nav = () => {
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);
  const [toggleDropDown, setToggleDropDown] = useState(false)

  useEffect(() => {
      const setTheProviders = async () => {
        const response = await getProviders();
        setProviders(response);
      }

      setTheProviders();
    }, []);

  return (
    <div className='flex-between w-full mb-16 pt-3'>
      <Link href="/" className='flex flex-center gap-2'>
        <Image src="/asserts/images/logo.svg" alt="logo" width={30} height={30} className='object-contain' />
        <p className="logo_text">Promptopia</p>
      </Link>
      {/* Desktop Nav */}
      <div className="sm:flex hidden">
        {
          session?.user ? (
            <div className='flex gap-3 md:gap-5'>
              <Link href={"/create-prompt"} className='black_btn'>
                Create Post 
              </Link>
              <button type='button' onClick={signOut} className='outline_btn'>
                Sign Out
              </button>
              <Link href={"/profile"}>
                <Image src="/asserts/images/logo.svg" alt="profile" width={37} height={37} className='object-contain rounded-full' />
              </Link>
            </div>
          ) : (
            <>
            {
              providers && Object.values(providers).map((provider) => (
                <button type='button' key={provider.name} onClick={() => signIn(provider.id)} className='black_btn'>
                  Sign In With {provider.name}
                </button>
              ))
            }
            </>
          )
        }
      </div>

      {/* Mobile Nav */}
      <div className='sm:hidden flex'>
        {
          session?.user ? (
            <div className="flex relative">
              <Image src="/asserts/images/logo.svg" alt="profile" width={37} height={37} className=' rounded-full cursor-pointer' onClick={()=>{setToggleDropDown((prev)=>!prev)}}/>
              {
                toggleDropDown && (
                  <div className="dropdown">
                    <Link href='/profile' className="dropdown_link" onClick={()=> setToggleDropDown(false)}>
                      My Profile
                    </Link>
                    <Link href='/create-prompt' className="dropdown_link" onClick={()=> setToggleDropDown(false)}>
                      Create Prompt
                    </Link>
                    <button
                    type='button'
                    onClick = {()=> {
                      setToggleDropDown(false)
                      signOut()
                    }}
                    className='black_btn mt-5 w-full'>
                      Sign Out With {provider.name}
                    </button>
                  </div>
                )
              }
            </div>
          ):(
            <>
              {
              providers && Object.values(providers).map((provider) => (
                <button type='button' key={provider.name} onClick={() => signIn(provider.id)} className='black_btn'>
                  Sign In Mobile
                </button>
              ))
            }
            </>
          )
        }
      </div>
    </div>
  )
}

export default Nav
