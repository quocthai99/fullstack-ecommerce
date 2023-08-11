import React from 'react'
import { NavLink } from 'react-router-dom'
import {navigation} from '../ultils/contants'


const Navigation = () => {
  return (
    <div className='w-main h-[48px] py-2 text-sm flex items-center border'>
      {navigation.map(el => (
        <NavLink key={el.id} to={el.path} className={({isActive}) =>  isActive ? 'pr-12 text-main' : 'pr-12 hover:text-main '} >
          {el.value}
        </NavLink>
      ))}
    </div>
  )
}

export default Navigation