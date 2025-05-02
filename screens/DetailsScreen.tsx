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
    const { 
        getCoinStatus, 
        coinData } = useGetCoinStatus();
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

            <View style={styles.infoDisplayView}>
                <Text style={styles.title} testID='coin-code-label'>{`Coin Code: ${coinResult?.coinId}`}</Text>
                <Text style={styles.title} testID='coin-name-label'>{`Coin Name: ${coinInfo.name}`}</Text>
                <Text style={styles.title} testID='coin-status-label'>{`Availability: ${coinResult?.availability}`}</Text>
            </View>
            
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    infoDisplayView: {
        marginHorizontal: 10,
        marginVertical: 10,
        flex: 1,
        flexDirection: 'column'
    },
    title: {
        fontSize: 16,
        marginBottom: 10,
        color: '#000',
    },
})

export default DetailsScreen;