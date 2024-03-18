import './header.css';
import { BurgerIcon, ListIcon, ProfileIcon, Logo } from '@ya.praktikum/react-developer-burger-ui-components'
import { NavLink, Link} from 'react-router-dom';
import { useSelector } from 'react-redux';

function Header() {
  const {user} =  useSelector(( store: any) => store.user);

  return (
    <header className="header" style={{ gridArea: 'header' }}>
      <nav className="navigation">
      <NavLink to='/' className="icon ml-2 mr-2 mt-4 mb-4">
                        {
                            ({isActive}) => (<>
                                <BurgerIcon type={ !isActive ? "secondary" : "primary"}/>
                                <p className={`text text_type_main-default ${!isActive && 'text_color_inactive'} ml-2`}>Конструктор</p>
                            </>

                            )}
                        
                    </NavLink>
        <a href="#" className="icon">
          <ListIcon type="primary" />
          <div className="ml-2">Лента заказов</div>
        </a>        
      </nav>

      <div className="logo">
        <NavLink to='/'>
          <Logo />
        </NavLink>
      </div>

      <NavLink to="/profile" className="navigation">
      {
        ({isActive}) => (<>
        <ProfileIcon type={ !isActive ? "secondary" : "primary"}/>
        <div className="ml-2">Личный кабинет</div>
        </>
        )
      }
      </NavLink>
    </header>
  );
}

export default Header;