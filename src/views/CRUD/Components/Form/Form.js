import { useContext } from "react";
import StoreDBContext from '../../Context/index';
import storeDB from '../../../../firebaseConfig';

import './styles.css';

const Form = ( {onNewUser} ) => {
    const {validateName, validatePhone, name, setName, phone, setPhone, errorMsg, setErrorMsg} = useContext(StoreDBContext);

    const setUser = async (e) => {
        e.preventDefault();
        if(validateName(name) === false) setErrorMsg('Introduce un nombre válido');
        else if(validatePhone(phone) === false) setErrorMsg('Introduce un número de teléfono válido');
        else if(validateName(name) === false && validatePhone(phone === false)) setErrorMsg('Revisa los campos del formulario');
        
        else{
            setErrorMsg(null);
            const user = {name:name, phone:phone};
            try{
                await storeDB.collection('Agenda').add(user);
                e.target.reset();
                onNewUser();
            }
            catch(e){
                console.log(e);
            }
        }
    }

    return(
        <div className='form-container'>
            <h2 className='form__title'>Registrar nuevo contacto</h2>
            
            <form onSubmit={(e) => setUser(e)} className='form'>

                <input onChange={(e) => setName(e.target.value)} className='form__field' type='text' placeholder='Introduce el nombre'></input>
                <input onChange={(e) => setPhone(e.target.value)} className='form__field' type='text' placeholder='Introduce el número'></input>

                <input className='form__submit' type='submit' value='Registrar'></input>

            </form>

            {errorMsg !== null ? <p className='form__error'>{errorMsg}</p> : null}
        </div>
    )
}

export default Form;