import React, { useEffect, useState, useRef, useContext } from 'react';
import { Card, Button, message } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import { ApiService } from '../service/api.service';
import { CONTRACT } from '../utils/const';
import { observer } from 'mobx-react-lite';
import { Context } from '../index';

const apiService = new ApiService();

const AdoptionForm = observer(() => {
  const { user } = useContext(Context);
  const userInfo = user.user;
  const { petId } = useParams();
  const navigate = useNavigate();
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const cardRef = useRef(null);

  useEffect(() => {
    fetchPetDetails();
  }, [petId]);

  const fetchPetDetails = async () => {
    setLoading(true);
    try {
      const data = await apiService.get(`/pets/${petId}`);
      setPet(data);
    } catch (error) {
      message.error('Ошибка при загрузке данных питомца!');
    }
    setLoading(false);
  };

  const handleSubmit = async () => {
    try {
      await apiService.post('/contracts', {
        client: userInfo,
        pet: pet,
      });
      
      message.success('Заявка на усыновление успешно отправлена!');
      navigate(CONTRACT);
    } catch (error) {
      // Обработка ошибки и вывод сообщения danger
      message.error(error.message || 'Произошла ошибка при отправке заявки.'); 
    }
  };

  if (loading) return <p>Загрузка...</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>Спасибо, что хотите дать питомцу дом!</h1>
      <p>Пожалуйста, заполните форму ниже, чтобы завершить процесс усыновления.</p>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <Card
          title={pet.name}
          cover={<img alt={pet.name} src={ process.env.REACT_APP_API_URL  + pet.photo || 'placeholder.jpg'} />}
          style={{ width: 300 }}
          ref={cardRef} // Используем ref здесь
        >
          <p>Возраст: {pet.age} лет</p>
          <p>Порода: {pet.breed.name}</p>
          <p>Семейство: {pet.breed.family.name}</p>
          <p>Описание: {pet.appearanceDescription || 'Нет данных'}</p>
        </Card>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <Button type="primary" onClick={handleSubmit}>
          Подтвердить { pet.sex ? 'удочерение' : 'усыновление'}
        </Button>
      </div>
    </div>
  );
});

export default AdoptionForm;
