
import { Context } from '../index';
import { observer } from 'mobx-react-lite'; 
import AdminContract from '../components/Contract/AdminContract';
import ClientContract from '../components/Contract/ClientContract';
import React, {useContext } from 'react';


const Contract = observer(() => {
    const { user } = useContext(Context);
    const userInfo = user.user;

    return(
        <>
          {
            userInfo ?
                userInfo.post ? 
                <AdminContract/>
                :
                <ClientContract/>
            : null
          }
        </>
    )
}
);

export default Contract;