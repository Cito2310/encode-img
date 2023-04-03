import { ScreenInit } from './screen/ScreenInit';
import { ScreenRegister } from './screen/ScreenRegister';
import { ScreenFiles } from './screen/ScreenFiles';

import { ModalEncryptImg } from './components/ModalEncryptImg';
import { ModalDecryptImg } from './components/ModalDecryptImg';

import "./config.scss";
import { useEffect, useLayoutEffect, useState } from 'react';
import axios from 'axios';
import { IObjectConfig } from '../types/objectConfig';
import * as bcryptjs from 'bcryptjs';
import { IObjectEncryptsNotCode } from '../types/objectEncrypts';
import { ModalRegister } from './components/ModalRegister';
import { ModalLogin } from './components/ModalLogin';


function App() {
  // GET AND ADD CONFIG0
  const [config, setConfig] = useState<IObjectConfig>({} as IObjectConfig);

  useLayoutEffect(() => {
    window.electronAPI.getConfig().then(data => { if (data) setConfig(data) })
  }, [])

  // // LOGIN ADD PASSWORD
  const [password, setPassword] = useState("");


  // MODAL CONTROLLER
  const [currentModal, setCurrentModal] = useState<"" | "encrypt" | "decrypt" >("");
  const offModal = () => setCurrentModal("");


  // SELECT FILE CONTROLLER
  const [selectFile, setSelectFile] = useState({} as IObjectEncryptsNotCode);

  return (
    <div className="App">
      {
        (!config.password && !password) ? <ModalRegister setPassword={setPassword}/> : 
        
        (!password) ? <ModalLogin setPassword={setPassword}/> :

        <>
        



          { currentModal === "encrypt" && <ModalEncryptImg password={password}/> }
          { currentModal === "decrypt" && <ModalDecryptImg selectFile={selectFile} password={password}/> }
        </>
      }
      </div>
  );
}

export default App;
