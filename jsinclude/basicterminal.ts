import {FrakCommand} from "./frakcommand"

export class TextAreaTerminal {
    commandList: string[] = [];
    commandIndex: number = 0;
    child: HTMLTextAreaElement;
    commands: FrakCommand[] = [];
    blinkChar: string;
    constructor(childName: string, blink: Boolean) {
        try {
            this.child = document.getElementById(childName) as HTMLTextAreaElement;
            this.init(blink);
            console.log("Terminal init");
        } catch (error) {
            console.log(error);
        }
    }
    registerShim(set: TextAreaTerminal, toThis: FrakCommand)
    {
        set.commands.push(toThis);
        set.writeln(toThis.looksFor + " Loaded");
        console.log("Successfully loaded command of name:" + toThis.looksFor)
    }
    blink() {
        //console.log("blink");
    }
    init(blink: Boolean) {
        this.child.style.color = "black";
        window.setInterval(() => this.blink(), 1000);
        if(blink) this.child.addEventListener("keydown", this.rootRunner.bind(this));
    }
    writeln(output: string) {
        this.child.value += ("\r\n>" + output + "\r\n>");
        this.child.scrollTop = this.child.scrollHeight;
    }
    rawWrite(output: string) {
        this.child.value += (output);
        this.child.scrollTop = this.child.scrollHeight;
    }
    commandDispatch(cmd: string, args: string[]): string {
        console.log("Command is: " + cmd);
        let matchCommand = this.commands.find(x => x.looksFor === cmd);
        let result = matchCommand.proc(...args);
        return result;
    }
    removeLastLine(): void {
        let dad = this.child.value;
        if(dad.lastIndexOf("\n")>0) {
            this.child.value = dad.substring(0, dad.lastIndexOf("\n"));
        } else {
            this.child.value = dad;
        }
    }
    rootRunner(ev: KeyboardEvent) {    
        console.log(ev.keyCode);
        console.log(this.commandList);
        if (ev.keyCode !== 13) {
            if(ev.keyCode === 38) {
                ev.preventDefault();
                //Up arrow 
                if(this.commandIndex !== this.commandList.length) {
                    this.commandIndex += 1;
                }
                this.removeLastLine();
                this.rawWrite("\n" + this.commandList[this.commandIndex]);
               
            } else if (ev.keyCode === 40) {
                ev.preventDefault();
                //Down arrow
                if(this.commandIndex !== 0) {
                    this.commandIndex -= 1;
                }
                this.removeLastLine();
                this.rawWrite("\n" + this.commandList[this.commandIndex]);              
            }
            return;
        }
        ev.preventDefault();
        
        let lines = this.child.value;
        console.log(lines);
        let lastLine = lines.substr(lines.lastIndexOf("\n")+1);
        if(lastLine == ">") {            
            //alert(lines + " .... " + lastLine);
            console.log(lastLine);
            return;
        }
        //Save the command
        this.commandList.push(lastLine);
        let penWords = lastLine.split(" ");
        let pen = penWords[0];
        
        let commandStr = pen.substring(1, pen.length);
        let commandOutput: string;
        
        try {
            let commandOutput = this.commandDispatch(commandStr, penWords.slice(0, penWords.length));
            this.writeln(commandOutput);
        } catch(e) {
            let jsCommand = lastLine.split(">")[1];
            //console.log(jsCommand);
            let result = eval(jsCommand);
            //console.log(result);
            //let output = "Invalid command"
            
            
            
            this.writeln(result);
            console.log(e);
        }
        
    };

}

