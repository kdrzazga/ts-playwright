class BrainfuckDebugger{

    constructor(program){
        this.program = program;
        this.memory = [0];
        this.memoryPointer = 0;

    }

    validateCode(){
        let program = this.program;
        const brainfuckKeywords = ['+', '-', '>', '<', '.'];
        brainfuckKeywords.forEach(keyword => program.replace('\\' + keyword + '/g', ''));
        if (program.length < 0){
            const message = 'Error. Invalid keywords.';
            console.error(message);
            window.alert(message);
        }
        return program.length < 0;
    }

    step(){
        if (this.memoryPointer >= this.program.length){
            window.alert('End of program.');
            return;
        }

        this.memoryPointer++;
        const command = this.getCurrentCommand(); ;
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

        else if('>' === command){
            const initialValue = 0;

            if (this.memoryPointer >= this.memory.length) {
                this.memory.push(initialValue);
            }
        }

        else if('.' === command){
            const outputTextarea = document.getElementById('output');
            this.memory.forEach(cell =>{
                outputTextarea.value += String.fromChar(cell);
            });
        }
    }

    getCurrentCommand(){
        if(this.memoryPointer < this.program.length){
            return this.program.charAt(this.memoryPointer);
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
    let programTextAreaCode = programTextArea.value;
    let code = programTextAreaCode.replace(/\s+/g, '');
    const bfDebugger = new BrainfuckDebugger(code);
    bfDebugger.getCurrentCommand();
    return bfDebugger;
}

function updateLabels(){
    if (null == bfDebugger)
        return;

    const pointerLabel = document.getElementById('pointer');
    const commandLabel = document.getElementById('command');

    pointerLabel.innerText = "Pointer: " + bfDebugger.memoryPointer;
    commandLabel.innerText = "Command: " + bfDebugger.getCurrentCommand();
}

document.addEventListener('DOMContentLoaded', (event) => {
    let bfDebugger = null;
});
