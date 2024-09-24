import React, { useContext } from 'react';
import { Menu, Button } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { Context } from '../index'; // Импортируем контекст с состоянием пользователя
import { AUTH_URL, PROFILE } from '../utils/const'; // Импортируем константы маршрутов

const NavBar = () => {
  const { user } = useContext(Context); // Достаём информацию о пользователе из контекста
  const navigate = useNavigate();

  // Функция для выхода из системы
  const handleLogout = () => {
    localStorage.removeItem('token'); // Удаляем токен
    user.setIsAuth(false); // Обновляем состояние аутентификации
    navigate(AUTH_URL); // Перенаправляем на страницу авторизации
  };

  return (
    <Menu mode="horizontal" >
      {/* Ссылка на главную страницу */}
      <Menu.Item key="home">
        <Link to="/">Каталог</Link>
      </Menu.Item>

      {/* Показать кнопку "Войти" для неавторизованных пользователей */}
      {!user.isAuth ? (
        <Menu.Item key="login">
          <Link to={AUTH_URL}>
            <Button type="primary">Войти</Button>
          </Link>
        </Menu.Item>
      ) : (
        <>
          {/* Ссылка на профиль для авторизованных пользователей */}
          <Menu.Item key="profile">
            <Link to={PROFILE}>Профиль</Link>
          </Menu.Item>

          {/* Кнопка для выхода */}
          <Menu.Item key="logout">
            <Button type="danger" onClick={handleLogout}>
              Выйти
            </Button>
          </Menu.Item>
        </>
      )}
    </Menu>
  );
};

export default NavBar;
