import React from 'react'
import { Sidebar, Banner } from '../../components'

const Home = () => {
  return (
    <div className='w-main flex px-5' >
      <div className='w-[30%] flex-col flex-auto gap-5' >
        <Sidebar />
        <span>Deal daily</span>
      </div>
      <div className='w-[70%] flex-col flex-auto gap-5' >
        <Banner />
        <span>Best seller</span>
      </div>
    </div>
  )
}

export default Home