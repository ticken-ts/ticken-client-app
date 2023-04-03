import React from 'react'
import { StyleProp, View, ViewStyle } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';

type Option = {
    label: string
    onPress: () => void
    icon?: React.ReactNode
}

type Props = {
    options: Option[]
    style?: StyleProp<ViewStyle>
}

export const ContextMenu = ({options, style}: Props) => {
    return (
        <View style={style}>
            <MaterialCommunityIcons name="dots-vertical" size={24} color="black" />
        </View>
    )
}