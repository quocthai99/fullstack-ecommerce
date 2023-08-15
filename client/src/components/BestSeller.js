import React, { useState, useEffect} from 'react'
import { apiGetProducts } from '../apis'
import {Product} from './'
import Slider from "react-slick";

const tabs = [
    {id: 1, name: 'best seller'},
    {id: 2, name: 'new arrivals'},
]

const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1
};

const BestSeller = () => {
    const [bestSeller, setBestSeller] = useState(null)
    const [newProducts, setNewProducts] = useState(null)
    const [activedTab, setActivedTab] = useState(1)
    const [products, setProducts] = useState(null)

    const fetchProducts = async () => {
      const response = await Promise.all([apiGetProducts({sort: '-sold'}), apiGetProducts({sort: '-createdAt'})])
      if ( response[0]?.success ) {
        setBestSeller(response[0].products)
        setProducts(response[0].products)
      }
      if ( response[1]?.success ) setNewProducts(response[1].products)
    }
  
    useEffect(() => {
      fetchProducts()
    }, []) 


    useEffect(() => {
        if ( activedTab === 1) setProducts(bestSeller)
        if ( activedTab === 2) setProducts(newProducts)
    }, [activedTab])  

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
                <Slider {...settings}>
                    {products?.map(el => (
                        <Product
                            key={el._id}
                            productData={el}
                            isNew={activedTab === 1 ? false : true}
                        />
                    ))}
                </Slider>
            </div>
        </div>
    )
}

export default BestSeller