import { useLayoutEffect, useState } from 'react';

import { ScreenFiles } from './screen/ScreenFiles';

import { ModalRegister, ModalLogin } from './components/';

import { IObjectConfig } from '../types/objectConfig';

import "./config.scss";


function App() {
  // GET AND ADD CONFIG0
  const [config, setConfig] = useState<IObjectConfig>({} as IObjectConfig);

  useLayoutEffect(() => {
    window.electronAPI.getConfig().then(data => { if (data) setConfig(data) })
  }, [])

  // // LOGIN ADD PASSWORD
  const [password, setPassword] = useState("");

  // RETURN 
  return (
    <div className="App">
      {
        (!config.password && !password) ? <ModalRegister setPassword={setPassword}/> : 
        
        (!password) ? <ModalLogin setPassword={setPassword}/> :

        <ScreenFiles password={password}/>
      }
      </div>
  );
}

export default App;
