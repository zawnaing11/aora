import { View, Text, FlatList, Image, RefreshControl, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '@/constants'
import SearchInput from '../../components/SearchInput'
import Trending from '../../components/Trending'
import EmptyState from '../../components/EmptyState'
import { getAllPosts, getLatestPosts } from '@/lib/appwrite'
import useAppWrite from '../../lib/useAppwrite'
import VideoCard from '../../components/VideoCard'

const Home = () => {
  const { data: posts, refetch } = useAppWrite(getAllPosts);
  const { data: latestPosts } = useAppWrite(getLatestPosts);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        // data={[{id: 1}, {id: 2}, {id: 3}]}
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({item}) => {
          return (
            <VideoCard video={item} />
          )
        }}
        ListHeaderComponent={() => (
          <View className="px-4 my-6">
            <View className="justify-between items-start flex-row mb-5">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">
                  Welcome Back
                </Text>
                <Text className="text-2xl font-psemibold text-white">
                  ZAWNAING
                </Text>
              </View>
              <View>
                <Image
                  source={images.logoSmall}
                  resizeMode='contain'
                  className="w-9 h-10"
                />
              </View>
            </View>
            <SearchInput placeholder={'Search for a video topic'}/>
            <View className="pt-5 pb-8 w-full flex-1">
              <Text className="text-lg text-gray-100 font-pregular mb-3">Latest Video</Text>
              <Trending posts={latestPosts ?? []} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="Be the first one to upload a video"
          />
        )}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
    </SafeAreaView>
  )
}

export default Home
