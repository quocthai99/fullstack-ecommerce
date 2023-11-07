import React, { useState } from 'react';
import { productInfoTabs } from '../ultils/contants';
import Votebar from './Votebar';
import { renderStartFromNumber } from '../ultils/helpers';
import Button from './Button';
import { useDispatch, useSelector } from 'react-redux';
import { showModal } from '../store/app/appSlice';
import VoteOption from './VoteOption';
import Swal from 'sweetalert2';
import path from '../ultils/path';
import { useNavigate } from 'react-router-dom';
import { Comment } from './';

const ProductInformation = ({ totalRatings, ratings, nameProduct, pid, rerender }) => {
    const [activedTab, setActivedTab] = useState(1);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoggedIn } = useSelector((state) => state.user);

    const toggleVote = () => {
        if (!isLoggedIn) {
            Swal.fire({
                text: 'Login to vote',
                cancelButtonText: 'Cancel',
                confirmButtonText: 'Go Login',
                title: 'Oops!',
                showCancelButton: true,
            }).then((rs) => {
                if (rs.isConfirmed) navigate(`/${path.LOGIN}`);
            });
        } else {
            dispatch(
                showModal({
                    isShowModal: true,
                    modalChildren: <VoteOption pid={pid} nameProduct={nameProduct} rerender={rerender} />,
                }),
            );
        }
    };

    return (
        <div>
            <div className="flex items-center gap-1 relative bottom-[-1px]">
                {productInfoTabs.map((el) => (
                    <span
                        className={`px-5 py-[9px] cursor-pointer ${
                            activedTab === el.id ? 'bg-white border border-b-0' : 'bg-[#f1f1f1] border text-gray-600'
                        }`}
                        key={el.id}
                        onClick={() => setActivedTab(el.id)}
                    >
                        {el.name}
                    </span>
                ))}
            </div>
            <div className="w-full border">{productInfoTabs.find((el) => el.id === activedTab)?.content}</div>

            <div className="flex flex-col py-8">
                <div className="flex border">
                    <div className="flex-4 flex flex-col gap-2 items-center justify-center border-r">
                        <span>{`${totalRatings} / 5`}</span>
                        <span className="flex gap-2">{renderStartFromNumber(totalRatings)}</span>
                        <span>{`${ratings?.length} reviewer`}</span>
                    </div>
                    <div className="flex-6 flex flex-col gap-2  p-4">
                        {Array.from(Array(5).keys())
                            .reverse()
                            .map((el) => (
                                <Votebar
                                    key={el}
                                    number={el + 1}
                                    ratingTotal={ratings?.length}
                                    ratingCount={ratings?.filter((i) => i.star === el + 1)?.length}
                                />
                            ))}
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center gap-2">
                    <div>Do you rating this product?</div>
                    <Button name={'Rate now!'} handleOnClick={toggleVote} />
                </div>
                <div className="flex flex-col gap-4">
                    {ratings?.map((el) => (
                        <Comment key={el._id} star={el.star} updatedAt={el.updatedAt} comment={el.comment} name={`${el.postedBt.firstname} ${el.postedBt.lastname}`} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductInformation;
