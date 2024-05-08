default class Klasa{

	private pole1: number;
	private info: string;
	
	constructor(private p1: number){
		this.pole1 = p1;
		this.info = 'When you use export default before a class declaration, it means that this class is the main export of the current module. This allows you to import it without using curly braces in the importing module.';
	}
	
	print(){
		console.log(this.pole1);
		console.log(this.info);
	}
}

const c1 = new Klasa(1981);
c1.print();
