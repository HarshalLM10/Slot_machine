const prompt = require("prompt-sync")();

const ROWS = 3;
const COLS = 3;

const SYMBOL_COUNT = {
    A: 2,
    B: 4,
    C: 6,
    D: 8
};

const SYMBOL_VALUES = {
    A: 5,
    B: 4,
    C: 3,
    D: 2
};

const deposite = () => {
    while (true) {
        const depositeamount = prompt("Enter the Deposite amount: ");
        const numberdepositeamount = parseFloat(depositeamount);

        if (isNaN(numberdepositeamount) || numberdepositeamount <= 0) {
            console.log("Invalid deposite amount. Try again.");
        } else {
            return numberdepositeamount;
        }
    }
};

const getnumberoflines = () => {
    while (true) {
        const lines = prompt("Enter the Number of lines to bet on (1-3): ");
        const numberoflines = parseFloat(lines);

        if (isNaN(numberoflines) || numberoflines <= 0 || numberoflines > 3) {
            console.log("Invalid number of lines. Try again.");
        } else {
            return numberoflines;
        }
    }
};

const getbet = (balance, lines) => {
    while (true) {
        const bet = prompt("Enter the bet per line: ");
        const numberbet = parseFloat(bet);

        if (isNaN(numberbet) || numberbet <= 0 || numberbet > balance / lines) {
            console.log("Invalid bet. Try again.");
        } else {
            return numberbet;
        }
    }
};

const spin = () => {
    const symbols = [];
    for (const [symbol, count] of Object.entries(SYMBOL_COUNT)) {
        for (let i = 0; i < count; i++) {
            symbols.push(symbol);
        }
    }

    const reels = [];
    for (let i = 0; i < COLS; i++) {
        reels.push([]);
        const reelsymbols = [...symbols];
        for (let j = 0; j < ROWS; j++) {
            const randomindex = Math.floor(Math.random() * reelsymbols.length);
            const selectedsymbol = reelsymbols[randomindex];
            reels[i].push(selectedsymbol);
            reelsymbols.splice(randomindex, 1);
        }
    }
    return reels;
};

const tranpose = (reels) => {
    const rows = [];
    for (let i = 0; i < ROWS; i++) {
        rows.push([]);
        for (let j = 0; j < COLS; j++) {
            rows[i].push(reels[j][i]);
        }
    }
    return rows;
};

const printrows = (rows) => {
    for(const row of rows ){
        let rowstring = "";
        for(const [i,symbol] of row.entries()){
            rowstring += symbol
            if(i != row.length-1){
                rowstring += " | "
            }
        }
        console.log(rowstring);
    }
}

const getwinning = (rows , bet , lines) => {
    let winning = 0;
    for (let row = 0 ; row < lines ; row++){  // check onn how many lines the bet is placed 
        const symbols = rows[row];
        let allsame = true;
        for (const symbol of symbols ){
            if (symbol != symbols[0]){  // check if the all the symbols are same in the rows
                allsame = false;
                break;
            }
        }

        if (allsame){
            winning += bet * SYMBOL_VALUES[symbols[0]]
        }
    }
    return winning;
}

const game = () => {
    let balance = deposite();


    while(true){
        console.log("You have a balance of "+ balance);
        const numberoflines = getnumberoflines();
        const bet = getbet(balance, numberoflines);
        balance -= bet * numberoflines;
        const reels = spin();
        const rows = tranpose(reels);
        printrows(rows);
        const winnings = getwinning(rows , bet , numberoflines);
        balance += winnings;
        console.log("YOU WON " + winnings.toString());

        if(balance <= 0 ){
            console.log("You ran out of money!!");
            break
        }
        
        const playagain = prompt("Do you want to play again (y/n)? ")

        if (playagain != "y") break;
    }
}

game();

