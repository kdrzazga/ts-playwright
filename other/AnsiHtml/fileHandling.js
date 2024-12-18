class Streak {
    constructor(value) {
        this.value = value;
        this.occurrence = 0;
    }
}

class Compressor {
    constructor(imageWidth) {
        this.streaks = [];
        this.width = imageWidth;
    }

    add(element) {
        if (this.streaks.length === 0 ||
            this.streaks.length === this.width ||
            this.streaks[this.streaks.length - 1].value !== element) {
            let s = new Streak(element);
            s.occurrence = 1;
            this.streaks.push(s);
        } else {
            this.streaks[this.streaks.length - 1].occurrence++;
        }
    }

    generateRow(streak, currentColSpan, rowId) {
        let output = '';

        if (currentColSpan === 0) {
            output += `<tr id="r${rowId}">`;
        }

        output += this.generateCell(streak);
        currentColSpan += streak.occurrence;

        let rowComplete = false;
        if (currentColSpan >= this.width) {
            output += `</tr>\n`;
            console.log(`Row ${rowId} colSpan = ${currentColSpan}`);
            rowComplete = true;
            currentColSpan = 0;
        }

        return { output, currentColSpan, rowComplete };
    }

    generateCell(streak) {
       let cell = `<td style="background-color: ${streak.value};" `;
       if (streak.occurrence > 1) cell += `colspan="${streak.occurrence}"`;
       cell += `>&nbsp;</td>`;
       return cell;
   }


 processImageData(data) {
    for (let i = 0; i < data.length; i += 4) {
        const red = data[i];
        const green = data[i + 1];
        const blue = data[i + 2];
        const alpha = data[i + 3];
        const index = i / 4;
        const y = Math.floor(index / this.width);
        const x = index - (y * this.width);
        const htmlValue = rgbToHex(red, green, blue);
        console.log(`Pixel at index ${index} [${x}, ${y}]: R=${red}, G=${green}, B=${blue}, A=${alpha}, ${htmlValue}`);
        this.add(htmlValue);
    }
}

    dump(textarea) {
        let output = '<table class="table5">\n';
        let rowId = 1;
        let currentColSpan = 0;

        this.streaks.forEach(s => {
            const result = this.generateRow(s, currentColSpan, rowId);
            output += result.output;
            currentColSpan = result.currentColSpan;

            if (result.rowComplete) {
                rowId++;
            }
        });

        if (currentColSpan > 0) {
            output += `</tr>\n`;
        }

        output += '</table>';
        textarea.value = output;
    }
}

class Filler extends Compressor{
    constructor(imageWidth, filament){
        super(imageWidth);
        this.filament = filament;
    }

    generateCell(streak) {
       let cell = `<td style="color: ${streak.value};" `;
       if (streak.occurrence > 1) cell += `colspan="${streak.occurrence}"`;
       const content = this.filament.repeat(streak.occurrence);
       cell += `>${content}</td>`;
       return cell;
    }
}

function chooseFile4Compressor(event){
    const file = event.target.files[0];
    loadFile('compressor', file);
}

function chooseFile4Filler(event){
    const file = event.target.files[0];
    loadFile('filler', file);
}

function loadFile(compressorType, file){
    let compressor = null;

    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = new Image();
            img.onload = function() {
                canvas.width = img.width;
                canvas.height = img.height;
                compressor = compressorType === 'compressor' ? new Compressor(canvas.width) : new Filler(canvas.width, '&#178;');
                ctx.drawImage(img, 0, 0);
                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                const data = imageData.data;

                compressor.processImageData(data);

                const outputTextArea = document.getElementById('output');
                compressor.dump(outputTextArea);
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);

    }
}

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
