import React, { useContext, useEffect, useState } from 'react';
import { Button, Card, message } from 'antd';
import { ApiService } from '../service/api.service'; // Ваш класс для работы с API
import { Context } from '../index';

const apiService = new ApiService();

const ProfilePage = () => {
  const {user} = useContext(Context);
  const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const response = await apiService.get('/auth/profile', {
//           headers: { Authorization: `Bearer ${token}` }
//         });
//         setUser(response);
//       } catch (error) {
//         message.error('Ошибка при получении данных пользователя!');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUser();
//   }, []);

  const handleAddPet = () => {
    // Логика для добавления питомца
    message.info('Форма добавления питомца открыта!');
  };

  const handleCheckApplications = () => {
    // Логика для проверки заявок
    message.info('Проверка заявок открыта!');
  };

  if (loading) return <div>Загрузка...</div>;

  return (
    <Card style={{ maxWidth: 400, margin: 'auto', marginTop: '100px' }}>
      {console.log('user',user)}
      <h2>Профиль пользователя</h2>
      <p>Имя: {user.name}</p>
      <p>Фамилия: {user.lastname}</p>
      <p>Отчество: {user.surname}</p>
      <p>Email: {user.email}</p>
      <p>Телефон: {user.phone}</p>

      {user.post ? (
        <Button type="primary" onClick={handleAddPet} style={{ marginRight: '10px' }}>
          Добавить питомца
        </Button>
      ) : null}

      <Button type="default" onClick={handleCheckApplications}>
        Проверить заявки
      </Button>
    </Card>
  );
};

export default ProfilePage;
