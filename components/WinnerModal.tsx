import { COLORS } from "@/constants/figures";
import { Button, Modal, Text, View } from "react-native";

export const WinnerModal = ({ visible, winnerColor, onReset }: { visible: boolean, winnerColor: string, onReset: () => void }) => (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
        <View style={{ width: 300, padding: 20, backgroundColor: 'white', borderRadius: 10 }}>
          <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 }}>
            {`${winnerColor === COLORS.WHITE ? "Белые" : "Черные"} победили!`}
          </Text>
          <Button title="OK" onPress={onReset} />
        </View>
      </View>
    </Modal>
  );