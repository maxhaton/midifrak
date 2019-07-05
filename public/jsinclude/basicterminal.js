export class TextAreaTerminal {
    constructor(childName, blink) {
        try {
            this.child = document.getElementById(childName);
            this.init(this.rootRunner);
            console.log("Terminal init");
        }
        catch (error) {
            alert("Terminal Initialization failure.");
            console.log(error);
        }
    }
    register(...theList) {
        this.commands.push(...theList);
    }
    blink() {
        //console.log("blink");
    }
    init(set) {
        this.child.style.color = "blue";
        window.setInterval(this.blink, 1000);
        this.child.addEventListener("keypress", this.rootRunner.bind(this));
    }
    commandDispatch(cmd, ...args) {
        return "";
    }
    rootRunner(ev) {
        if (ev.keyCode !== 13) {
            return;
        }
        ev.preventDefault();
        console.log(this.child.value.split("\r\n").map(x => x.split(" ")));
    }
    ;
}
//# sourceMappingURL=basicterminal.js.map