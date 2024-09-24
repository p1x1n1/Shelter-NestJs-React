import React, { useState, useEffect } from 'react';
import { Tabs, Select, Card, Button, Row, Col, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ApiService } from '../service/api.service'; 

const { TabPane } = Tabs;
const { Option } = Select;

const apiService = new ApiService();

const PetsCatalog = () => {
  const navigate = useNavigate();
  const [pets, setPets] = useState([]);
  const [families, setFamilies] = useState([]);
  const [selectedFamily, setSelectedFamily] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchPets();
    fetchFamilies();
  }, []);

  const fetchPets = async () => {
    setIsLoading(true);
    try {
      const data = await apiService.get('/pets');
      setPets(data);
    } catch (error) {
      message.error('Ошибка при загрузке питомцев!');
    }
    setIsLoading(false);
  };

  const fetchFamilies = async () => {
    try {
      const data = await apiService.get('/families');
      setFamilies(data);
    } catch (error) {
      message.error('Ошибка при загрузке семейств!');
    }
  };

  const handleFamilyChange = (value) => {
    setSelectedFamily(value);
  };

  const handleAdopt = (pet) => {
   navigate(`/adopt/${pet.id}`); // Переход на страницу оформления заявки с ID питомца
  };

  const filteredPets = pets.filter((pet) =>
    selectedFamily ? pet.breed.family.id === selectedFamily : true
  );

  const renderPetCard = (pet) => (
    <Col span={8} key={pet.id}>
      <Card title={pet.name} bordered={false} style={{ marginBottom: 16 }}>
        <p>Возраст: {pet.age} лет</p>
        <p>Порода: {pet.breed.name}</p>
        <p>Семейство: {pet.breed.family.name}</p>
        {pet.adoptionStatus.name === 'Ожидает семью' && (
          <Button type="primary" onClick={() => handleAdopt(pet)}>
            Забрать домой
          </Button>
        )}
      </Card>
    </Col>
  );

  return (
    <div style={{ padding: '20px' }}>
      <h1>Каталог питомцев</h1>
      <Select
        placeholder="Фильтровать по семейству"
        style={{ width: 200, marginBottom: 20 }}
        onChange={handleFamilyChange}
        allowClear
      >
        {families.map(family => (
          <Option key={family.id} value={family.id}>
            {family.name}
          </Option>
        ))}
      </Select>

      <Tabs defaultActiveKey="1">
        <TabPane tab="Забронированы" key="1">
          <Row gutter={16}>
            {filteredPets
              .filter((pet) => pet.adoptionStatus.name === 'Забронирован')
              .map(renderPetCard)}
          </Row>
        </TabPane>
        <TabPane tab="Ожидают семью" key="2">
          <Row gutter={16}>
            {filteredPets
              .filter((pet) => pet.adoptionStatus.name === 'Ожидает семью')
              .map(renderPetCard)}
          </Row>
        </TabPane>
        <TabPane tab="Забраны домой" key="3">
          <Row gutter={16}>
            {filteredPets
              .filter((pet) => pet.adoptionStatus.name === 'Забран домой')
              .map(renderPetCard)}
          </Row>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default PetsCatalog;
