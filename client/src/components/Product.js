import React, { useState } from 'react'
import { formatMoney, renderStartFromNumber } from '../ultils/helpers'
import trending from '../assets/trending.png'
import newL from '../assets/new.png'
import {SelectOption} from './' 
import icons from '../ultils/icons'
import { Link } from 'react-router-dom'

const { AiFillEye, AiOutlineMenu, BsFillSuitHeartFill } = icons

const Product = ({productData, isNew}) => {
    const [isShowOption, setIsShowOption] = useState(false)


  return (
    <div className='w-full text-base px-[10px]' >
        <Link
            to={`/${productData?.category.toLowerCase()}/${productData._id}/${productData?.slug}`} 
            className='w-full border p-[15px] flex flex-col items-center'
            onMouseEnter={e => {
                e.stopPropagation()
                setIsShowOption(true)
            }}
            onMouseLeave={e => {
                e.stopPropagation()
                setIsShowOption(false)
            }}
        >
            <div className='w-full relative' >
                {isShowOption && <div className='absolute bottom-[-10px] left-0 right-0 flex justify-center gap-2 animate-slide-top' >
                    <SelectOption icon={<AiFillEye />} />
                    <SelectOption icon={<AiOutlineMenu />} />
                    <SelectOption icon={<BsFillSuitHeartFill />} />
                </div>}
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
        </Link>
    </div>
  )
}

export default Product