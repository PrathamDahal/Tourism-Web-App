import { BrowserRouter } from 'react-router-dom';
import './App.css';
import MainRoute from './Route/mainRoute';

function App() {
  return (
    <BrowserRouter>
      <MainRoute />
    </BrowserRouter>
  );
}

export default App;
