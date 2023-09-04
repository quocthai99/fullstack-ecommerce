import React, {useState} from 'react'
import { Button } from '../../components'
import { useParams } from 'react-router-dom'
import { apiResetPassword } from '../../apis'
import {toast} from 'react-toastify'

const ResetPassword = () => {
  const {token} = useParams()
  const [password, setPassword] = useState('')

  const handleResetPassword = async() => { 
    const response = await apiResetPassword({password, token})
    if ( response.success ) {
      toast.success(response.mes)
    } else toast.error(response.mes, {theme: 'colored'})
  }

  return (
    <div className='absolute top-0 left-0 right-0 bottom-0 bg-white z-50 flex justify-center py-8 animate-slide-right ' >
        <div className='flex flex-col gap-4' >
          <label htmlFor='password' >Enter your new password:</label>
          <input
            type='text'
            id='password'
            placeholder='Type here'
            className='w-[800px] pb-2 border-b outline-none placeholder:text-sm '
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <div className='flex items-center justify-end w-full gap-4 ' >
            <Button
              name='Submit'
              handleOnClick={handleResetPassword}
              // eslint-disable-next-line react/style-prop-object
              style='px-4 py-2 rounded-md text-white bg-blue-500 font-semibold my-2'
            />
        </div>
      </div>
    </div>
  )
}

export default ResetPassword