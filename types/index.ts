type Position = { row: number; col: number };
type PieceType = 'p' | 'h' | 'b' | 'r' | 'q' | 'k';
type Color = 'w' | 'b'
type Piece = { type: PieceType; color: Color; position: Position, id: string };