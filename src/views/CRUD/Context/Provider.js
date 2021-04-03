import StoreDBContext from './index';
import { useState } from 'react';
import storeDB from '../../../firebaseConfig';

const StoreDBProvider = ( { children,  } ) => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [errorMsg, setErrorMsg] = useState(null);
    const [users,setUsers] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [updatingUser, setUpdatingUser] = useState('');

    const validateName = (value) =>{
        const firstNameRegex = /^[ a-zA-ZàèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ'`'-]+$/
    
        if(firstNameRegex.test(value)) return true;
        else return false;
    }

    const validatePhone = (value) =>{
        const phoneRegex = /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/g
    
        if(phoneRegex.test(value)) return true;
        else return false;
    }
    
    const getUsers = async () => {
        const { docs } = await storeDB.collection('Agenda').get();
        const usersArray = docs.map(item => ({id:item.id, ...item.data()}));
        setUsers(usersArray);
    }


    const deleteUser = async (e, id) => {
        e.preventDefault();
        try{
            await storeDB.collection('Agenda').doc(id).delete()
                .then(getUsers());
        }
        catch(e){
            console.log(e);
        }
    }

    const updateUser = async (e, id) => {
        e.preventDefault();
        try{
            const res = await (await storeDB.collection('Agenda').doc(id).get()).data();
            setUpdatingUser({id: id, ...res});
            setEditMode(true);
        }
        catch(e){
            Promise.reject(e);
        }
    }

    return(
        <StoreDBContext.Provider value={ { validateName, validatePhone, getUsers, deleteUser, updateUser, name, setName, phone, setPhone, errorMsg, setErrorMsg, users, setUsers, editMode, setEditMode, updatingUser, setUpdatingUser} }>
            {children}
        </StoreDBContext.Provider>
    )
}

export default StoreDBProvider;