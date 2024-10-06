export const findFigureByPosition = (row: number, col: number, desk: Piece[]): Piece | undefined => {
    return desk.find(figure => figure.position.row === row && figure.position.col === col);
  };