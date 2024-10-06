import { Pressable, StyleSheet, Text, View, Image } from 'react-native';
import { Desk } from './components/Desk';
import { useChess } from './helpers/useChess';
import { WinnerModal } from './components/WinnerModal';


export default function App() {
  const { chessDesk, prevMove, selectedFigure, winner, showWinnerMessage, resetMove, handleCellPress, resetDesk } = useChess();

  return (
    <View style={styles.container}>
      <View style={styles.container}>
          <Pressable disabled={!prevMove.piece} style={[styles.button, styles.prevMove_button, !prevMove.piece && styles.disabledButton]} onPress={() => resetMove()}>
            <Image style={{ width: 35, height: 35 }} source={require('@/assets/reset.png')}/>
          </Pressable>
        <Desk chessDesk={chessDesk} handleCellPress={handleCellPress} selectedFigure={selectedFigure}/>
        <Pressable style={styles.button} onPress={() => resetDesk()}>
            <Text style={{color: 'white', fontWeight: '700'}}>Начать сначала</Text>
          </Pressable>
        {winner && (
            <WinnerModal 
                visible={true} 
                winnerColor={winner} 
                onReset={() => {
                    showWinnerMessage(null);
                    resetDesk();
                }} 
            />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  prevMove_button:{
    position: 'absolute',
    top: 10,
    right: 10,
    paddingHorizontal: 6
  },
  button: {
    marginTop: 40,
    borderWidth: 2,
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderRadius: 4,
    backgroundColor: '#7795FF',
    borderColor: '#9FC4FB',
  },
  disabledButton: {
    opacity: 0.5,
  },
});
