import React from 'react';
import './header.css';
import logo from '../../logo.svg'; 
import { BurgerIcon, ListIcon,ProfileIcon, Logo  } from '@ya.praktikum/react-developer-burger-ui-components'

function Header() {
    return (
      <header className="header" style={{gridArea:'header'}}>
        <nav className="navigation">
          <div className="p-2">
          <div className="icon ml-2 mr-2 mt-4 mb-4"><BurgerIcon type="primary" /><div className="ml-2 ">Конструктор</div> </div>
          </div>
          <div className="icon"><ListIcon type="primary" /><div className="ml-2 ">Лента заказов</div></div>          
        </nav>
        <div className="logo"><Logo /></div>
        <nav className="navigation">
          <div className="icon"><ProfileIcon type="secondary" /><div className="ml-2 ">Личный кабинет</div></div>
        </nav>
      </header>
    );
  }

export default Header;