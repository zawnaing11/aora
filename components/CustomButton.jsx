import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const CustomButton = ({ title, containerStyles, textStyles, isLoading, handlePress}) => {
  return (
    <TouchableOpacity
        onPress={handlePress}
        activeOpacity={0.7}
        className={`bg-secondary min-h-[62px] justify-center rounded-xl items-center ${containerStyles} ${isLoading ? 'opactiy-50' : ''}`}
        disabled={isLoading}
    >
      <Text className={`'text-primary font-psemibold text-lg' ${textStyles}`}>{title}</Text>
    </TouchableOpacity>
  )
}

export default CustomButton
