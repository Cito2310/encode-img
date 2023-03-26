import { menuMain, pause, encodeMenu, decodeMenu } from './menus';

export type TStatusApp = "menuMain" | "exit" | "decodeMenu" | "encodeMenu"

const main = async () => {
    console.clear();
  
    let statusApp: TStatusApp = "menuMain";
    do {
        console.clear();
        statusApp = await menuMain();
  
        switch (statusApp) {
            // MENU ENCODE
            case "encodeMenu": await encodeMenu(); break;

            // MENU DECODE
            case "decodeMenu": await decodeMenu(); break;
        }

      if (statusApp !== "exit" ) await pause();
    } while (statusApp !== 'exit');
  };
  
  main();