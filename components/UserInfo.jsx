import { View, Text, Image } from 'react-native'
import React from 'react'
import { useGlobalContext } from '@/context/GlobalProvider'

const UserInfo = ({ posts }) => {
    const { user } = useGlobalContext();
  return (
    <View className="w-full justify-center items-center px-4 mb-12 mt-6">
        <View className='w-16 h-16 border border-secondary rounded-lg justify-center items-center'>
            <Image
                source={{ uri: user?.avatar }}
                className='w-[90%] h-[90%] rounded-lg'
                resizeMode='cover'
            />
        </View>
        <View>
            <Text className='text-xl font-psemibold text-white mt-3'>{user?.username}</Text>
        </View>
        <View className='flex-row justify-center items-center gap-8 mt-5'>
            <View>
                <Text className='text-xl font-psemibold text-white text-center'>{posts}</Text>
                <Text className='text-sm font-pregular text-gray-50'>Posts</Text>
            </View>
            <View>
                <Text className='text-xl font-psemibold text-white text-center'>12.2K</Text>
                <Text className='text-sm font-pregular text-gray-50'>Followers</Text>
            </View>
        </View>
    </View>
  )
}

export default UserInfo
