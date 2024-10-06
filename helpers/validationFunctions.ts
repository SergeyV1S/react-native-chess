import { COLORS } from "@/constants/figures";

export const isValidPawnMove = (piece: Piece, targetPosition: Position, board: Piece[]): boolean => {
    const direction = piece.color === COLORS.WHITE ? -1 : 1;
    const startRow = piece.color === COLORS.WHITE ? 6 : 1;
    const diffRow = targetPosition.row - piece.position.row;
    const diffCol = targetPosition.col - piece.position.col;
  
    if (diffCol === 0) {
      if (diffRow === direction) {
        return !isPieceAtPosition(targetPosition, board);
      } else if (diffRow === 2 * direction && piece.position.row === startRow) {
        const intermediatePosition: Position = { row: piece.position.row + direction, col: piece.position.col };
        return !isPieceAtPosition(targetPosition, board) && !isPieceAtPosition(intermediatePosition, board);
      }
    }
  
    if (Math.abs(diffCol) === 1 && diffRow === direction) {
      return isOpponentPieceAtPosition(targetPosition, piece.color, board);
    }
  
    return false;
  };
  
  export const isValidKnightMove = (piece: Piece, targetPosition: Position): boolean => {
    const diffRow = Math.abs(targetPosition.row - piece.position.row);
    const diffCol = Math.abs(targetPosition.col - piece.position.col);
    return (diffRow === 2 && diffCol === 1) || (diffRow === 1 && diffCol === 2);
  };
  
  export const isValidBishopMove = (piece: Piece, targetPosition: Position, board: Piece[]): boolean => {
    const diffRow = Math.abs(targetPosition.row - piece.position.row);
    const diffCol = Math.abs(targetPosition.col - piece.position.col);
    if (diffRow === diffCol) {
      return isPathClear(piece.position, targetPosition, board);
    }
    return false;
  };
  
  export const isValidRookMove = (piece: Piece, targetPosition: Position, board: Piece[]): boolean => {
    const diffRow = Math.abs(targetPosition.row - piece.position.row);
    const diffCol = Math.abs(targetPosition.col - piece.position.col);
    if (diffRow === 0 || diffCol === 0) {
      return isPathClear(piece.position, targetPosition, board);
    }
    return false;
  };
  
  export const isValidQueenMove = (piece: Piece, targetPosition: Position, board: Piece[]): boolean => {
    const diffRow = Math.abs(targetPosition.row - piece.position.row);
    const diffCol = Math.abs(targetPosition.col - piece.position.col);
    if (diffRow === diffCol || diffRow === 0 || diffCol === 0) {
      return isPathClear(piece.position, targetPosition, board);
    }
    return false;
  };
  
  export const isValidKingMove = (piece: Piece, targetPosition: Position, board: Piece[]): boolean => {
    const diffRow = Math.abs(targetPosition.row - piece.position.row);
    const diffCol = Math.abs(targetPosition.col - piece.position.col);
    return diffRow <= 1 && diffCol <= 1;
  };
  
  export const isPieceAtPosition = (position: Position, board: Piece[]): boolean => {
    return board.some(piece => piece.position.row === position.row && piece.position.col === position.col);
  };
  
  export const isOpponentPieceAtPosition = (position: Position, color: Color, board: Piece[]): boolean => {
    const piece = board.find(p => p.position.row === position.row && p.position.col === position.col);
    return piece !== undefined && piece.color !== color;
  };
  
  export const isPathClear = (start: Position, end: Position, board: Piece[]): boolean => {
    const diffRow = end.row - start.row;
    const diffCol = end.col - start.col;
  
    const stepRow = diffRow === 0 ? 0 : diffRow / Math.abs(diffRow);
    const stepCol = diffCol === 0 ? 0 : diffCol / Math.abs(diffCol);
  
    let currentRow = start.row + stepRow;
    let currentCol = start.col + stepCol;
  
    while (currentRow !== end.row || currentCol !== end.col) {
      if (isPieceAtPosition({ row: currentRow, col: currentCol }, board)) {
        return false;
      }
      currentRow += stepRow;
      currentCol += stepCol;
    }
    return true;
  };