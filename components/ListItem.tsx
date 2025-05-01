import { Image, StyleSheet, View, Text } from "react-native"
import { Card } from "react-native-paper"

export const ListItemDivider = () => {
    return (
        <View style={styles.container}>
            <Card elevation={5} mode={'elevated'} style={styles.card}>
                <View style={styles.divider}/>
            </Card>
        </View>
    )
}

export const EmptyResultView = () => {
    return (
        <View style={styles.emptyContainer}>
            <Image source={require('../assets/no-results.png')} style={styles.imageView} resizeMode="contain"/>
            <Text style={styles.emptyTitle}>{'No Results'}</Text>
            <Text style={styles.emptySubTitle}>{'Try MCO'}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        overflow: 'hidden',
        backgroundColor: '#D3D3D3'
    },
    card: {
        marginHorizontal: 16,
        paddingHorizontal: 20
    },
    divider: {
        borderBottomColor: '#D3D3D3',
        borderBottomWidth: 1
    },
    emptyCard: {
        margin: 16,
        marginTop: 10,
        shadowRadius: 4,
        backgroundColor: '#FFF',
        marginHorizontal: 20
    },
    emptyTitle: {
        fontSize: 14,
        marginTop: 10
    },
    emptySubTitle: {
        fontSize: 14,
        color: "#D3D3D3",
        marginTop: 5
    },
    imageView: {
        width: 50,
        height: 50
    },
    emptyContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 32,
        flex: 1,
        flexDirection: 'column',
        marginTop: 30
    }
})