
import './App.css';

import Pages from './components/pages/Pages';
import emailjs from '@emailjs/browser';
emailjs.init('oussama mouatamid');

function App() {
  return (
    <>
   
      <Pages />
    </>
  );
}

export default App;
