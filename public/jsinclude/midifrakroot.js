import * as WebMidi from "./webmidi.js";
export var MidiFrakRoot;
(function (MidiFrakRoot) {
    function throwIfNotEmpty(err) {
        if (err === "") {
            return;
        }
        else {
            throw err;
        }
    }
    class MidiCommand {
        constructor(dad) {
            this.looksFor = "midi";
            this.midiParent = dad;
        }
        proc(...args) {
            let output = "Invalid argument";
            if (args[0] === "inputs") {
                output = "";
                let inputs = this.midiParent.midiMe.inputs.map(x => output += (" " + x));
            }
            return output;
        }
    }
    class MidiFrak {
        constructor(obj) {
            this.myOutput = obj;
            try {
                WebMidi.default.enable(() => throwIfNotEmpty(this.onInit()));
            }
            catch (e) {
                this.myOutput.writeln("Frak Error " + e);
            }
        }
        onInit() {
            return "";
        }
        getCommands() {
            let commands = [];
            commands.push(new MidiCommand(this));
            return commands;
        }
    }
    MidiFrakRoot.MidiFrak = MidiFrak;
})(MidiFrakRoot || (MidiFrakRoot = {}));
//# sourceMappingURL=midifrakroot.js.map