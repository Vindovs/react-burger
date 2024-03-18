import { NavLink } from "react-router-dom";
import style from "./profile-menu.module.css";

export const ProfileMenu = () => {
    return (<div className={style.menu}>
        <NavLink to='/profile' end>
            {
                ({ isActive }) => (<div>
                    <p className={`text text_type_main-medium mb-5 ${!isActive && 'text_color_inactive'}`}>Профиль</p>
                </div>)
            }
        </NavLink>
        <p />
        <NavLink to='/profile/orders' >
            {
                ({ isActive }) => (<div>
                    <p className={`text text_type_main-medium mb-5 ${!isActive && 'text_color_inactive'}`}>История заказов</p>
                </div>)
            }
        </NavLink>
        <p />
        <NavLink to='/profile/exit' >
            {
                ({ isActive }) => (<div>
                    <p className={`text text_type_main-medium mb-5 ${!isActive && 'text_color_inactive'}`}>Выход</p>
                </div>)
            }
        </NavLink>
    </div>);
}