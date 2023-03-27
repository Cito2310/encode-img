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


function App() {
  // GET AND ADD CONFIG0
  const [config, setConfig] = useState<IObjectConfig>({} as IObjectConfig);

  useLayoutEffect(() => {
    window.electronAPI.getConfig().then(data => { if (data) setConfig(data) })
  }, [])


  // LOGIN ADD PASSWORD
  const [password, setPassword] = useState("");
  const [errorLogin, setErrorLogin] = useState("");

  const onLogin = (event: React.FormEvent<HTMLFormElement>, newPassword: string) => {
    event.preventDefault();

    const comparePassword = bcryptjs.compareSync(newPassword, config.password);
    if (comparePassword) return setPassword(newPassword);
    setErrorLogin("Contraseña invalida");
  }



  return (
    <div className="App bg-indigo">
      <div className='container p-3'>
        {
          Object.keys(config).length === 0 ?
            <ScreenInit setConfig={setConfig}/> 
          :
          <>
            {
              !password 
              ? <ScreenRegister errorLogin={errorLogin} onLogin={onLogin}/>
              : <ScreenFiles/>
            }
          </>
        }

        <ModalDecryptImg/>
        <ModalEncryptImg/>

      </div>
    </div>
  );
}

export default App;
