import { useContext,} from 'react';
import StoreDBContext from './Context/index';

import Form from './Components/Form/Form';
import Agenda from './Components/Agenda/Agenda';

const CRUD = () => {
    const { getUsers } = useContext(StoreDBContext)
    
    const handleNewUser = () => {
        getUsers();
    }

    return(
        <>
            <Form onNewUser={() => handleNewUser()} />

            <Agenda />
        </>
    )
}

export default CRUD;