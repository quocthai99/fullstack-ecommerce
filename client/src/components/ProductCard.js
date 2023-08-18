import React from 'react'
import { renderStartFromNumber, formatMoney } from '../ultils/helpers'

const ProductCard = ({price, title, image, totalRatings}) => {
    return (
        <div className='w-1/3 flex-auto flex px-[10px] mb-[20px] ' >
            <div className='flex w-full border' >
                <img
                    src={image}
                    alt='thumb'
                    className='w-[120px] object-contain p-4 '
                />
                <div className='flex flex-col mt-[15px] items-start gap-1 w-full text-sm' >
                    <span className='line-clamp-1 capitalize text-sm' >{title?.toLowerCase()}</span>
                    <span className='flex h-4' >{renderStartFromNumber(totalRatings, 14)}</span>
                    <span>{`${formatMoney(price)} VND`}</span>
                </div>
            </div>
        </div>
    )
}

export default ProductCard