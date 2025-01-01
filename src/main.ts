import './style.css'

import {
    waitForClick,
    waitForRender,
    checkIfWin,
    sleep,
} from "./func";

import { lostGames } from './array';

export {board, squares};

let currentGame: string;
let clickIndex: number;
let playAgain: boolean;
let randomNumber: number;

// skapa spelrutorna

const body = document.querySelector("body") as HTMLBodyElement;
const board = document.createElement("div") as HTMLDivElement;
board.setAttribute("class", "container");
body.appendChild(board);
export default board;

const squares: HTMLDivElement[] = [];
for (let i: number = 0; i < 9; i++) {
    squares[i] = document.createElement("div") as HTMLDivElement;
    squares[i].setAttribute("id", `${i}`);
    squares[i].setAttribute("class", "squares");
    board.appendChild(squares[i]);
    };

// här börjar spelet

const gameLoop = async (): Promise<void>  => {
    do {
        
// töm brädet

currentGame = "";
for (let i: number = 0; i < 9; i++) {
    squares[i].innerHTML = "";
}

while (true) {

// användare väljer ruta


while (true) {
        const clickedSquare = await waitForClick(); // Vänta på att användaren klickar
        clickIndex = Number(clickedSquare.id);
        if (squares[clickIndex].innerHTML === "") {
            break;
        };
    };
    squares[clickIndex].innerHTML = "X";
    currentGame += `X${clickIndex}`;
    
    // har användaren vunnit?
    
    if (checkIfWin() === "X") {
        lostGames.push(currentGame.slice(0, -2));
        console.log(lostGames);
        break;
    }

    // är brädet fullt?

    if (currentGame.length === 18) {
        break;
    }

    // datorn väljer ruta slumpmässigt, kolla om rutan är upptagen, kolla om det draget har lett till förlust tidigare

    while (true) {
    randomNumber = Math.floor(Math.random() * 9);
    if (squares[randomNumber].innerHTML === "X" || squares[randomNumber].innerHTML === "O") {
        continue;
    }
    const testMove: string = currentGame + "O" + randomNumber;
    console.log(testMove);
    if (lostGames.includes(testMove)) {
        continue;
    } else {
        break;
    }
    }

    // rendera!

    await sleep(1000);
    squares[randomNumber].innerHTML = "O";
    currentGame += `O${randomNumber}`;

    // har datorn vunnit?
    
    if (checkIfWin() === "O") {
        break;
    }

    // är brädet fullt?

    if (currentGame.length === 18) {
        break;
    }    
}
    await waitForRender();
    await sleep(500);
playAgain = confirm("Would you care to play again?");
    } while (playAgain);
}

await gameLoop();
console.log("Nu är det slut!");