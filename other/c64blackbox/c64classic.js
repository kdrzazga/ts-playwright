class ClassicC64 extends C64Blackbox{
	constructor(){
		super();
		this.clearColor = Globals.colors[14];		
		this.defaultColor = Globals.colors[14];
	}
	
    setupHeaderContent(){
		this.headerLines = [
			{ text: '    **** COMMODORE 64 BASIC V2 ****', color: Globals.colors[14] },
			{ text: '64K RAM SYSTEM   38911  BASIC BYTES FREE', color: Globals.colors[14] },
			{ text: 'READY.', color: Globals.colors[14] }
		];
    }	
}

const c64classic = new ClassicC64();