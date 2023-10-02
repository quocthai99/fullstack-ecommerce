import React from 'react'

const SelectQuantity = ({quantity, handleQuantity, handleChangeQuantity}) => {
  return (
    <div className='flex items-center' >
        <span onClick={() => handleChangeQuantity('minus')} className='border-r cursor-pointer border-gray-500 p-2'>-</span>
        <input
            type='text'
            value={quantity}
            onChange={e => handleQuantity(e.target.value)}
            className='text-center py-2 outline-none w-[50px] text-black '
        />
        <span onClick={() => handleChangeQuantity('plus')} className='border-l cursor-pointer border-gray-500 p-2'>+</span>
    </div>
  )
}

export default SelectQuantity