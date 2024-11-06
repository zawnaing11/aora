import { View, Text, ScrollView, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormField from '@/components/FormField'
import CustomButton from '@/components/CustomButton'
import { icons } from '@/constants'
import { Video, ResideMode, ResizeMode } from 'expo-av'
import { TouchableOpacity } from 'react-native'
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router'
import { createPost } from '../../lib/appwrite'
import { useGlobalContext } from '../../context/GlobalProvider'

const initialForm = {
  title: '',
  video: null,
  thumbnail: '',
  prompt: '',
}

const Create = () => {
  const { user } = useGlobalContext();

  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState(initialForm)

  const imageTypes = ['image/png', 'image/jpg', 'image/jpeg'];
  const videoTypes = ['video/mp4', 'video/gif'];

  const openPicker = async (selectedType) => {

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: selectedType === 'image' ? ImagePicker.MediaTypeOptions.Images : ImagePicker.MediaTypeOptions.Videos,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      if (selectedType === 'image') {
        setForm({ ...form, thumbnail: result.assets[0] })
      }
      if (selectedType === 'video') {
        setForm({ ...form, video: result.assets[0] })
      }
    }

  }

  const submitHandle = async () => {
    if (!form.title || !form.video || !form.thumbnail || !form.prompt) {
      Alert.alert('Please fill in all the fields');
    }
    try {
      await createPost({
        ...form,
        userId: user.$id
      })
      setUploading(true);
      Alert.alert('Success', 'Post uploaded successfully')
      router.push('/home');
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setForm(initialForm);
      setUploading(false);
    }
  }

  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView className='px-4 my-6'>
        <Text className='text-2xl text-white font-psemibold'>Upload Video</Text>
        <FormField
          title="Video Title"
          placeholder='Give your video a catch title ...'
          value={form.title}
          otherStyles="mt-10"
          handleChangeText={(e) => (setForm({ ...form, title: e }))}
        />
        <View className='mt-7 space-y-2'>
          <Text className='text-base text-gray-100 font-pmedium'>
            Upload Video
          </Text>
          <TouchableOpacity
            onPress={() => openPicker('video')}
          >
            {
              form.video ?
                (<Video
                  source={{ uri: form.video.uri }}
                  resizeMode={ResizeMode.COVER}
                  className="w-full h-64 rounded-2xl"
                />)
                :
                (<View className='w-full h-40 px-4 bg-black-100 rounded-2xl justify-center items-center'>
                  <View className='w-14 h-14 border border-dashed border-secondary-100 justify-center items-center'>
                    <Image
                      source={icons.upload}
                      resizeMode='contain'
                      className='w-1/2 h-1/2'
                    />
                  </View>
                </View>)
            }
          </TouchableOpacity>
        </View>
        <View className='mt-7 space-y-2'>
          <Text className='text-base text-gray-100 font-pmedium'>
            Thumbnail Image
          </Text>
          <TouchableOpacity
            onPress={() => openPicker('image')}
          >
            {
              form.thumbnail ?
                (<Image
                  source={{ uri: form.thumbnail.uri }}
                  resizeMode='cover'
                  className="w-full h-64 rounded-2xl"
                />)
                :
                (<View className='w-full h-16 px-4 bg-black-100 rounded-2xl justify-center items-center border-black-200 border-2 flex-row gap-2'>
                  <Image
                    source={icons.upload}
                    resizeMode='contain'
                    className='w-5 h-5'
                  />
                  <Text className='text-gray-100 font-pmedium text-sm'>
                    Choose a file
                  </Text>
                </View>)
            }
          </TouchableOpacity>
        </View>
        <FormField
          title="AI Prompt"
          placeholder='The AI prompt of your video'
          value={form.prompt}
          otherStyles="mt-7"
          handleChangeText={(e) => (setForm({ ...form, prompt: e }))}
        />
        <CustomButton
          title="Submit & Publish"
          containerStyles="mt-7"
          handlePress={submitHandle}
          isLoading={uploading}
        />
      </ScrollView>
    </SafeAreaView>
  )
}

export default Create
