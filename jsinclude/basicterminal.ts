import "./frakcommand"

export class TextAreaTerminal {
    child: HTMLTextAreaElement;
    commands: FrakCommand[];
    blinkChar: string;
    constructor(childName: string, blink: Boolean) {
        try {
            this.child = document.getElementById(childName) as HTMLTextAreaElement;
            this.init();
            console.log("Terminal init");
        } catch (error) {
            alert("Terminal Initialization failure.")
            console.log(error);
        }
    }
    register(...theList: FrakCommand[]) {
        this.commands.push(...theList);
    }
    blink() {
        //console.log("blink");
    }
    init() {
        this.child.style.color = "blue";
        window.setInterval(() => this.blink(), 1000);
        this.child.addEventListener("keypress", this.rootRunner.bind(this));
    }
    commandDispatch(cmd: string, ...args: string[]): string {
        return "";
    }
    rootRunner(ev: KeyboardEvent) {
        if (ev.keyCode !== 13) {
            return;
        }
        ev.preventDefault();
        console.log(this.child.value.split("\r\n").map(x => x.split(" ")));
        let lines = this.child.value.split("\r\n");
        
    };

}

