import React, { useEffect, useState } from 'react';
import icons from '../ultils/icons';
import { colors } from '../ultils/contants';
import { useNavigate, createSearchParams, useParams } from 'react-router-dom';
import useDebounce from '../hooks/useDebounce';

const { AiOutlineDown } = icons;

const SearchItem = ({ name, activeClick, changeActiveFilter, type = 'checkbox' }) => {
    const navigate = useNavigate()
    const { category } = useParams()
    const [selected, setSelected] = useState([]);
    const [price, setPrice] = useState({
        from: '',
        to: ''
    })

    const handleSelect = (e) => {
        const alreadyEl = selected.find((el) => el === e.target.value);
        if (alreadyEl) {
            setSelected((prev) => prev.filter((el) => el !== e.target.value));
        } else {
            setSelected((prev) => [...prev, e.target.value]);
        }
    };

    useEffect(() => {
        if (selected.length > 0) {
            navigate({
                pathname: `/${category}`,
                search: createSearchParams({
                    color: selected.join(',')
                }).toString()
            })
        } else {
            navigate(`/${category}`)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selected])

    const debouncePriceFrom = useDebounce(price.from, 1000)
    const debouncePriceTo = useDebounce(price.to, 1000)
    useEffect(() => {
        const data = {}

        if ( Number(price.from) > 0) data.from = price.from
        if ( Number(price.to) > 0) data.to = price.to
        navigate({
            pathname: `/${category}`,
            search: createSearchParams(data).toString()
        })
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncePriceFrom, debouncePriceTo])
    
    return (
        <div
            onClick={() => changeActiveFilter(name)}
            className="p-3 text-gray-500 border relative border-gray-800 flex justify-between items-center text-xs gap-6 cursor-pointer"
        >
            <span>{name}</span>
            <AiOutlineDown />
            {activeClick === name && (
                <div className="absolute z-10 top-full left-0 w-fit p-4 border bg-white min-w-[150px]">
                    {type === 'checkbox' && (
                        <div>
                            <div className="p-4 flex justify-between gap-8 items-center ">
                                <span className="whitespace-nowrap">{`${selected.length} selected`}</span>
                                <span onClick={e => {
                                    e.stopPropagation()
                                    setSelected([])
                                }} className="underline hover:text-main cursor-pointer">Reset</span>
                            </div>
                            <div onClick={(e) => e.stopPropagation()} className="flex flex-col gap-4">
                                {colors.map((el, index) => (
                                    <div key={index} className="flex items-center gap-4">
                                        <input
                                            type="checkbox"
                                            onChange={handleSelect}
                                            value={el}
                                            checked={selected.includes(el)}
                                        />
                                        <label className="capitalize text-gray-700">{el}</label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    {type === 'input' && (
                        <div onClick={e => e.stopPropagation()} >
                            <div className="p-4 flex justify-between gap-8 items-center ">
                                <span className="whitespace-nowrap">{`The highest price is 31.825.520,69 VND`}</span>
                                <span onClick={e => {
                                    e.stopPropagation()
                                    setPrice({
                                        from: '',
                                        to: ''
                                    })
                                }} className="underline hover:text-main cursor-pointer">Reset</span>
                            </div>
                            <div className='flex items-center p-2 gap-2'>
                                <div className='flex items-center gap-2' >
                                    <label>From</label>
                                    <input 
                                        value={price.from}
                                        onChange={e => setPrice(prev => ({...prev, from: e.target.value}))}
                                        type='number'
                                        className='border appearance-none bg-white px-3 py-2'
                                    />
                                </div>
                                <div className='flex items-center gap-2' >
                                    <label>To</label>
                                    <input 
                                        value={price.to}
                                        onChange={e => setPrice(prev => ({...prev, to: e.target.value}))}
                                        type='number'
                                        className='border appearance-none bg-white px-3 py-2'
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default SearchItem;
