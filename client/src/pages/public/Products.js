import React, { useCallback, useEffect, useState } from 'react';
import { useParams, useNavigate, createSearchParams } from 'react-router-dom';
import { Breadcrumb, InputSelect, Product, SearchItem } from '../../components';
import { apiGetProducts } from '../../apis';
import Masonry from 'react-masonry-css';
import { useSearchParams } from 'react-router-dom';
import { sorts } from '../../ultils/contants';

const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
};

const Products = () => {
    const { category } = useParams();
    const navigate = useNavigate()
    const [products, setProducts] = useState(null);
    const [sort, setSort] = useState('')
    const [activeClick, setActiveClick] = useState(null);
    const [params] = useSearchParams();

    const fetchProductsByCategory = async (queries) => {
        const response = await apiGetProducts(queries);
        if (response.success) setProducts(response.products);
    };

    useEffect(() => {
        const param = [];
        for (let i of params.entries()) {
            param.push(i);
        }

        const queries = {};
        for (let [key, value] of param) {
            queries[key] = value;
        }
        let priceQuery = {};
        if (queries.from && queries.to) {
            priceQuery = {
                $and: [{ price: { gte: queries.from } }, { price: { lte: queries.to } }],
            };
            delete queries.price;
        }
        if (queries.from) queries.price = { gte: queries.from };

        if (queries.to) queries.price = { lte: queries.to };
        delete queries.from;
        delete queries.to;
        const q = { ...priceQuery, ...queries };
        fetchProductsByCategory(q);
    }, [params]);

    const changeActiveFilter = useCallback(
        (name) => {
            if (activeClick === name) setActiveClick(null);
            else setActiveClick(name);
        },
        [activeClick],
    );
    
    const changeValue = useCallback((value) => {
         setSort(value)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sort])

    useEffect(() => {
        navigate({
            pathname: `/${category}`,
            search: createSearchParams({
                sort
            }).toString()
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sort])

    return (
        <div className="w-full">
            <div className="h-[81px] flex items-center justify-center bg-gray-100">
                <div className="w-main">
                    <h3 className="font-semibold uppercase">{category}</h3>
                    <Breadcrumb category={category} />
                </div>
            </div>
            <div className="border p-4 flex justify-between mt-8 ">
                <div className="w-4/5 flex flex-col gap-4">
                    <span className="font-semibold text-sm">Filter by</span>
                    <div className="flex items-center gap-4">
                        <SearchItem
                            type="input"
                            name="Price"
                            activeClick={activeClick}
                            changeActiveFilter={changeActiveFilter}
                        />
                        <SearchItem name="Color" activeClick={activeClick} changeActiveFilter={changeActiveFilter} />
                    </div>
                </div>
                <div className="w-1/5 flex flex-col gap-4">
                    <span className="font-semibold text-sm">Sort by</span>
                    <div className='w-full' >
                        <InputSelect
                            options={sorts}
                            value={sort.value}
                            changeValue={changeValue}
                        />
                    </div>
                </div>
            </div>
            <div>
                <Masonry
                    breakpointCols={breakpointColumnsObj}
                    className="my-masonry-grid"
                    columnClassName="my-masonry-grid_column"
                >
                    {products?.map((el) => (
                        <Product key={el._id} productData={el} normal />
                    ))}
                </Masonry>
            </div>
        </div>
    );
};

export default Products;
