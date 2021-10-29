import { useIsFocused } from '@react-navigation/native'
import moment from 'moment'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { ApiGet } from '../../utils/helper'
import { COLORS, FONTS, SIZES } from '../../utils/theme'

const RequestScreen = () => {
    const [ requests, setRequests ] = useState([]);

    const isFocused = useIsFocused();

    const getRequests = async () => {
        try {
            const requestData = await ApiGet('/request/get-request?type=SHOP');

            setRequests(requestData.data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getRequests();
    }, [ isFocused ])

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={{ width: "100%", padding: SIZES.base, justifyContent: 'center' }}>
                {requests.length > 0 ? (
                    <>
                        {requests.map(r => (
                            <Request data={r} key={r.id} />

                        ))}
                    </>
                ) : (<View style={styles.no_content_view}>
                    <Text style={styles.no_content_text}>No Services 😔😔</Text>
                </View>)}
            </ScrollView>
        </View>
    )
}

const Request = ({ data }) => {
    return (
        <View style={{ width: "90%", elevation: 5, padding: 15, borderRadius: 10, marginBottom: 10 }}>
            <Text style={{ textAlign: 'center', padding: 10, ...FONTS.body2 }}>{data.text}</Text>
            <View style={{ flexDirection: 'row', width: "100%", justifyContent: 'space-around', alignItems: 'center' }}>
                <View style={{ backgroundColor: 'green', width: 100, height: 28, justifyContent: 'center', alignItems: 'center', }}>
                    <Text style={{ textAlign: 'center', ...FONTS.h4, color: 'white' }}>{data.status}</Text>
                </View>
                <Text style={{ ...FONTS.body4, textAlign: 'right' }}>{moment(data.createdAt).format('h:mm:ss a')}</Text>
            </View>
        </View>
    )
}

export default RequestScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
        alignItems: 'center',
        justifyContent: 'center'
    },

    no_content_view: {
        flex: 1,
        marginTop: 50,
    },
    no_content_text: {
        textAlign: 'center',
        ...FONTS.h3,
    },
})
