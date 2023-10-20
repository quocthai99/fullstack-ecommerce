import icons from "./icons";
import path from "./path";

export const navigation = [
    {
        id: 1,
        value: 'HOME',
        path: `/${path.HOME}`
    },
    {
        id: 2,
        value: 'PRODUCT',
        path: `/${path.PRODUCTS}`
    },
    {
        id: 3,
        value: 'BLOGS',
        path: `/${path.BLOGS}`
    },
    {
        id: 4,
        value: 'OUR SERVICES',
        path: `/${path.OUR_SERVICES}`
    },
    {
        id: 5,
        value: 'FAQs',
        path: `/${path.FAQ}`
    },
]

const {RiTruckFill, BsShieldShaded, BsReplyFill, FaTty, AiFillGift } = icons

export const productExtraInfomation = [
    {
        id: 1,
        title: 'Guarantee',
        sub: 'Quality Checked',
        icon: <BsShieldShaded />
    },
    {
        id: 2,
        title: 'Free Shipping',
        sub: 'Free On All Products',
        icon: <RiTruckFill />
    },
    {
        id: 3,
        title: 'Special Gift Cards',
        sub: 'Special Gift Cards',
        icon: <AiFillGift />
    },
    {
        id: 4,
        title: 'Free Return',
        sub: 'Within 7 Days',
        icon: <BsReplyFill />
    },
    {
        id: 5,
        title: 'Consultancy',
        sub: 'Lifetime 24/7/356',
        icon: <FaTty />
    },
]

export const productInfoTabs = [
    {
        id: 1,
        name: 'DESCRIPTION',
        content: 'WARRANTY INFORMATIONLIMITED WARRANTIESLimited Warranties are non-transferable. The following Limited Warranties are given to the original retail purchaser of the following Ashley Furniture Industries, Inc.Products'
    },
    {
        id: 2,
        name: 'WARRANTY',
        content: 'WARRANTY INFORMATIONLIMITED WARRANTIESLimited Warranties are non-transferable. The following Limited Warranties are given to the original retail purchaser of the following Ashley Furniture Industries, Inc.Products'
    },
    {
        id: 3,
        name: 'DELIVERY',
        content: 'Wies are non-transferable. The following Limited Warranties are given to the original retail purchaser of the following Ashley Furniture Industries, Inc.Products'
    },
    {
        id: 4,
        name: 'PAYMENT',
        content: 'W-transferable. The following Limited Warranties are given to the original retail purchaser of the following Ashley Furniture Industries, Inc.Products'
    },
    {
        id: 5,
        name: 'CUSTOMER REVIEW',
        content: 'awdawdawdARRANTIESLimited Warranties are non-transferable. The following Limited Warranties are given to the original retail purchaser of the following Ashley Furniture Industries, Inc.Products'
    },
]

export const colors = [
    'black',
    'red',
    'yellow',
    'pink',
    'green'
]

export const sorts = [
    {
        id:  1,
        text: 'Best selling',
        value: '-sold'
    },
    {
        id:  2,
        text: 'Alphabetically, A-Z',
        value: '-title'
    },
    {
        id:  3,
        text: 'Alphabetically, Z-A',
        value: 'title'
    },
    {
        id:  4,
        text: 'Price, low to high',
        value: '-price'
    },
    {
        id:  5,
        text: 'Price, high to low',
        value: 'price'
    },
    {
        id:  6,
        text: 'Date, old to new',
        value: '-createdAt'
    },
    {
        id:  7,
        text: 'Date, new to old',
        value: 'createdAt'
    },
]