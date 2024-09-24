import { observer } from 'mobx-react-lite';
import './App.css';
import AppRouter from './components/AppRouter';
import NavBar from './components/NavBar';
import { Context } from './index';
import { useContext, useEffect, useState } from 'react';
import { Spin } from 'antd';

const App = observer(() => {
  const { user } = useContext(Context);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUserSession = async () => {
      await user.checkSession(); // Ждём завершения проверки сессии
      setLoading(false); // Устанавливаем загрузку в false после завершения
    };
    const token = localStorage.getItem('token');
        if (token) {
          checkUserSession(); 
        }
        else{
          setLoading(false);
        }
  }, [user]); // Зависимость от user, чтобы следить за изменениями контекста

  // Если идёт загрузка, показываем спиннер
  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Spin size="large" />
      </div>
    );
  }

  // Основной контент рендерится после завершения загрузки
  return (
    <>
      <NavBar />
      <AppRouter />
    </>
  );
});

export default App;
