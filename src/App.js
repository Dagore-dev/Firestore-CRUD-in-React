import StoreDBProvider from './views/CRUD/Context/Provider';
import CRUD from './views/CRUD/index';
import './App.css';


function App() {
  return (

    <StoreDBProvider>
      <CRUD />
    </StoreDBProvider>
    
  );
}

export default App;