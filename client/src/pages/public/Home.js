import React from 'react'
import { Sidebar, Banner, BestSeller, DealDaily, FeatureProducts, CustomSlider } from '../../components'
import { useSelector } from 'react-redux'
import icons from '../../ultils/icons'

const {IoIosArrowForward} = icons

const Home = () => {
  const {newProducts} = useSelector(state => state.products)
  const {categories} = useSelector(state => state.app)
  // const {current} = useSelector(state => state.user)

  return (
    <>
      <div className='w-main flex' >
        <div className='w-[25%] flex flex-col flex-auto gap-5' >
          <Sidebar />
          <DealDaily />
        </div>
        <div className='w-[75%] flex pl-5 flex-col flex-auto gap-5' >
          <Banner />
          <BestSeller />
        </div>
      </div>
      <div className='my-8' >
        <FeatureProducts />
      </div>
      <div className='my-8 w-full' >
        <h3 className='text-[20px] font-semibold py-[15px] border-b-2 border-main ' >
          NEW ARRIVALS
        </h3>
        <div className=' mt-4 mx-[-10px]' >
          <CustomSlider
            products={newProducts}
          />
        </div>
      </div>

      <div className='my-8 w-full' >
        <h3 className='text-[20px] font-semibold py-[15px] border-b-2 border-main ' >HOT COLLECTIONS</h3>
        <div className='flex flex-wrap mt-4 w-[1240px]' >
          {categories?.filter(el => el.brand.length > 0)?.map(el => (
            <div
              key={el._id}
              className='w-1/3 pr-5 py-5'
            >
              
              <div className='border flex p-4 items-center gap-4 min-h-[190px]' > 
                  <img
                    src={el?.image}
                    alt=''
                    className='w-[144px] h-[129px] object-cover flex-1'
                  />
                  <div className='flex-1 text-gray-700' >
                    <h4 className='font-semibold uppercase' >{el?.title}</h4>
                    <ul className='text-sm' >
                      {el?.brand?.map(item => (
                        <span key={item} className='flex items-center gap-1 text-gray-500' >
                          <IoIosArrowForward size={14} />
                          <li>{item}</li>
                        </span>
                      ))}
                    </ul>
                  </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className='my-8 w-full'>
        <h3 className='text-[20px] font-semibold py-[15px] border-b-2 border-main ' >BLOG POSTS</h3>
      </div>
    </>
  )
}

export default Home