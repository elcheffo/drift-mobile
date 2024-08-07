import { Image, StyleSheet, Button, Alert, Linking } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useTransferExampleTx } from "@/hooks/transfer/useTransferExampleTx";
import { useDriftClient } from "@/contexts/DriftClientProvider";
import { useInitializeAccount } from "@/hooks/account/useInitializeAccount";

export default function HomeScreen() {
  const transferExample = useTransferExampleTx();
  const { driftClient } = useDriftClient();
  const initializeAccount = useInitializeAccount();

  const onBuildSampleTx = () => {
    transferExample
      .mutateAsync()
      .then((signature) =>
        Linking.openURL(
          `https://explorer.solana.com/tx/${signature}?cluster=devnet`
        )
      )
      .then(() => Alert.alert("Executed SOL burn"));
  };

  const onSubscribe = () => {
    if (driftClient._isSubscribed) {
      return Alert.alert("Already subscribed");
    }
    driftClient.subscribe().then((res) => Alert.alert(`Subscribed: ${res}`));
    // .catch((err: Error) => {
    //   console.log("Unable to subscribe", err);
    //   Alert.alert("Unable to subscribe", err.message);
    // });
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <Button title="Execute burn tx" onPress={onBuildSampleTx} />
        <Button title="Drift subscribe" onPress={onSubscribe} />
        <Button
          title="Initial with deposit"
          onPress={() => initializeAccount.mutateAsync()}
        />
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
