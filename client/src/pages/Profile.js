import React, { useContext, useEffect, useState } from 'react';
import { Button, Card, message, Spin } from 'antd';
import { ApiService } from '../service/api.service'; // Ваш класс для работы с API
import { Context } from '../index';
import { observer } from 'mobx-react-lite'; // Импортируем observer
import { useNavigate } from 'react-router-dom';
import { CONTRACT } from '../utils/const';

const apiService = new ApiService();

const ProfilePage = observer(() => { // Оборачиваем компонент в observer
  const { user } = useContext(Context);
  const userInfo = user.user;
  const navigate = useNavigate();

  const handleAddPet = () => {
    message.info('Форма добавления питомца открыта!');
  };

  const handleCheckApplications = () => {
    message.info('Проверка заявок открыта!');
    navigate(CONTRACT);
  };


  return (
    <Card style={{ maxWidth: 400, margin: 'auto', marginTop: '100px' }}>
      {console.log('user', user)}
      {console.log('userInfo', userInfo)}
      <h2>Профиль пользователя</h2>
      <p>Имя: {userInfo?.name}</p> {/* Используем userInfo, добавляем проверку, чтобы избежать ошибок */}
      <p>Фамилия: {userInfo?.lastname}</p>
      <p>Отчество: {userInfo?.surname}</p>
      <p>Email: {userInfo?.email}</p>
      <p>Телефон: {userInfo?.phone}</p>


      {userInfo && userInfo.post ? (
        <Button type="primary" onClick={handleAddPet} style={{ marginRight: '10px' }}>
          Добавить питомца
        </Button>
      ) : null}

      <Button type="default" onClick={handleCheckApplications}>
        Проверить {userInfo && userInfo.post ? "" : "свои"} заявки на нового члена семьи
      </Button>
    </Card>
  );
});

export default ProfilePage;
