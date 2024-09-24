
import { observer } from 'mobx-react-lite';
import './App.css';
import AppRouter from './components/AppRouter';
import NavBar from './components/NavBar';
import { Context } from '.';
import { useContext, useEffect, useState } from 'react';


const App = observer(()=> {
  const {user} = useContext(Context)
  const [loading, setLoading] = useState(true)

  // if (loading){
  //   return <Spinner animation={"grows"}/>
  // }

  return (
    <>
      <NavBar/>
      <AppRouter/>
    </>
  );
})

export default App;