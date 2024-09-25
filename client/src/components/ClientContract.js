import React, { useContext, useEffect, useState } from 'react';
import { Table, Input, DatePicker, Space, Modal, Button, Card, message } from 'antd';
import moment from 'moment';
import { ApiService } from '../service/api.service';
import { Context } from '../index';
import { observer } from 'mobx-react-lite'; 

const { Search } = Input;
const apiService = new ApiService();

const ClientContract = observer(() => {
    const [contracts, setContracts] = useState([]);
    const [selectedContract, setSelectedContract] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [searchDate, setSearchDate] = useState(null);
    const { user } = useContext(Context);
    const userInfo = user.user;

    useEffect(() => {
        apiService.get(`/contracts?login=${userInfo.login}`).then((data) => setContracts(data));
    }, []);

    // Определение статуса заявки
    const getStatus = (contract) => {
        if (!contract.signed) return 'Находится в обработке';
        if (contract.signed && !contract.signingDate) return 'Отменена';
        if (contract.signed && contract.signingDate) return 'Одобрена';
    };

    // Открытие модального окна с информацией о питомце
    const showModal = (contract) => {
        setSelectedContract(contract);
        setIsModalVisible(true);
    };

    // Закрытие модального окна
    const handleCancel = () => {
        setIsModalVisible(false);
    };

    // Отмена заявки (изменение signed = true)
    const handleRevoke = async () => {
        try {
            await apiService.patch(`/contracts/${selectedContract.id}`, { signed: true });
            message.success('Заявка успешно отменена.');
            setContracts((prevContracts) => 
                prevContracts.map((contract) =>
                    contract.id === selectedContract.id ? { ...contract, signed: true } : contract
                )
            );
            setIsModalVisible(false);
        } catch (error) {
            message.error('Ошибка при отмене заявки. Попробуйте снова.');
        }
    };

    const columns = [
        {
            title: 'Питомец',
            dataIndex: ['pet', 'name'],
            key: 'pet',
        },
        {
            title: 'Статус заявки',
            key: 'status',
            render: (_, contract) => getStatus(contract),
        },
        {
            title: 'Дата подачи',
            dataIndex: 'submissionDate',
            key: 'submissionDate',
            render: (text) => moment(text).format('YYYY-MM-DD'),
            sorter: (a, b) => moment(a.submissionDate).unix() - moment(b.submissionDate).unix(),
        },
        {
            title: 'Дата завершения',
            dataIndex: 'signingDate',
            key: 'signingDate',
            render: (text) => text ? moment(text).format('YYYY-MM-DD') : '—',
            sorter: (a, b) => moment(a.signingDate).unix() - moment(b.signingDate).unix(),
        }
    ];

    const handleSearch = (value) => {
        setSearchText(value);
    };

    const handleDateChange = (date) => {
        setSearchDate(date);
    };

    const filteredContracts = contracts.filter((contract) => {
        const matchesSearch = contract.pet.name.includes(searchText);

        const matchesDate = searchDate
            ? moment(contract.submissionDate).isSame(searchDate, 'day') || 
              (contract.signingDate && moment(contract.signingDate).isSame(searchDate, 'day'))
            : true;
    
        return matchesSearch && matchesDate;
    });

    return (
        <>
            <Space style={{ marginBottom: 16 }}>
                <Search placeholder="Поиск по питомцу" onSearch={handleSearch} style={{ width: 200 }} />
                <DatePicker onChange={handleDateChange} />
            </Space>
            <Table 
                columns={columns} 
                dataSource={filteredContracts} 
                rowKey="id"
                onRow={(record) => ({
                    onClick: () => showModal(record), // Открытие модального окна при клике на строку
                })}
            />
            
            {selectedContract && (
                <Modal 
                    title={`Информация о питомце: ${selectedContract.pet.name}`} 
                    visible={isModalVisible} 
                    onCancel={handleCancel} 
                    footer={[
                        selectedContract.signed === false && (
                            <Button key="revoke" type="primary" danger onClick={handleRevoke}>
                                Отменить заявку
                            </Button>
                        ),
                        <Button key="cancel" onClick={handleCancel}>
                            Закрыть
                        </Button>,
                    ]}
                >
                    <Card
                        cover={<img alt="example" src={selectedContract.pet.photo} />}
                    >
                        <p><b>Питомец:</b> {selectedContract.pet.name}</p>
                        <p><b>Возраст:</b> {selectedContract.pet.age} года</p>
                        <p><b>Описание внешности:</b> {selectedContract.pet.appearanceDescription}</p>
                        <p><b>Описание характера:</b> {selectedContract.pet.characterDescription}</p>
                        <p><b>Порода:</b> {selectedContract.pet.breed.name}</p>
                        <p><b>Семейство:</b> {selectedContract.pet.breed.family.name}</p>
                        <p><b>Статус заявки:</b> {getStatus(selectedContract)}</p>
                        <p><b>Дата подачи:</b> {moment(selectedContract.submissionDate).format('YYYY-MM-DD')}</p>
                        <p><b>Дата завершения:</b> {selectedContract.signingDate ? moment(selectedContract.signingDate).format('YYYY-MM-DD') : '—'}</p>
                    </Card>
                </Modal>
            )}
        </>
    );
});

export default ClientContract;
