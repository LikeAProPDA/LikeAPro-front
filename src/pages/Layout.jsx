import { Outlet } from 'react-router-dom';
import CustomNavbar from '../components/common/nav/CustomNavbar';

const Layout = () => {
    return (
        <>
            <CustomNavbar />
            <Outlet />
        </>
    );
};

export default Layout;
