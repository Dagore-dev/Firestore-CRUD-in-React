import { useEffect, useState } from 'react';
import storeDB from '../../firebaseConfig';
import './styles.css'

const Agenda = () => {
    const [users,setUsers] = useState([])


    const getUsers = async () => {
        const { docs } = await storeDB.collection('Agenda').get();
        const usersArray = docs.map(item => ({id:item.id, ...item.data()}));
        setUsers(usersArray);
    }

    useEffect(
        () => getUsers()
    ,[])

    const refresh = (e) => {
        e.preventDefault();
        getUsers();
    }

    const deleteUser = async (e, id) => {
        e.preventDefault()
        try{
            await storeDB.collection('Agenda').doc(id).delete()
                .then(getUsers())
        }
        catch(e){
            console.log(e);
        }
    }

    return(
        <div className='res-container'>
            <h2 className='contactList__title'>Agenda</h2>

            {users.length !== 0 ? 
            
            <ul className='contactList'>
                {users.map(item => <li key={item.id} className='contactList__item'>{item.name} - {item.phone} <button onClick={(e) => deleteUser(e, item.id)} className='contactList__item--delete'>Eliminar</button></li>)}
            </ul>

            : 
            
            <p className='contactList__noList'>No hay contactos en tu agenda</p>}

            <button onClick={(e) => refresh(e)} className='contactList__button'>Actualizar agenda</button>
        </div>
    )
}

export default Agenda;