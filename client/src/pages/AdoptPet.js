import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Button, message } from 'antd';
import { ApiService } from '../service/api.service'; 
import { PROFILE } from '../utils/const';

const apiService = new ApiService();

const AdoptionForm = () => {
  const { petId } = useParams();
  const navigate = useNavigate();
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPetDetails();
  }, [petId]);

  const fetchPetDetails = async () => {
    setLoading(true);
    try {
      const data = await apiService.get(`/pets/${petId}`); // Получаем информацию о питомце по ID
      setPet(data);
    } catch (error) {
      message.error('Ошибка при загрузке данных питомца!');
    }
    setLoading(false);
  };

  const handleSubmit = () => {
    // Здесь можно отправить заявку на усыновление
    message.success('Заявка на усыновление успешно отправлена!');
    navigate(PROFILE); // Переход на главную страницу или страницу успеха
  };

  if (loading) return <p>Загрузка...</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>Спасибо, что хотите дать питомцу дом!</h1>
      <p>
        Пожалуйста, заполните форму ниже, чтобы завершить процесс усыновления.
      </p>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <Card
          title={pet.name}
          cover={<img alt={pet.name} src={pet.photo || 'placeholder.jpg'} />} //  URL изображения питомца
          style={{ width: 300 }} // Задайте ширину карточки
        >
          <p>Возраст: {pet.age} лет</p>
          <p>Порода: {pet.breed.name}</p>
          <p>Семейство: {pet.breed.family.name}</p>
          <p>Описание: {pet.appearanceDescription || 'Нет данных'}</p>
        </Card>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <Button type="primary" onClick={handleSubmit}>
          Подтвердить усыновление
        </Button>
      </div>
    </div>
  );
};

export default AdoptionForm;
