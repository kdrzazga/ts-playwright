class BrainfuckDebugger{

    constructor(program){
        this.program = program;
        this.memory = [0];
        this.memoryPointer = 0;

    }

    step(){
        const command = this.getCurrentCommand();
        if ('' === command)
            return;

        else if('+' === command){
            this.memory[this.memoryPointer]++;
        }

        else if('-' === command){
            this.memory[this.memoryPointer]--;
        }

        else if('<' === command){
            if(this.memoryPointer > 0){
                this.memoryPointer--;
            }
            else{
                console.warn('Cannot go lower than Memory Cell 0');
            }
        }
    }

    getCurrentCommand(){
        if(this.memoryPointer < this.program.length){
            return program.charAt(this.memoryPointer);
        }
        else{
            console.warn("End of program.");
            return "";
        }
    }

    getMemory(){
        return this.memory;
    }
}

function readProgram(){
    const programTextArea = document.getElementById('program');
    let code = programTextArea.innerText;
    const bfDebugger = new BrainfuckDebugger(code);
    bfDebugger.getCurrentCommand();
}

