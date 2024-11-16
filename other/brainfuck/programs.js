class ProgramObjectPool{

    constructor(){
      this.programs = {
        '1':{
            'description': 'HELLO',
            'code': '+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++.>+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++.'
                 + '>++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++.'
                 + '>++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++.'
                 + '>+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++.'
            },
        '2':{
            'description': 'HELLO2',
            'code': '-+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++.>+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++.'
                 + '>++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++.'
                 + '>++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++.'
                 + '>+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++.'
            }
      }
    }

    getProgram(index){
        let correctIndex = index % this.programs.length;
        return this.programs[correctIndex];
    }

}

function populatePredefinedProgramsSelect(){

    const pool = new ProgramObjectPool();
    const keys = Object.keys(pool.programs);

    let predefinedProgramsSelect = document.getElementById('predefined-programs');
    var i = 1;

    keys.forEach(k => {
        var option = document.createElement("option");
        option.value = pool.programs[k].description;
        option.textContent = pool.programs[k].description;
        predefinedProgramsSelect.appendChild(option);
    });
}

document.addEventListener('DOMContentLoaded', (event) => {
    populatePredefinedProgramsSelect();
});
