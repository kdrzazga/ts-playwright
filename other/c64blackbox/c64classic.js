class ClassicC64 extends C64Blackbox{
	static backgroundColor = Globals.colors[6];
    static secondaryBackgroundColor = Globals.colors[6];
	
	constructor(){
		super();
		this.clearColor = Globals.colors[14];		
		this.defaultColor = Globals.colors[14];
		this.backgroundColor = Globals.colors[6];
		
		this.classRef = ClassicC64;
	}
	
    setupHeaderContent(){
		this.headerLines = [
			{ text: '    **** COMMODORE 64 BASIC V2 ****', color: Globals.colors[14] },
			{ text: '64K RAM SYSTEM   38911  BASIC BYTES FREE', color: Globals.colors[14] },
			{ text: 'READY.', color: Globals.colors[14] }
		];
    }

    setupHelpContent(){
        super.setupHelpContent();
        this.helpTexts[6] = ['', 0];
    }

    handleF2() {
         console.log('2 or F2 was pressed');
         this.softReset(Globals.colors[6]);
     }

     handleF7(){
        console.log('F7 pressed. However BRUCE game looks bad on blue screen. Not running it.');
     }
}

const c64classic = new ClassicC64();
