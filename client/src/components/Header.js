import React from 'react'
import logo from '../assets/logo.png'
import icons from '../ultils/icons'
import { Link } from 'react-router-dom'
import path from '../ultils/path'

const { RiPhoneFill, MdEmail, BsHandbagFill, FaUserCircle } = icons

const Header = () => {
  return (
    <div className='w-main h-[110px] flex justify-between py-[35px]' >
      <Link to={`/${path.HOME}`} >
        <img src={logo} alt='logo' className='w-[234px] object-contain' />
      </Link>
      <div className='flex text-[13px]' >

        <div className='flex flex-col items-center px-4 border-r' >
          <span className='flex items-center gap-4' >
            <RiPhoneFill color='#ee3131' />
            <span className='font-semibold'>(+1800) 000 8808</span>
          </span>
          <span>Mon-Sat 9:00AM - 8:00PM</span>
        </div>

        <div className='flex flex-col items-center px-4 border-r' >
          <span className='flex items-center gap-4' >
            <MdEmail color='#ee3131' />
            <span className='font-semibold'>SUPPORT@TADATHEMES.COM</span>
          </span>
          <span>Online Support 24/7</span>
        </div>

        <div className='flex items-center justify-center gap-2 px-4 border-r' >
          <BsHandbagFill color='#ee3131' />
          <span>0 items(s)</span>
        </div>

        <div className='flex items-center justify-center' >
          <FaUserCircle color='#ee3131' />
        </div>

      </div>
    </div>
  )
}

export default Header