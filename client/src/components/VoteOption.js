import React, { useEffect, useRef, useState } from 'react';
import logo from '../assets/logo.png';
import { VoteOptions } from '../ultils/contants';
import { AiFillStar } from 'react-icons/ai';
import Button from './Button';
import { apiRatings } from '../apis';
import { useDispatch } from 'react-redux';
import {showModal} from '../store/app/appSlice'


const VoteOption = ({ nameProduct, pid, rerender }) => {
    const modalRef = useRef();
    const [isActiveStar, setIsActiveStar] = useState(null);
    const [comments, setComments] = useState('');
    const dispatch = useDispatch()

    useEffect(() => {
        modalRef.current.scrollIntoView({ block: 'center', behavior: 'smooth' });
    }, []);

    const handleSubmitVoteOption = async ({ score, comments }) => {
        if ( !comments || !pid || !score ) {
            alert('Please vote this product')
            return
        }
        await apiRatings({ star: score, comment: comments, pid, updatedAt: Date.now() });
        dispatch(showModal({isShowModal: false, modalChildren: null}))
        rerender()
    };

    return (
        <div
            onClick={(e) => e.stopPropagation()}
            ref={modalRef}
            className="bg-white w-[700px] p-4 flex-col gap-4 flex items-center justify-center "
        >
            <img src={logo} alt="logo" className="w-[300px] object-contain " />
            <h2 className="text-center text-lg">{`Vote the product ${nameProduct}`}</h2>
            <textarea
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                cols={30}
                rows={10}
                className="w-full h-[50px] p-3 border "
                placeholder="Type something?"
            ></textarea>
            <div className="w-full flex flex-col gap-4 justify-center items-center">
                <p>How do you like this product?</p>
                <div className="flex justify-center gap-4 items-center">
                    {VoteOptions.map((el) => (
                        <div
                            onClick={() => setIsActiveStar(el.id)}
                            className="w-[100px] bg-gray-200 hover:bg-gray-300 cursor-pointer rounded-md p-4 flex items-center justify-center flex-col gap-2 "
                            key={el.id}
                        >
                            {isActiveStar >= el.id ? <AiFillStar color="orange" /> : <AiFillStar color="gray" />}
                            <span>{el.text}</span>
                        </div>
                    ))}
                </div>
            </div>
            <Button handleOnClick={() => handleSubmitVoteOption({ comments, score: isActiveStar })} name="Submit" fw />
        </div>
    );
};

export default VoteOption;
