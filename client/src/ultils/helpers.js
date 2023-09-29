import icons from "./icons"

const { AiFillStar, AiOutlineStar } = icons

export const createSlug = string => string.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").split(' ').join('-')
export const formatMoney = number => Number(number?.toFixed(1)).toLocaleString()
export const renderStartFromNumber = (number, size) => {
    const stars = []
    for ( let i = 0; i < number; i++) stars.push(<AiFillStar key={i} color="orange" size={size || 16} />)
    for ( let i = 5; i > number; i--) stars.push(<AiOutlineStar key={i} color="orange" size={size || 16} />)

    return stars
}

export const validate = (payload, setInvalidFieds) => {
    let invalids = 0
    const formatPayload = Object.entries(payload)
    for ( let arr of formatPayload ) {
        if (arr[1].trim() === '') {
            invalids++
            setInvalidFieds(prev => [...prev, {name: arr[0], mes: 'Require this field'}])
        }
    }
    for ( let arr of formatPayload ) {
        switch (arr[0]) {
            case 'email':
                const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                if (!arr[1].match(regex)) {
                    invalids++
                    setInvalidFieds(prev => [...prev, { name: arr[0], mes: 'Email invalid'}])
                }
                break;
            case 'password':
                if (arr[1].length < 6 ) {
                    invalids++
                    setInvalidFieds(prev => [...prev, { name: arr[0], mes: 'Password minimun 6 characters'}])
                }

                break;
        
            default:
                break;
        }
    }

    return invalids
}