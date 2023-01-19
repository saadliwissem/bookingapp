
import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Hotel } from './pages/Hotel';
import { Hotels } from './pages/Hotels';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}>

      </Route>
      <Route path='/Hotel/:id' element={<Hotel/>}>

      </Route>
      
      <Route path='/Hotels' element={<Hotels/>}>

      </Route>
    </Routes>
    </BrowserRouter>

  );
}

export default App;
