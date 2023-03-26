import { ScreenInit } from './screen/ScreenInit';
import "./config.scss"
import { ScreenRegister } from './screen/ScreenRegister';
import { ScreenFiles } from './screen/ScreenFiles';


function App() {
  const onClickBasicIpcOn = () => {
    window.electronAPI.basicOnIpc("hello world")
  }

  const onClickBasicIpcHandle = async() => {
    console.log(await window.electronAPI.basicHandleIpc("hello world"))
  }

  return (
    <div className="App bg-indigo">
      <div className='container p-3'>
        {/* <ScreenInit/>  */}
        {/* <ScreenRegister/> */}
        <ScreenFiles/>
      </div>
      {/* <button onClick={onClickBasicIpcOn}>test basic ipc on</button>
      <button onClick={onClickBasicIpcHandle}>test basic ipc handle</button> */}
    </div>
  );
}

export default App;