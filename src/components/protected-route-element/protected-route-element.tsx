import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { FC } from "react";

interface IProtectedRouteElement{
    noAuth?: boolean;
    component: any;
}

export const ProtectedRouteElement : FC<IProtectedRouteElement> = ({ noAuth = false, component }) => {
// @ts-ignore
    const user = useSelector(store => store.user.user);    
    const location = useLocation();

    if (!noAuth && !user) {
        return (<Navigate to='/login' state={{ from: location }} replace />);
    }
    if (noAuth && user) {
        const { from } = location.state || { from: { pathname: "/" } }

        return (<Navigate to={from} />);
    }

    return component;
}
