import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./pages/Home"
import StockOverview from './pages/StockOverview'
import { useGlobalContext } from './context'
import 'bootstrap/dist/css/bootstrap.min.css';



const App = () => {

  return (
    <Router>
      <Routes>
        <Route path='/' element={
          <Home />
        }>
        </Route>
        <Route path='/overview/:symbol' element={<StockOverview />}>
        </Route>
      </Routes>
    </Router>
  );
};
export default App








