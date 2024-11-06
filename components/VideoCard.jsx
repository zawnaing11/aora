import { View, Text, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { icons, videos } from '@/constants'
import { TouchableOpacity } from 'react-native';
import { ResizeMode, Video } from "expo-av";

const VideoCard = ({ video: {title, thumbnail, video, users: { username, avatar }} }) => {
    const [play, setPlay] = useState(false);

  return (
    <View className='flex-col items-center mb-14'>
        <View className='flex-row items-start gap-3'>
            <View className="flex-row items-center justify-between flex-1">
                <View className="w-[46px] h-[46px] rounded-lg border border-secondary justify-center items-center p-0.5">
                    <Image
                        source={{ uri: avatar }}
                        resizeMode='cover'
                        className="w-full h-full rounded-lg"
                    />
                </View>
                <View className="justify-center ml-4 flex-1 gap-y-1">
                    <Text className='font-psemibold text-sm text-white' numberOfLines={1}>
                        {title}
                    </Text>
                    <Text className="text-gray-100 text-xs font-pregular" numberOfLines={1}>
                        {username}
                    </Text>
                </View>
            </View>
            <View className="pt-2">
                <Image
                    source={icons.menu}
                    className='w-5 h-5'
                    resizeMode='contain'
                />
            </View>
        </View>
        {
            play ?
            (<Video
                source={require('@/assets/videos/video001.mp4')}
                className="w-52 h-72 rounded-[33px] mt-3 bg-white/10"
                resizeMode={ResizeMode.CONTAIN}
                useNativeControls={true}
                shouldPlay
                onPlaybackStatusUpdate={(status) => {
                    if (status.didJustFinish) {
                    setPlay(false);
                    }
                }}
            />)
            :
            <TouchableOpacity
                className='w-full h-60 relative mt-3 justify-center items-center'
                activeOpacity={0.7}
                onPress={() => setPlay(true)}
            >
                <Image
                    source={{ uri: thumbnail }}
                    resizeMode='cover'
                    className='w-full h-full rounded-xl mt-3'
                />
                <Image
                    source={icons.play}
                    resizeMode='contain'
                    className='w-12 h-12 absolute'
                />
            </TouchableOpacity>
        }
    </View>
  )
}

export default VideoCard
