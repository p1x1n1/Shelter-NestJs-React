import React, {useContext} from 'react';
import {Route,Routes,Navigate} from 'react-router-dom'
import {authRoutes, publicRoutes} from "../utils/routes";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import { AUTH_URL } from '../utils/const';


const AppRouter = observer(() => {
    const {user}= useContext(Context)
    console.log('user',user.user,'userIsAuth',user.isAuth)
    return (
       <div className='Container'>
            <Routes>
                {user.isAuth && authRoutes.map(({path,Component}) =>
                      <Route key={path} path={path} element={Component} />
                )} 
                {user.isAuth }
                 {publicRoutes.map(({path,Component}) =>
                     <Route key={path} path={path} element={Component} />
                )}
                <Route path="*" element={ <Navigate to={'/'} replace={true} /> } />
            </Routes>
       </div>
    );
});

export default AppRouter;