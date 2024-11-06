import { View, Text, ScrollView, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import { images } from '@/constants'
import FormField from '@/components/FormField'
import CustomButton from '@/components/CustomButton'
import { Link, router } from 'expo-router'
import { createUser } from '../../lib/appwrite'
import { useGlobalContext } from '@/context/GlobalProvider'

const Signup = () => {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setUser, setIsLoggedin } = useGlobalContext();

const handleSubmit = async () => {
  if (form.email === '' || form.password === '' || form.username === '') {
    Alert.alert('Error', 'Please fill in all fields');
  }
  setIsSubmitting(true);
  try {
    const user = await createUser(form);
    if (!user) throw Error;

    setUser(user);
    setIsLoggedin(true);

    router.replace('/home');

  } catch (error) {
    Alert.alert('Error', error.message);

  } finally {
    setIsSubmitting(false);

  }
}

  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView>
        <View className='min-h-[85vh] w-full px-4 my-6 justify-center'>
          <View className='flex-cols justify-center items-center'>
            <Image
              source={images.logo}
              resizeMode='contain'
              className='w-[115px] h-[35px]'
            />
            <Text className='text-white text-2xl font-psemibold mt-5'>Login to Aora</Text>
          </View>

          <FormField
            title={'Username'}
            value={form.username}
            handleChangeText={(e: string) => setForm({...form, username: e})}
            otherStyles="mt-7"
            keyBoardType="email-address"
          />

          <FormField
            title={'Email'}
            value={form.email}
            handleChangeText={(e: string) => setForm({...form, email: e})}
            otherStyles="mt-7"
            keyBoardType="email-address"
          />

          <FormField
            title={'Password'}
            value={form.password}
            handleChangeText={(e: string) => setForm({...form, password: e})}
            otherStyles="mt-7"
            keyBoardType="email-address"
          />

          <CustomButton
            title='Sign-Up'
            handlePress={handleSubmit}
            containerStyles='mt-7'
            isLoading={isSubmitting}
          />

          <View className='flex-row gap-2 pt-6 justify-center'>
            <Text className='text-gray-100 text-lg font-pregular'>
              Have an account already?
            </Text>
            <Link href={'/sign-in'} className='text-secondary text-lg font-psemibold'>Sign In</Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Signup
