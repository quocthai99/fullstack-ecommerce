import React from 'react'
import { formatMoney, renderStartFromNumber } from '../ultils/helpers'
import trending from '../assets/trending.png'
import newL from '../assets/new.png'

const Product = ({productData, isNew}) => {
  return (
    <div className='w-full text-base px-[10px]' >
        <div className='w-full border p-[15px] flex flex-col items-center' >
            <div className='w-full relative' >
                <img
                    src={productData?.thumb}
                    alt='product'
                    className='w-[243px] h-[243px] object-cover'
                />
                <img
                    src={isNew ? newL : trending}
                    alt='label'
                    className='absolute top-0 right-0 w-[100px] h-[35px] object-cover'
                />
            </div>
            <div className='flex flex-col mt-[15px] items-start gap-1 w-full' >
                <span className='flex h-4' >{renderStartFromNumber(productData?.totalRatings)}</span>
                <span className='line-clamp-1' >{productData?.title}</span>
                <span>{`${formatMoney(productData?.price)} VND`}</span>
            </div>
        </div>
    </div>
  )
}

export default Product