import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';
import { Appbar, useTheme, Button, Snackbar } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '../components/Header';
import { usePostPopulateData } from '../hooks/usePostPopulateData';
import { useDeleteData } from '../hooks/useDeleteData';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen:React.FC<Props> = ({ navigation }) => {
    const { postPopulateData, isPostPopulateDataSuccessful, isPostPopulateDataFailed } = usePostPopulateData();
    const { deleteData, isDeleteSuccessful, isDeleteFailed, deleteError, isDeleteLoading } = useDeleteData();
    const [ displaySnackBar, setDisplaySnackBar] = useState<boolean>(false);
    const [ snackBarMessage, setSnackBarMessage] = useState<string>('');

    useEffect(() => {
        if(isPostPopulateDataSuccessful || isDeleteSuccessful) {
            setDisplaySnackBar(true);
            setSnackBarMessage('Request is sent successfully!');
        }
        if(isPostPopulateDataFailed || isDeleteFailed) {
            setDisplaySnackBar(true);
            setSnackBarMessage('Request has failed to sent, please try again later!');
        }
    }, [isPostPopulateDataSuccessful, isPostPopulateDataFailed, isDeleteSuccessful, isDeleteFailed])

    const onClickPopulate = async () => {
        await postPopulateData();
    }

    const onClickDiscard = async () => {
        await deleteData();
    }

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <Header title={'Home'}
            showRightActionButton={true}
            rightActionButtonIcon={'magnify'}
            rightButtonOnPress={() => navigation.navigate('Search')}/>

            <Button 
                mode="contained" 
                style={styles.button}
                onPress={onClickPopulate}> Populate Crypto Data! </Button>
            <Button 
                mode="contained" 
                style={styles.purgeButton}
                onPress={onClickDiscard}> Purge All Data! </Button>
            <Snackbar 
                visible={displaySnackBar} 
                duration={3000} 
                style={styles.snackBarContainer}
                onDismiss={() => {setDisplaySnackBar(false)}}>
                <Text style={styles.snackBarText}>{snackBarMessage}</Text>
            </Snackbar>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    title: {
        fontSize: 24,
        marginBottom: 10,
        color: '#FFF',
        fontWeight: '600',
    },
    button: {
        marginTop: 15,
        marginHorizontal: 10,
        padding: 5
    },
    purgeButton: {
        marginTop: 15,
        marginHorizontal: 10,
        padding: 5,
        backgroundColor: '#B22222'
    },
    snackBarText: {
        color: '#000'
    },
    snackBarContainer: {
        backgroundColor: '#DDD'
    }
})

export default HomeScreen;