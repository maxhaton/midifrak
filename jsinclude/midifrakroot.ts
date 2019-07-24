import * as WebMidi from "./webmidi.js";
import * as BasicTerminal from "./basicterminal";
import * as FrakCommand from "./frakcommand";
export module MidiFrakRoot {
    function throwIfNotEmpty(err: string)
    {
        if(err === "") {
            return;
        } else {
            throw err;
        }  
    }
    class MidiCommand implements FrakCommand.FrakCommand {
        midiParent: MidiFrak;
        looksFor: string = "midi";
        constructor(dad: MidiFrak)
        {
            this.midiParent = dad;
        }
        proc(...args: string[]): string {
            let output = "Invalid argument";
            if(args[0] === "inputs")
            {
                output = "";
                let inputs = this.midiParent.midiMe.inputs.map(x => output += (" " + x));
            }
            return output;
        }
    }
    export class MidiFrak {
        midiMe: WebMidi.WebMidi
        myOutput: BasicTerminal.TextAreaTerminal;
        constructor(obj: BasicTerminal.TextAreaTerminal)
        {
            this.myOutput = obj;
            try {
                WebMidi.default.enable(() => throwIfNotEmpty(this.onInit()));
            } catch(e)
            {
                this.myOutput.writeln("Frak Error " + e);
            }            
        }
        onInit(): string {
            return "";
        }
        getCommands(): FrakCommand.FrakCommand[]
        {
            let commands = [];
            commands.push(new MidiCommand(this));
            return commands;
        }
    } 
    
    
    
}


