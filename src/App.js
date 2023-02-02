import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard/Dashboard';
import Companies from './components/Companies/Companies';
import Phones from './components/Phones/Phones';
import Logout from './components/containers/Logout/Logout';



const App = () => {
  return (
    <BrowserRouter>
        
      <Routes>
        <Route index path="/" element={<Login/>} />
        <Route path='/dashboard' element={<Dashboard/>} />
        <Route path='/companies' element={<Companies/>} />
        <Route path='/phones' element={<Phones/>} />
        <Route path='/logout' element={<Logout/>} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;