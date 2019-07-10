import { TextAreaTerminal } from "../jsinclude/basicterminal.js";
import { printTime } from "../jsinclude/frakcommand.js";
let x;
try {
    x = new TextAreaTerminal("terminal", true);
    console.log();
    x.registerShim(x, new printTime);
}
catch (d) {
    console.log(d);
}
console.log(x.commands);
console.log("This is just a test");
//# sourceMappingURL=newdesign.js.map