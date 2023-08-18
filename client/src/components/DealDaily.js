import React, { useEffect, useState, memo } from 'react'
import icons from '../ultils/icons'
import { apiGetProducts } from '../apis'
import { formatMoney, renderStartFromNumber } from '../ultils/helpers'
import {CountDown} from './'

const { AiFillStar, AiOutlineMenu } = icons

let idInterval

const DealDaily = () => {
    const [dealDaily, setDealDaily] = useState(null)
    const [hour, setHour] = useState(24)
    const [minute, setMinute] = useState(60)
    const [second, setSecond] = useState(60)
    const [expireTime, setExpireTime] = useState(false)


    const fetchDealDaily = async() => {
        const response = await apiGetProducts({ limit: 1, page: Math.round(Math.random() * 10), totalRatings: 5})
        if(response.success) {
            setDealDaily(response.products[0])
            const h = 24 - new Date().getHours()
            const m = 60 - new Date().getMinutes()
            const s = 60 - new Date().getSeconds()
            setHour(h)
            setMinute(m)
            setSecond(s)
        } else {
            setHour(0)
            setMinute(59)
            setSecond(59)
        }
    }

    useEffect(() => {
        idInterval && clearInterval(idInterval)
        fetchDealDaily()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [expireTime])
    useEffect(() => {
        idInterval = setInterval(() => {
            if (second > 0) setSecond(prev => prev - 1)
            else {
                if (minute > 0) {
                    setMinute(prev => prev - 1)
                    setSecond(59)
                } else {
                    if (hour > 0) {
                        setHour(prev => prev - 1)
                        setMinute(59)
                        setSecond(59)
                    } else {
                        setExpireTime(!expireTime)
                    }
                }
            }
        }, 1000)

        return () => {
            clearInterval(idInterval)
        }
    }, [second, minute, hour, expireTime])

    return (
        <div className='w-full border flex-auto'>
            <div className='flex items-center justify-between p-4 w-full' >
                <span className='flex-3 flex justify-center'>
                    <AiFillStar size={20} color='#DD1111' />
                </span>
                <span className='flex-5 font-semibold text-[20px] flex justify-center text-gray-700'>DEAL DAILY</span>
                <span className='flex-2'></span>
            </div>
            <div className='w-full flex flex-col items-center pt-8 gap-2 px-4' >
                <img
                    src={dealDaily?.thumb}
                    alt='product'
                    className='w-full object-contain'
                />
                <span className='line-clamp-1 text-center' >{dealDaily?.title}</span>
                <span className='flex h-4' >{renderStartFromNumber(dealDaily?.totalRatings, 20)}</span>
                <span>{`${formatMoney(dealDaily?.price)} VND`}</span>
            </div>
            <div className='px-4 mt-8' >
                <div className='flex justify-center gap-2 items-center mb-4' >
                    <CountDown unit={'Hour'} number={hour} />
                    <CountDown unit={'Minute'} number={minute} />
                    <CountDown unit={'Second'} number={second} />
                </div>
                <button
                    type='button'
                    className='flex gap-2 items-center justify-center w-full bg-main hover:bg-gray-800 text-white font-medium py-2'
                >
                    <AiOutlineMenu />
                    <span>Options</span>
                </button>
            </div>
        </div>
    )
}

export default memo(DealDaily)