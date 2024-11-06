import { View, TextInput, TouchableOpacity, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { icons } from '@/constants'
import { router, usePathname } from 'expo-router'

const SearchInput = ({ placeholder, initialQuery }) => {
    const pathname = usePathname();
    const [query, setQuery] = useState(initialQuery || '');

    const onPressHandle = () => {
        if (!query) {
            Alert.alert('Something Missing', 'Please input something to search results.')
        }
        if (pathname.startsWith('/search')) {
            router.setParams({ query });
        } else {
            router.push(`/search/${query}`);
        }
    }

    return (
        <View className='w-full px-4 bg-black-100 h-16 border-2 border-black-200 rounded-2xl focus:border-secondary-200 items-center flex-row space-x-4'>
            <TextInput
                className='flex-1 text-white font-pregular text-base mt-1.5'
                placeholder={placeholder}
                value={query}
                placeholderTextColor={'#CDCDE0'}
                onChangeText={(e) => setQuery(e)}
            />
            <TouchableOpacity
                onPress={onPressHandle}
            >
                <Image
                    className="w-5 h-5"
                    source={icons.search}
                    resizeMode='contain'
                />
            </TouchableOpacity>
        </View>

    )
}

export default SearchInput
