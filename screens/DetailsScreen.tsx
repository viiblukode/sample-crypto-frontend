import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, SafeAreaView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';
import { Appbar } from 'react-native-paper';
import { Header } from '../components/Header';
import { CoinStatus, CurrencyInfo } from '../types/dataTypes';
import { useGetCoinStatus } from '../hooks/useGetCoinStatus';

type Props = NativeStackScreenProps<RootStackParamList, 'Details'>;

interface CoinDetailParams {
    route: {
        params: {
            coinInfo: CurrencyInfo
        }
    }
}

const DetailsScreen:React.FC<Props> = ({ route }: CoinDetailParams ) => {

    const coinInfo = route.params.coinInfo;
    const { getCoinStatus, coinData, isGetCoinStatusSuccessful, isGetCoinStatusFailed, getCoinStatusError, getCoinStatusLoading } = useGetCoinStatus();
    const [ coinResult, setCoinResult ] = useState<CoinStatus>();

    useEffect(() => {
        const getCoinInfo = async () => {
            await getCoinStatus(coinInfo.id);
        };

        getCoinInfo();
    }, []);

    useEffect(() => {
        if(coinData) {
            setCoinResult(coinData);
        }
    }, [coinData])

    return (
        <SafeAreaView style={styles.container}>
            <Header 
                title={'Details'}
                showLeftActionButton={true}/>

            <View>
                <Text style={styles.title}>{`CoinId: ${coinResult?.coinId}`}</Text>
                <Text style={styles.title}>{`Availability: ${coinResult?.availability}`}</Text>
            </View>
            
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    title: {
        fontSize: 16,
        marginBottom: 10,
        color: '#000',
    },
})

export default DetailsScreen;