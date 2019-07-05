import {TextAreaTerminal} from "./basicterminal"

export interface FrakCommand {
    looksFor: string;
    proc(...args: string[]): string;
}
abstract class PriorityCommand implements  FrakCommand {
    abstract looksFor: string;
    abstract proc(...args: string[]): string;
    parent: TextAreaTerminal;
    constructor(pop: TextAreaTerminal)
    {
        this.parent = pop;
    }
}