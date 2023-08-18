import React, { useState, useEffect} from 'react'
import { apiGetProducts } from '../apis'
import { CustomSlider} from './'
import { getNewProducts } from '../store/products/asyncAction'
import { useDispatch, useSelector } from 'react-redux'

const tabs = [
    {id: 1, name: 'best seller'},
    {id: 2, name: 'new arrivals'},
]

const BestSeller = () => {
    const dispatch = useDispatch()
    const [bestSeller, setBestSeller] = useState(null)
    const [activedTab, setActivedTab] = useState(1)
    const [products, setProducts] = useState(null)
    const {newProducts} = useSelector(state => state.products)

    const fetchProducts = async () => {
      const response = await apiGetProducts({sort: '-sold'})
      if ( response.success ) {
        setBestSeller(response.products)
        setProducts(response.products)
      }
    }
  
    useEffect(() => {
      fetchProducts()
      dispatch(getNewProducts())
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []) 


    useEffect(() => {
        if ( activedTab === 1) setProducts(bestSeller)
        if ( activedTab === 2) setProducts(newProducts)
    }, [activedTab, bestSeller, newProducts])  

    return (
        <div>
            <div className='flex text-[20px] mt-5 gap-8 pb-4 border-b-2 border-main ' >
                {tabs.map(el => (
                    <span
                        key={el.id}
                        className={`font-bold capitalize px-8 border-r cursor-pointer ${activedTab === el.id ? 'text-main' : ''}`}
                        onClick={() => setActivedTab(el.id)}
                    >
                        {el.name}
                    </span>
                ))}
            </div>
            <div className='mt-4 mx-[-10px]' >
                <CustomSlider
                    products={products}
                    activedTab={activedTab}
                />
            </div>
            <div className='flex w-full gap-4 mt-4' >
                <img src='https://digital-world-2.myshopify.com/cdn/shop/files/banner2-home2_2000x_crop_center.png?v=1613166657' alt='banner' className='flex-1 object-contain' />
                <img src='https://digital-world-2.myshopify.com/cdn/shop/files/banner1-home2_2000x_crop_center.png?v=1613166657' alt='banner' className='flex-1 object-contain' />
            </div>
        </div>
    )
}

export default BestSeller