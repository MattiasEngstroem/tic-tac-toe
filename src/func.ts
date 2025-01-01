import {board, squares} from "./main";



// Funktion som väntar på att användaren klickar på en ruta
export const waitForClick = (): Promise<HTMLDivElement> => {
    return new Promise((resolve) => {
        const handleClick = (event: Event) => {
            const target = event.target as HTMLDivElement;

            // Kontrollera att det är en giltig ruta som klickats på
            if (target && target.classList.contains("squares")) {
                resolve(target); // Lös promiset med det klickade elementet
            }
        };

        board.addEventListener("click", handleClick); // Lägg till event-lyssnaren
    });
}


// Funktion som väntar på nästa rendering
export const waitForRender = (): Promise<void> => new Promise((resolve) => setTimeout(resolve, 0));

// kolla om vi har en vinnare och returnera vinnaren i så fall, annars returnera "-"
export const checkIfWin = (): string | undefined => {
    const winCheck: string[] = [
        squares[0].innerHTML + squares[1].innerHTML + squares[2].innerHTML,
        squares[3].innerHTML + squares[4].innerHTML + squares[5].innerHTML,
        squares[6].innerHTML + squares[7].innerHTML + squares[8].innerHTML,
        squares[0].innerHTML + squares[3].innerHTML + squares[6].innerHTML,
        squares[1].innerHTML + squares[4].innerHTML + squares[7].innerHTML,
        squares[2].innerHTML + squares[5].innerHTML + squares[8].innerHTML,
        squares[0].innerHTML + squares[4].innerHTML + squares[8].innerHTML,
        squares[2].innerHTML + squares[4].innerHTML + squares[6].innerHTML,
    ];
    if (winCheck.includes("XXX")) {
        return "X";
    } else if (winCheck.includes("OOO")) {
        return "O";
    } else {
        return "-";
    }
}

// lägg in en fördröjning i programmet

export const sleep = (ms: number): Promise<void> => {
    return new Promise((resolve) => setTimeout(resolve, ms));
}