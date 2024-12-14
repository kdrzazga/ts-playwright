class Streak{
    constructor(value){
        this.value = value;
        this.occurrence = 0;
    }
}

class Compressor {
    constructor(imageWidth){
        this.streaks = [];
        this.width = imageWidth;
    }

    add(element){
        if (this.streaks.length < 1 || this.streaks.length === this.width || this.streaks[this.streaks.length - 1].value != element){
            let s = new Streak(element);
            s.occurrence = 1;
            this.streaks.push(s);
        }
        else {
            this.streaks[this.streaks.length - 1].occurrence++;
        }
    }

    dump(webElement){
        let rowId = 0;
        let i = 0;
        this.streaks.forEach(s => {
            const elem = `<td style="bgcolor=${s.value}" colspan="${s.occurrence}"></td>`;
            webElement.value += elem;//(`${s.value} [${s.occurrence}]`);
            i++;
            if (i% 5 == 0) webElement.value += '<br>';
        });
    }
}

function loadFile(event){

    const file = event.target.files[0];
    let compressor = null;

    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = new Image();
            img.onload = function() {
                canvas.width = img.width;
                canvas.height = img.height;
                compressor = new Compressor(canvas.width);
                ctx.drawImage(img, 0, 0);
                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                const data = imageData.data;

                for (let i = 0; i < data.length; i += 4) {
                    const red = data[i];
                    const green = data[i + 1];
                    const blue = data[i + 2];
                    const alpha = data[i + 3];
                    const index = i / 4;
                    const y = Math.floor(index/canvas.width);
                    const x = index - (y*canvas.width);
                    const htmlValue = rgbToHex(red, green, blue);
                    console.log(`Pixel at index ${index} [${x}, ${y}]: R=${red}, G=${green}, B=${blue}, A=${alpha}, ${htmlValue}`);
                    compressor.add(htmlValue);
                }

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
