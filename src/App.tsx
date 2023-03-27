import { ScreenInit } from './screen/ScreenInit';
import { ScreenRegister } from './screen/ScreenRegister';
import { ScreenFiles } from './screen/ScreenFiles';

import { ModalEncryptImg } from './components/ModalEncryptImg';
import { ModalDecryptImg } from './components/ModalDecryptImg';

import "./config.scss";


function App() {


  return (
    <div className="App bg-indigo">
      <div className='container p-3'>
        <ScreenInit/> 
        {/* <ScreenRegister/> */}
        {/* <ScreenFiles/> */}
        {/* <ModalDecryptImg/> */}
        {/* <ModalEncryptImg/> */}
      </div>
    </div>
  );
}

export default App;
