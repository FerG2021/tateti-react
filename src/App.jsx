import { useState } from "react";
import { Square } from "./components/Square";
import confetti from "canvas-confetti";
import { TURNS } from "./constants";
import { checkWinner } from "./logic/board";

function App() {
	const [ board, setBoard ] = useState(Array(9).fill(null));
	const [ turn, setTurn ] = useState(TURNS.X);
	const [ winner, setWinner ] = useState(null); // null es que no hay ganador y el false que hay empate

	

	const updateBoard = (index) => {
		if (board[index] || winner) return;

		// actualizar el tablero
		const newBoard = [...board];
		newBoard[index] = turn;
		setBoard(newBoard);
		// cambiar el turno
		const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
		setTurn(newTurn);
		// revisamos si hay un ganador
		const newWinner = checkWinner(newBoard);
		if (newWinner) {
			// LA ACTUALIZACION DEL ESTADO ES ASINCRONO
			setWinner(newWinner);	
			confetti();
			// setWinner((prevWinner) => {
			// 	console.log(`Ganador: ${newWinner}, ganador anterior: ${prevWinner}`);
			// 	return newWinner;
			// });			
		} else if (checkEndGame(newBoard)) {
			setWinner(false);
		}

	}

	const checkEndGame = (newBoard) => {
		return newBoard.every((square) => square !== null);
	}

	const resetGame = () => {
		setBoard(Array(9).fill(null));
		setTurn(TURNS.X);
		setWinner(null);
	}

	return (
		<main className="board">
			<h1>Ta Te Ti</h1>
			<button onClick={resetGame}>
				Reiniciar el juego
			</button>
			<section className="game">
				{
					board.map((square, index) => {
						return (
							<Square 
								key={index}
								index={index}
								updateBoard={updateBoard}
							>
								{ square }	
							</ Square>
						)
					})
				}
			</section>

			<section className="turn">
				<Square isSelected={turn === TURNS.X}>
					{TURNS.X}
				</Square>
				<Square isSelected={turn === TURNS.O}>
					{TURNS.O}
				</Square>
			</section>

			{
				winner !== null && (
					<section className="winner">
						<div className="text">
							<h2>
								{
									winner === false ? 'Empate' : 'Ganó'
								}
							</h2>

							<header className="win">
								{ winner && <Square> { winner } </Square> }
							</header>

							<footer>
								<button onClick={resetGame}>
									Empezar de nuevo
								</button>
							</footer>
						</div>
					</section>
				)
			}
		</main>
	)
}

export default App
