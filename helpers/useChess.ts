import { useRef, useState } from "react"
import { COLORS, FIGURES } from "../constants/figures";
import { isValidBishopMove, isValidKingMove, isValidKnightMove, isValidPawnMove, isValidQueenMove, isValidRookMove } from "./validationFunctions";
import { findFigureByPosition } from "./findFigureByPosition";
import { generateRandomString } from "./generateRandomString";
import { usePlaySound } from "./usePlaySound";

export const useChess = () => {

    const { playKillSound, moveSound, resetSound, winSound, stopSound } = usePlaySound()
    
    const initialBoardSetup = (): Piece[] => {
        const pieces: Piece[] = [];
        
        for (let col = 0; col < 8; col++) {
            pieces.push({ type: FIGURES.PAWN, color: COLORS.WHITE, position: { row: 6, col }, id: generateRandomString() });
            pieces.push({ type: FIGURES.PAWN, color: COLORS.BLACK, position: { row: 1, col }, id: generateRandomString() });
        }
        
        const whiteBackRow: PieceType[] = [FIGURES.ROOK, FIGURES.HORSE, FIGURES.BISHOP, FIGURES.QUEEN, FIGURES.KING, FIGURES.BISHOP, FIGURES.HORSE, FIGURES.ROOK];
        whiteBackRow.forEach((type, col) => {
            pieces.push({ type, color: COLORS.WHITE, position: { row: 7, col }, id: generateRandomString() });
        });
        
        const blackBackRow: PieceType[] = [FIGURES.ROOK, FIGURES.HORSE, FIGURES.BISHOP, FIGURES.QUEEN, FIGURES.KING, FIGURES.BISHOP, FIGURES.HORSE, FIGURES.ROOK];
        blackBackRow.forEach((type, col) => {
            pieces.push({ type, color: COLORS.BLACK, position: { row: 0, col }, id: generateRandomString() });
        });
        
        return pieces;
    };

    const isValidMove = (
        piece: Piece,
        targetPosition: Position,
        board: Piece[]
      ): boolean => {
        if (piece.position.row === targetPosition.row && piece.position.col === targetPosition.col) return false;
      
        switch (piece.type) {
          case FIGURES.PAWN:
            return isValidPawnMove(piece, targetPosition, board);
          case FIGURES.HORSE:
            return isValidKnightMove(piece, targetPosition);
          case FIGURES.BISHOP:
            return isValidBishopMove(piece, targetPosition, board);
          case FIGURES.ROOK:
            return isValidRookMove(piece, targetPosition, board);
          case FIGURES.QUEEN:
            return isValidQueenMove(piece, targetPosition, board);
          case FIGURES.KING:
            return isValidKingMove(piece, targetPosition, board);
          default:
            return false;
        }
      };

      const [chessDesk, setChessDesk] = useState<Piece[]>(initialBoardSetup())
      const [winner, setWinner] = useState<string | null>(null);
      const [selectedFigure, setSelectedFigure] = useState<Piece | null>(null);
      const [prevMove, setPrevMove] = useState<{killedPiece: Piece | null, piece: Piece | null}>({
        killedPiece: null,
        piece: null
      })

      const moveFigure = (piece: Piece, targetPosition: Position) => {
        if (isValidMove(piece, targetPosition, chessDesk)) {
          const targetPiece = chessDesk.find(
            (el) => el.position.row === targetPosition.row && el.position.col === targetPosition.col
          );

          if(targetPiece) {
            if (targetPiece.color === piece.color) {
              return; 
            }
            console.log(targetPiece);
            if (targetPiece.type === FIGURES.KING) {
              winSound()
              showWinnerMessage(piece.color);
              return;
            }
            playKillSound()
            setPrevMove((prev) => ({...prev, killedPiece: targetPiece}))
          }else {
            moveSound()
          } 
      
          const newChessDesk = chessDesk
            .filter((el) => !(el.position.row === targetPosition.row && el.position.col === targetPosition.col && el.color !== piece.color))
            .map((el) => {
              if (el.position.row === piece.position.row && el.position.col === piece.position.col) {
                return {
                  ...el,
                  position: targetPosition,
                };
              }
              return el;
            });
            
          setPrevMove((prev) => ({...prev, piece: piece}))
          setChessDesk(newChessDesk);
        }
      };

      const handleCellPress = (rowIndex: number, colIndex: number) => {
        const clickedPosition: Position = { row: rowIndex, col: colIndex };
    
        if (selectedFigure) {
          moveFigure(selectedFigure, clickedPosition);
          setSelectedFigure(null);
        } else {
          const figure = findFigureByPosition(rowIndex, colIndex, chessDesk);
          if (figure) {
            setSelectedFigure(figure);
          }
        }
      };

      const showWinnerMessage = (winnerColor: string | null) => {
        setWinner(winnerColor);
      };

      const resetMove = () => {
        const deckWithResetedMove = chessDesk
        .map((el) => {
          if (el.id === prevMove.piece!.id) {
            const oldMove = prevMove!
            setPrevMove((prev) => ({...prev, piece: null}))
            return oldMove.piece!
          }
          return el;
        });

        if(prevMove.killedPiece){
          setChessDesk([...deckWithResetedMove, prevMove.killedPiece])
        } else {
          setChessDesk(deckWithResetedMove)
        }
      }

      const resetDesk = () => {
        stopSound()
        resetSound()
        setPrevMove({
          killedPiece: null,
          piece: null
        })
        setChessDesk(initialBoardSetup())
      }

    return {chessDesk, selectedFigure, prevMove, winner, moveFigure, resetMove, handleCellPress, showWinnerMessage, isValidMove, resetDesk}
}