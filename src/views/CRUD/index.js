import { useState } from 'react';
import storeDB from '../../firebaseConfig';

import Form from './Components/Form/Form';
import Agenda from './Components/Agenda/Agenda';

const CRUD = () => {
    const [users,setUsers] = useState([])

    const getUsers = async () => {
            const { docs } = await storeDB.collection('Agenda').get();
            const usersArray = docs.map(item => ({id:item.id, ...item.data()}));
            setUsers(usersArray);
        }
    
    const handleNewUser = () => {
        getUsers();
    }

    return(
        <>
            <Form onNewUser={() => handleNewUser()} />

            <Agenda users={users} getUsers={() =>getUsers()}  />
        </>
    )
}

export default CRUD;