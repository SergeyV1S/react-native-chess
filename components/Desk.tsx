import React from 'react';
import { StyleSheet, Image, View } from 'react-native';
import { findFigureByPosition } from '../helpers/findFigureByPosition'
import { FIGURE_IMAGES } from '../constants/figuresImage'

interface DeskProps {
  chessDesk: Piece[],
  selectedFigure: Piece | null,
  handleCellPress: (rowIndex: number, colIndex: number) => void
}

export const Desk = ({chessDesk, selectedFigure, handleCellPress}: DeskProps) => (
  <View>
      {
      [...Array(8)].map((_, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {
            [...Array(8)].map((_, colIndex) => {
              const figure = findFigureByPosition(rowIndex, colIndex, chessDesk);
              return (
                <View
                  onTouchEnd={() => handleCellPress(rowIndex, colIndex)}
                  key={rowIndex.toString() + colIndex.toString()}
                  style={[
                    styles.cell,
                    (rowIndex + colIndex) % 2 === 0 ? styles.lightCell : styles.darkCell,
                    selectedFigure?.position.row === rowIndex &&
                    selectedFigure?.position.col === colIndex &&
                    styles.selectedCell,
                  ]}
                >
                  {figure && (
                    <Image
                      source={FIGURE_IMAGES[figure.color + figure.type]}
                      style={{ width: 35, height: 35 }}
                    />
                  )}
                </View>
              );
            })
          }
        </View>
      ))
    }
  </View>
)

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
    },
    cell: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    selectedCell: {
        borderColor: 'blue',
        borderWidth: 2,
    },
    lightCell: {
        backgroundColor: '#f0d9b5',
    },
    darkCell: {
        backgroundColor: '#b58863',
    },
});
