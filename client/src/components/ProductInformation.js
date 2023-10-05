import React, {useState} from 'react';
import { productInfoTabs } from '../ultils/contants';

const ProductInformation = () => {
    const [activedTab, setActivedTab] = useState(1)

    return (
        <div>
            <div className='flex items-center gap-1 relative bottom-[-1px]' >
                {productInfoTabs.map(el => (
                    <span
                        className={`px-5 py-[9px] cursor-pointer ${activedTab === el.id ? 'bg-white border border-b-0' : 'bg-[#f1f1f1] border text-gray-600'}`}
                        key={el.id}
                        onClick={() => setActivedTab(el.id)}
                    >
                            {el.name}
                    </span>
                ))}
            </div>
            <div className='w-full border h-[200px]' >
                {productInfoTabs.find(el => el.id === activedTab).content}
            </div>
        </div>
    );
};

export default ProductInformation;
