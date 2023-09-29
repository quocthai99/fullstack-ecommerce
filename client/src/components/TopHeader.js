import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import path from '../ultils/path'
import {useDispatch, useSelector} from 'react-redux'
import { getCurrent } from '../store/user/asyncAction'
import icons from '../ultils/icons'
import * as actions from '../store/user/userSlice'

const { AiOutlineLogout } = icons

const TopHeader = () => {
  const dispatch = useDispatch()
  const {isLoggedIn, current} = useSelector(state => state.user)
  console.log(current)
  useEffect(() => {
    if ( isLoggedIn ) {
      dispatch(getCurrent())
    }
  }, [isLoggedIn])

  return (
    <div className='h-[38px] w-full bg-main flex items-center justify-center ' >
        <div className='w-main flex items-center justify-between text-xs text-white ' >
            <span>ORDER ONLINE OR CALL US (+1800) 000 8808</span>
            {isLoggedIn 
              ? <div className='flex gap-4 items-center' >
                <span>{`Welcome ${current?.firstname} ${current?.lastname}`} </span>
                <span onClick={() => dispatch(actions.logout())} className='hover:rounded-full p-2 hover:bg-gray-200 hover:text-main cursor-pointer ' >
                  <AiOutlineLogout size={18} />
                </span>
              </div> 
              : <Link className='hover:text-gray-800' to={`${path.LOGIN}`} >Sign In or Create Account</Link>}
        </div>
    </div>
  )
}

export default TopHeader