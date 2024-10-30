import { Text, View } from "react-native";
import { Link } from "expo-router";

export default function Index() {
  return (
    <View className="flex-1 items-center justify-center gap-4">
      <Text className="text-3xl text-black font-pblack">AORA !</Text>
      <Link href={'/profile'} className="text-blue-500">Go To Profile</Link>
    </View>
  );
}
