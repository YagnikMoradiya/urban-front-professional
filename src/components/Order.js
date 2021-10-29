import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { CustomButton } from '.'
import { ApiPost } from '../utils/helper'
import { COLORS, FONTS, SIZES } from '../utils/theme'

const Order = ({ data }) => {
    const addRequest = async (type) => {
        try {
            await ApiPost(`/request/add-request`, {
                userId: data.user.id,
                orderId: data.id,
                type
            });
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <View style={styles.orderHisory}>
            <View style={styles.nameTitle}>
                <Text
                    style={{
                        ...FONTS.body2,
                        color: COLORS.white,
                        fontWeight: 'bold',
                    }}>
                    {data?.user?.name}
                </Text>
            </View>

            <View style={styles.orderDetailContainer}>
                <Text
                    style={{
                        ...FONTS.body5,
                        color: COLORS.white,
                        fontWeight: '300',
                    }}>
                    {data?.user?.phone}
                </Text>
                <Text
                    style={{
                        ...FONTS.body5,
                        color: COLORS.white,
                        fontWeight: '300',
                    }}>
                    {data?.serviceName}
                </Text>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', paddingTop: 15 }}>
                <BookButton title="Start" onPress={() => addRequest('START')} />
                <BookButton title="Close" onPress={() => addRequest('END')} />
            </View>
        </View>
    )
}

export default Order

const BookButton = ({ onPress, title, disabled }) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.container} disabled={disabled}>
            <Text style={styles.button_text}>{title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    orderHisory: {
        backgroundColor: '#26292D',
        // height: 148,
        width: '90%',
        marginTop: 17,
        borderRadius: 20,
        paddingVertical: 15,
        paddingLeft: 11,
        paddingRight: 20,
    },

    nameTitle: {
        flexDirection: 'row',
        alignItems: 'baseline',
        justifyContent: 'space-between',
    },

    container: {
        width: 70,
        height: 25,
        backgroundColor: COLORS.white2,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: SIZES.radius,
        shadowColor: 'rgba(0, 0, 0, 0.38)',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.55,
        shadowRadius: 30,

        elevation: 8,
    },
    button_text: {
        color: COLORS.black,
        textAlign: 'center',
        ...FONTS.body3,
    },
})
