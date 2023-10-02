import React from 'react'
import { Link } from 'react-router-dom';
import useBreadcrumbs from "use-react-router-breadcrumbs";
import icons from '../ultils/icons';

const { IoIosArrowForward } = icons


const Breadcrumb = ({title, category}) => {
    const routes = [
        { path: "/:category", breadcrumb: category },
        { path: "/", breadcrumb: "Home" },
        { path: "/:category/:pid/:title", breadcrumb: title },
    ];
    const breadcrumb = useBreadcrumbs(routes);
    
    return (
        <div className='flex gap-2 text-sm items-center' >
            {breadcrumb?.filter(el => !el.match.route === false).map(({ breadcrumb, match }, index, self) => 
                <Link key={match.pathname} to={match.pathname} className='flex items-center hover:text-main'>
                    {breadcrumb}
                    {index !== self.length - 1 && <IoIosArrowForward />}
                </Link>
            )}
        </div>
    )
}

export default Breadcrumb