import React, {useState, useCallback} from 'react'
import {Button, InputField} from '../../components'
import { apiForgotPassword, apiLogin, apiRegister } from '../../apis'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import path from '../../ultils/path'
import {register} from '../../store/user/userSlice'
import { useDispatch } from 'react-redux'
import {toast} from 'react-toastify'

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [isRegister, setIsRegister] = useState(false)
  const [isForgotPassword, setIsForgotPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [payload, setPayload] = useState({
    email: '',
    password: '',
    firstname: '',
    lastname: '',
    mobile: ''
  })

  const resetPayload = () => {
    setPayload({
      email: '',
      password: '',
      firstname: '',
      lastname: '',
      mobile: ''
    })
  }

  const handleSubmit = useCallback(async() => {
    const { firstname, lastname, mobile, ...data} = payload
    if(isRegister) {
      const response = await apiRegister(payload)
      if (response.success) {
        Swal.fire('Congratulation', response.mes, 'success').then(() => {
          resetPayload()
          setIsRegister(false)
        })
      } else Swal.fire('Oops!', response.mes, 'error')
    } else {
      const rs = await apiLogin(data)
      if (rs.success) {
        dispatch(register({isLoggedIn: true, token: rs.accessToken, userData: rs.userData}))
        navigate(`/${path.HOME}`)
      } else Swal.fire('Oops!', rs.mes, 'error')
    }
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRegister, payload])

  const handleForgotPassword = async() => { 
    const response = await apiForgotPassword({email})
    if ( response.success ) {
      setIsForgotPassword(false)
      toast.success(response.mes)
    } else toast.error(response.mes, {theme: 'colored'})
  }

  return (
    <div className='w-screen h-screen relative' >
      {isForgotPassword && <div className='absolute top-0 left-0 right-0 bottom-0 bg-white z-50 flex justify-center py-8 animate-slide-right ' >
        <div className='flex flex-col gap-4' >
          <label htmlFor='email' >Enter your email:</label>
          <input
            type='text'
            id='email'
            placeholder='Exp: abcxyz@gmail.com'
            className='w-[800px] pb-2 border-b outline-none placeholder:text-sm '
            onChange={e => setEmail(e.target.value)}
          />
          <div className='flex items-center justify-end w-full gap-4 ' >
            <Button
              name='Submit'
              handleOnClick={handleForgotPassword}
              // eslint-disable-next-line react/style-prop-object
              style='px-4 py-2 rounded-md text-white bg-blue-500 font-semibold my-2'
            />
            <Button
              name='Back'
              handleOnClick={() => setIsForgotPassword(false)}
            />
          </div>
        </div>
      </div>}

      <img
        src='https://img.freepik.com/premium-vector/online-shopping-digital-technology-with-icon-blue-background-ecommerce-online-store-marketing_252172-219.jpg'
        alt='bg-cart'
        className='w-full h-full object-cover'
      />
      <div className='absolute top-0 bottom-0 left-1/2 right-0 flex items-center justify-center ' >
        <div className='p-8 bg-white flex flex-col items-center rounded-md min-w-[500px]  ' >
          <h1 className='text-[28px] font-semibold text-main mb-8' >{isRegister ? 'Register' : 'Login'}</h1>
          {isRegister && <div className='flex items-center gap-2' >
            <InputField
            value={payload.firstname}
            setValue={setPayload}
            nameKey='firstname'
          />
          <InputField
            value={payload.lastname}
            setValue={setPayload}
            nameKey='lastname'
          />
            
          </div>}
          <InputField
            value={payload.email}
            setValue={setPayload}
            nameKey='email'
          />
          {isRegister && <InputField
            value={payload.mobile}
            setValue={setPayload}
            nameKey='mobile'
          />}
          <InputField
            value={payload.password}
            setValue={setPayload}
            nameKey='password'
            type='password'
          />
          <Button
            name={isRegister ? 'Register' : 'Login'}
            handleOnClick={handleSubmit}
            fw
          />
          <div className='flex items-center justify-between my-2 w-full text-sm' >
            <span
              className='text-blue-500 hover:underline cursor-pointer'
              onClick={() => setIsForgotPassword(true)}
            >Forgot your password?</span>
            <span onClick={() => setIsRegister(prev => !prev)} className='text-blue-500 hover:underline cursor-pointer'>{isRegister ? 'Login for account' : 'Create Account'}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login