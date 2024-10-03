import React, { useEffect, useState } from 'react';
import { Card, Button, Row, Col, message } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import { ApiService } from '../service/api.service'; 

const apiService = new ApiService();

const PetDetails = () => {
  const { id } = useParams(); // Получаем ID питомца из URL
  const [pet, setPet] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Загрузка информации о питомце по ID
    const fetchPet = async () => {
      try {
        const data = await apiService.get(`/pets/${id}`);
        setPet(data);
      } catch (error) {
        message.error('Ошибка при загрузке данных о питомце!');
      }
    };

    fetchPet();
  }, [id]);

  if (!pet) {
    return <p>Загрузка...</p>; // Показать индикатор загрузки, пока данные загружаются
  }

  return (
    <div style={{ padding: '20px' }}>
      <Row gutter={16}>
        <Col span={8}>
          <img src={pet.photo || 'placeholder.jpg'} alt={pet.name} style={{ width: '100%' }} />
        </Col>
        <Col span={16}>
          <Card title={`Информация о питомце: ${pet.name}`}>
            <p><b>Имя:</b> {pet.name}</p>
            <p><b>Возраст:</b> {pet.age} года</p>
            <p><b>Пол:</b> {pet.sex === 0 ? 'Мужской' : 'Женский'}</p>
            <p><b>Описание внешности:</b> {pet.appearanceDescription}</p>
            <p><b>Описание характера:</b> {pet.characterDescription}</p>
            <p><b>Порода:</b> {pet.breed.name}</p>
            <p><b>Семейство:</b> {pet.breed.family.name}</p>
            <p><b>Статус:</b> {pet.adoptionStatus.name}</p>
            
            {/* Кнопка для оформления заявки на питомца, если статус "Ожидает семью" */}
            {pet.adoptionStatus.name === 'Ожидает семью' && (
              <Button type="primary" onClick={() => navigate(`/adopt/${pet.id}`)}>
                Приютить
              </Button>
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default PetDetails;
