import { View, Text, FlatList, RefreshControl, Image } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import EmptyState from '../../components/EmptyState'
import { getUserPosts } from '@/lib/appwrite'
import useAppWrite from '../../lib/useAppwrite'
import VideoCard from '../../components/VideoCard'
import { useGlobalContext } from '@/context/GlobalProvider'
import { TouchableOpacity } from 'react-native'
import { icons } from '@/constants'
import UserInfo from '../../components/UserInfo'
import { singOut } from '../../lib/appwrite'
import { router } from 'expo-router'

const Profile = () => {
  const { user, setUser, setIsLoggedin } = useGlobalContext();
  const { data: posts } = useAppWrite(() => getUserPosts(user.$id));

  const logoutHanlde = async () => {
    await singOut();
    setUser(null);
    setIsLoggedin(false);

    router.replace('/sign-in')
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({item}) => {
          return (
            <VideoCard video={item} />
          )
        }}
        ListHeaderComponent={() => (
          <View>
            <TouchableOpacity
              className="w-full items-end mb-10"
              onPress={logoutHanlde}
            >
              <Image
                source={icons.logout}
                resizeMode='contain'
                className="w-6 h-6"
              />
            </TouchableOpacity>
            <UserInfo posts={posts.length || 0}/>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="No videos found for this search query"
          />
        )}
      />
    </SafeAreaView>
  )
}

export default Profile
