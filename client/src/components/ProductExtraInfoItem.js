import React from 'react'

const ProductExtraInfoItem = ({icon, title, sub}) => {
  return (
    <div className='flex items-center gap-4 border mb-[10px] p-2' >
      <span>{icon}</span>
      <div className='flex flex-col' >
        <span className='text-sm text-gray-700'>{title}</span>
        <span  className='text-xs text-gray-500'>{sub}</span>
      </div>
    </div>
  )
}

export default ProductExtraInfoItem