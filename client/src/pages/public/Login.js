import React, {useState, useCallback, useEffect} from 'react'
import {Button, InputField} from '../../components'
import { apiForgotPassword, apiLogin, apiRegister, apiFinalRegister } from '../../apis'
import Swal from 'sweetalert2'
import { Link, useNavigate } from 'react-router-dom'
import path from '../../ultils/path'
import {login} from '../../store/user/userSlice'
import { useDispatch } from 'react-redux'
import {toast} from 'react-toastify'
import { validate } from '../../ultils/helpers'

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
  const [invalidFields, setInvalidFields] = useState([])
  const [token, setToken] = useState('')
  const [isVerifyEmail, setIsVerifyEmail] = useState(false)
  const resetPayload = () => {
    setPayload({
      email: '',
      password: '',
      firstname: '',
      lastname: '',
      mobile: ''
    })
  }

  useEffect(() => {
    resetPayload()
    setInvalidFields([])
  }, [isRegister])

  const handleSubmit = useCallback(async() => {
    const { firstname, lastname, mobile, ...data} = payload
    const invalids = isRegister ? validate(payload, setInvalidFields) : validate(data, setInvalidFields)
    
    if ( invalids === 0 ) {
      if(isRegister) {
        const response = await apiRegister(payload)
        if (response.success) {
          setIsVerifyEmail(true)
          // Swal.fire('Congratulation', response.mes, 'success').then(() => {
          //   resetPayload()
          //   setIsRegister(false)
          // })
        } else Swal.fire('Oops!', response.mes, 'error')
      } else {
        const rs = await apiLogin(data)
        if (rs.success) {
          dispatch(login({isLoggedIn: true, token: rs.accessToken, userData: rs.userData}))
          navigate(`/${path.HOME}`)
        } else Swal.fire('Oops!', rs.mes, 'error')
      }
    }
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRegister, payload])

  const finalRegister = async () => {
    const response = await apiFinalRegister(token)
    if ( response.success ) {
      Swal.fire('Congratulation', response.mes, 'success').then(() => {
        setIsRegister(false)
        resetPayload()
      })
    } else Swal.fire('Oops!', response.mes, 'error')
    setToken('')
    setIsVerifyEmail(false)
  }

  const handleForgotPassword = async() => { 
    const response = await apiForgotPassword({email})
    if ( response.success ) {
      setIsForgotPassword(false)
      toast.success(response.mes)
    } else toast.error(response.mes, {theme: 'colored'})
  }

  return (
    <div className='w-screen h-screen relative' >
      {isVerifyEmail && <div className='absolute top-0 left-0 right-0 bottom-0 bg-overlay z-50 flex flex-col items-center justify-center ' >
        <div className='bg-white w-[500px] rounded-md p-8 ' >
          <h4>Enter your code</h4>
          <input 
            type='text'
            value={token}
            onChange={e => setToken(e.target.value)}
            className='p-2 border rounded-md outline-none '
          />
          <button
            type='button'
            className='px-4 py-2 bg-blue-500 font-semibold text-white rounded-md ml-4 '
            onClick={finalRegister}
          >
            Submit
          </button>
        </div>
      </div>}
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
            invalidFields={invalidFields}
            setInvalidFieds={setInvalidFields}
          />
          <InputField
            value={payload.lastname}
            setValue={setPayload}
            nameKey='lastname'
            invalidFields={invalidFields}
            setInvalidFieds={setInvalidFields}
          />
            
          </div>}
          <InputField
            value={payload.email}
            setValue={setPayload}
            nameKey='email'
            invalidFields={invalidFields}
            setInvalidFieds={setInvalidFields}
          />
          {isRegister && <InputField
            value={payload.mobile}
            setValue={setPayload}
            nameKey='mobile'
            invalidFields={invalidFields}
            setInvalidFieds={setInvalidFields}
          />}
          <InputField
            value={payload.password}
            setValue={setPayload}
            nameKey='password'
            type='password'
            invalidFields={invalidFields}
            setInvalidFieds={setInvalidFields}
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
          <Link className='text-blue-500 hover:underline cursor-pointer' to={`/${path.HOME}`}>Go Home!</Link>
        </div>
      </div>
    </div>
  )
}

export default Login