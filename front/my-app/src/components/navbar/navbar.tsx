'use client';
import React, { useEffect, useRef, useState } from 'react'
import BotonLink from '../botonLink/boton'
import { Transition } from '@headlessui/react';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { DataUser } from '@/store/userData';
import { tokenStore } from '@/store/tokenStore';
import { InstitutionsData } from '@/store/institutionsData';
import Cookies from 'js-cookie';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { user, isLoading } = useUser();
  const router = useRouter();
  const getUser = DataUser((state) => state.getDataUser);
  const userData = DataUser((state) => state.userData);
  const setToken = tokenStore((state) => state.setToken);
  const dataInsti = InstitutionsData((state) => state.institutionData);
  const getInsti = InstitutionsData((state) => state.getInstitutionData);

  useEffect(() => {
    if (user) {
      getUser();
      getInsti();
    }
  }, [user, getUser, getInsti]);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleLogout = () => {
    setToken("");
    Cookies.remove("authToken");
    router.push('/api/auth/logout');
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  if (isLoading) {
    return (
      <div className="h-16 bg-white w-full fixed z-50 flex items-center justify-between px-40">
        <div className="animate-pulse flex items-center justify-between space-x-4 w-full">
          <div className="h-8 w-24 bg-gray-200 rounded"></div>
          <div className="flex items-center gap-8">
            <div className="ml-2 w-20 h-3 bg-gray-200 rounded"></div>
            <div className="ml-2 w-20 h-3 bg-gray-200 rounded"></div>
            <div className="ml-2 w-20 h-3 bg-gray-200 rounded"></div>
            <div className="ml-2 w-20 h-3 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>

    );
  }

  return (
    <div className='h-16 bg-white w-full fixed z-50'>
      {user ? (
        <nav className='h-full flex items-center justify-between'>
          <Link href="/" className='ml-40'>
            <p className='text-3xl text-[#55A058] font-bold italic'>edufee</p>
          </Link>
          <ul className='flex items-center gap-8 pr-40 text-black'>
            <BotonLink link="/contact-us" text="Contacto" />
            <div className='text-black flex items-center'>
              <div className='w-8 h-8 mr-2'>
                <img src={userData?.imgProfile || dataInsti?.logo || user?.picture || ''} alt="" className='text-black rounded-sm w-full h-full' />
              </div>
              <div className='relative' ref={dropdownRef}>
                <button className="flex items-center mr-5" onClick={handleClick}>
                  Bienvenido
                  {!open ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-5 ml-2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m19.5 8.25-7.5 7.5-7.5-7.5"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-5 ml-2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m4.5 15.75 7.5-7.5 7.5 7.5"
                      />
                    </svg>
                  )}
                </button>
                <Transition
                  show={open}
                  enter="transition ease-out duration-300"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-300"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95">
                  <div className="backdrop-blur-md bg-gray-800 absolute top-10 right-0 flex flex-col items-center rounded-lg text-white z-50 w-44 ">
                    {
                      userData.role === "student" || dataInsti.role === "admin" ? (
                        <Link href="/profile" className="p-3 text-base flex items-center justify-between w-full hover:bg-white/10 hover:rounded-t-lg transition-all duration-200">
                          Perfil
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                          </svg>
                        </Link>

                      ) : (
                        <Link href="/perfil" className="p-3 text-base flex items-center justify-between w-full hover:bg-white/10 hover:rounded-t-lg transition-all duration-200">
                          Perfil
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                          </svg>
                        </Link>
                      )
                    }

                    {userData?.role === "admin" ? (
                      <Link href="/dashboard-admin" className="p-3 text-base flex items-center justify-between w-full hover:bg-white/10 transition-all duration-200">
                        Dashboard
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 0 1-1.125-1.125v-3.75ZM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-8.25ZM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-2.25Z" />
                        </svg>
                      </Link>
                    ) : (
                      <div className='w-full'>
                        {
                          userData?.role === "student" ? (
                            <Link href="/student/dashboard" className="p-3 text-base flex items-center justify-between w-full hover:bg-white/10 transition-all duration-200">
                              Dashboard
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 0 1-1.125-1.125v-3.75ZM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-8.25ZM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-2.25Z" />
                              </svg>
                            </Link>
                          ) : (
                            <Link href="/institution/dashboard" className="p-3 text-base flex items-center justify-between w-full hover:bg-white/10 transition-all duration-200">
                              Dashboard
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 0 1-1.125-1.125v-3.75ZM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-8.25ZM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-2.25Z" />
                              </svg>
                            </Link>
                          )
                        }
                      </div>
                    )
                    }
                    <a href="/api/auth/logout" className='w-full'>
                      <button
                        onClick={handleLogout}
                        className="p-3 text-base cursor-pointer flex items-center justify-between w-full hover:text-red-600 hover:bg-black/10 hover:rounded-b-lg transition-all duration-200">
                        Cerrar Sesión
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="size-5">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
                          />
                        </svg>
                      </button>
                    </a>
                  </div>
                </Transition>
              </div>
            </div>
          </ul>
        </nav>
      ) : (
        <nav className='h-full flex items-center justify-between'>
          <Link href="/" className='ml-40'>
            <p className='text-3xl text-[#55A058] font-bold italic'>edufee</p>
          </Link>
          <ul className='flex gap-8 pr-40 text-black'>
            <BotonLink link="/contact-us" text="Contacto" />
            <BotonLink link="/api/auth/login" text="Iniciar Sesion" />
          </ul>
        </nav>
      )}
    </div>
  );
}

export default Navbar;
