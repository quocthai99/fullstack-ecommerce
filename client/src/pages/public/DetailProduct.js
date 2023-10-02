import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiGetProduct } from '../../apis';
import { Breadcrumb, Button, SelectQuantity } from '../../components';
import Slider from 'react-slick';
import ReactImageMagnify from 'react-image-magnify';
import { formatMoney, formatPrice, renderStartFromNumber } from '../../ultils/helpers';

const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
};

const DetailProduct = () => {
    const { pid } = useParams();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1)

    useEffect(() => {
        const fetchProduct = async () => {
            const response = await apiGetProduct(pid);
            if (response.success) {
                setProduct(response.productData);
            }
        };
        fetchProduct();
    }, [pid]);

    const handleQuantity = useCallback((number) => {
        if (number !== 'number' || number < 1) {
            return
        } else {
            setQuantity(number)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [quantity])

    const handleChangeQuantity = useCallback((flag) => {
    if(flag === 'minus' && quantity === 1) return
    if (flag === 'minus') setQuantity(prev => +prev - 1)
    if (flag === 'plus') setQuantity(prev => +prev + 1)
    }, [quantity])

    return (
        <div className="w-full">
            <div className="h-[81px] flex items-center justify-center bg-gray-100">
                <div className="w-main">
                    <h3>{product?.title}</h3>
                    <Breadcrumb title={product?.title} category={product?.category} />
                </div>
            </div>
            <div className="w-main mt-4 flex gap-4 ">
                <div className="flex-4 flex flex-col gap-4">
                    <div className='w-[458px] m-auto' >
                        <div className='w-full border' >
                            <ReactImageMagnify {...{
                                smallImage: {
                                    alt: 'Wristwatch by Ted Baker London',
                                    isFluidWidth: true,
                                    src: product?.images
                                },
                                largeImage: {
                                    src: product?.images,
                                    width: 500,
                                    height: 600
                                }
                            }} />
                        </div>
                        <div className="w-full border my-4">
                            <Slider className='image-slider' {...settings}>
                                {product?.images?.map((el) => (
                                    <div key={el} className='p-2' >
                                        <img src={el} alt="detail-product" className="w-[143px] h-[143px] object-contain " />
                                    </div>
                                ))}
                            </Slider>
                        </div>
                    </div>
                </div>
                <div className="flex-4">
                    <div className='flex items-center justify-between' >
                        <h2 className='text-[30px] font-semibold ' >
                            {`${formatMoney(formatPrice(product?.price))} VND`}
                        </h2>
                        <span className='text-sm text-main '>{`Kho: ${product?.quantity}`}</span>
                    </div>
                    <div className='flex items-center gap-1 my-4' >
                        {renderStartFromNumber(product?.totalRatings)}
                        <span className='text-sm text-main italic ' >{`(Đã bán: ${product?.sold} cái) `}</span>
                    </div>
                    <ul className='text-sm text-gray-500 list-square pl-5' >
                        {product?.description?.map(el => (
                            <li className='leading-6' key={el} >{el}</li>
                        ))}
                    </ul>
                    <div>
                        <SelectQuantity
                            quantity={quantity}
                            handleQuantity={handleQuantity}
                            handleChangeQuantity={handleChangeQuantity}
                        />
                        <Button name="Add to cart" fw />
                    </div>
                </div>
                <div className="flex-2">info</div>
            </div>
        </div>
    );
};

export default DetailProduct;
