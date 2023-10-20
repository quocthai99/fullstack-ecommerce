import React from 'react'

const InputSelect = ({ value, changeValue, options }) => {
  return (
    <select value={value} onChange={e => changeValue(e.target.value)} className='border text-sm' >
        <option value="" >Choose</option>
        {options && options.map(el => (
            <option
                key={el.id}
                value={el.value}
                className='appearance-none bg-white px-3 py-2'
            >
                {el.text}
            </option>
        ))}
    </select>
  )
}

export default InputSelect