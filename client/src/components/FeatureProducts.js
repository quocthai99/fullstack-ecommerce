import React, { useEffect, useState } from 'react'
import { apiGetProducts } from '../apis'
import ProductCard from './ProductCard'

const FeatureProducts = () => {
    const [products, setProducts] = useState(null)

    const fetchProducts = async () => {
        const response = await apiGetProducts({ limit: 9, totalRatings: 5})
        if (response.success) setProducts(response.products)
    }

    useEffect(() => {
        fetchProducts()
    }, [])
    return (
        <div className='w-full' >
            <h3 className='text-[20px] font-semibold py-[15px] border-b-2 border-main ' >
                FEATURE PRODUCTS
            </h3>
            <div className='flex flex-wrap mt-[15px] mx-[-10px] ' >
                {products?.map(el => (
                    <ProductCard
                        key={el._id}
                        title={el.title}
                        image={el.thumb}
                        totalRatings={el.totalRatings}
                        price={el.price}
                    />
                ))}
            </div>
            <div className='flex justify-between gap-5 h-[655px]' >
                <img
                    src='https://digital-world-2.myshopify.com/cdn/shop/files/banner1-bottom-home2_b96bc752-67d4-45a5-ac32-49dc691b1958_600x.jpg?v=1613166661'
                    alt='feature'
                    className='flex-3'
                />
                <div className='flex flex-col justify-between flex-1 gap-5 ' >
                    <img
                        src='https://digital-world-2.myshopify.com/cdn/shop/files/banner2-bottom-home2_400x.jpg?v=1613166661'
                        alt='feature'
                        className='w-full h-full'
                    />
                    <img
                        src='https://digital-world-2.myshopify.com/cdn/shop/files/banner3-bottom-home2_400x.jpg?v=1613166661'
                        alt='feature'
                        className='w-full h-full'
                    />
                </div>
                <img
                    src='https://digital-world-2.myshopify.com/cdn/shop/files/banner4-bottom-home2_92e12df0-500c-4897-882a-7d061bb417fd_400x.jpg?v=1613166661'
                    alt='feature'
                    className='flex-1'
                />
            </div>
        </div>
    )
}

export default FeatureProducts