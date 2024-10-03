import React, { useState, useEffect } from 'react';
import { Table, Tabs, Button, Modal, Form, Input } from 'antd';
import PetAdd from './PetAdd';
import { ApiService } from '../../service/api.service';
import FamilyAdd from './FamilyAdd';
import BreedAdd from './BreedAdd';

const { TabPane } = Tabs;
const apiService = new ApiService();

const FormAddPet = () => {
  const [pets, setPets] = useState([]); // Состояние для хранения списка питомцев
  const [breeds, setBreeds] = useState([]); // Состояние для хранения списка пород
  const [families, setFamilies] = useState([]); // Состояние для хранения списка семейств

  //to do проверка ререндеринга 
  useEffect(() => {
    fetchPet();
    fetchBreed();
    fetchFamily();
  }, []);

  function fetchPet(){
    // Получение списка питомцев с сервера
    apiService.get('/pets')
     .then(data => setPets(data));
  }

  function fetchBreed(){
    // Получение списка пород с сервера
    apiService.get('/breeds')
     .then(data => setBreeds(data));
  }

  function fetchFamily(){
    // Получение списка семейств с сервера
    apiService.get('/families')
     .then(data => setFamilies(data));
  }



  return (
    <>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Питомцы" key="1">
          {/* {renderTable(pets, petColumns)} */}
          <PetAdd pets={pets} breeds={breeds} families={families} fetchPet={fetchPet}/>
        </TabPane>
        <TabPane tab="Породы" key="2">
          <BreedAdd breeds={breeds}  families={families} fetchBreed={fetchBreed}/>
        </TabPane>
        <TabPane tab="Семейства" key="3">
          <FamilyAdd families={families} fetchFamilies={fetchFamily}/>
        </TabPane>
      </Tabs>
    </>
  );
};

export default FormAddPet;
