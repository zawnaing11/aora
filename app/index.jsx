import { Image, ScrollView, StatusBar, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from '../constants'
import CustomButton from "@/components/CustomButton";
import { Redirect, router } from "expo-router";
import { useGlobalContext } from "@/context/GlobalProvider";

export default function Index() {

  const { isLoggedin, isLoading } = useGlobalContext();

  if (!isLoading && isLoggedin) return <Redirect href={'/home'} />

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: '100%' }}>
        <View className="w-full min-h-[85vh] px-4 justify-center items-center">
          <Image
            source={images.logo}
            className="w-[130px] h-[84px]"
            resizeMode="contain"
          />

          <Image
            source={images.cards}
            className="h-[300px] max-w-[380px] w-full"
            resizeMode="contain"
          />

          <View className="relative mt-5">
            <Text className="text-3xl text-white font-bold text-center">
              Lorem, ipsum dolor sit amet consectetur {''}
              <Text className="text-secondary-200">
                Aora
              </Text>
            </Text>
            <Image
              source={images.path}
              className="w-[100px] h-[15px] absolute -bottom-3 right-14"
              resizeMode="contain"
            />
          </View>
          <Text className="text-sm font-pregular text-gray-100 text-center mt-7">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis eligendi, expedita pariatur nisi officiis, voluptates.
          </Text>

          <CustomButton
            title={'Continue with email'}
            handlePress={() => router.push('/sign-in')}
            containerStyles={'w-full mt-7'}
          />
        </View>
      </ScrollView>
      <StatusBar backgroundColor={'#161622'} barStyle={'light-content'} />
    </SafeAreaView>
  );
}
