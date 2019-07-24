import {TextAreaTerminal} from "../jsinclude/basicterminal.js"
import {printTime} from "../jsinclude/frakcommand.js"
import  {MidiFrakRoot} from "../jsinclude/midifrakroot.js"
let x: TextAreaTerminal;
try {
    x = new TextAreaTerminal("terminal", true);
    console.log()
    x.registerShim(x, new printTime);
} catch(d) {
    console.log(d);
}

let mf = new MidiFrakRoot.MidiFrak(x);

mf.getCommands().map(y => x.registerShim(x, y));