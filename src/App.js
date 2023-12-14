import logo from './logo.svg';
import './App.css';
import Routing from './router/Routing';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
    <Toaster/>
      <Routing/>
    </>
  );
}

export default App;
