import React from 'react'
import { Sidebar, Banner, BestSeller } from '../../components'

const Home = () => {

  return (
    <div className='w-main flex px-5' >
      <div className='w-[25%] flex-col flex-auto gap-5' >
        <Sidebar />
        <span>Deal daily</span>
      </div>
      <div className='w-[75%] flex-col flex-auto gap-5' >
        <Banner />
        <BestSeller />
      </div>
    </div>
  )
}

export default Home