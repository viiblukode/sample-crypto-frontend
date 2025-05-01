import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/RootNavigator";
import { FlatList, SafeAreaView, StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { SearchHeader } from "../components/Header";
import { useGetCurrencyData } from "../hooks/useGetCurrencyData";
import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { useGetSearchCurrency } from "../hooks/useGetSearchCurrency";
import { CurrencyInfo } from "../types/dataTypes";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { EmptyResultView, ListItemDivider } from "../components/ListItem";


type Props = NativeStackScreenProps<RootStackParamList, 'Search'>;

const SearchScreen:React.FC<Props> = ({ navigation }) => {

    const { 
        getCurrencyList, 
        dataResult, 
        isGetCurrencyDataSuccessful, 
        isGetCurrencyDataFailed, 
        getCurrencyDataError, 
        getCurrencyDataLoading } = useGetCurrencyData();
    
    const { searchCoinList, searchResult, isSearchCoinSuccessful, isSearchCoinFailed, getSearchCoinError, getSearchCoinLoading
    } = useGetSearchCurrency();

   const isFocused = useIsFocused();
    const [query, setQuery] = useState<string>('');
    const [dataList, setDataList] = useState<CurrencyInfo[]>([]);

    useEffect(() => {
        //initial load
        const loadCurrencyList = async () => {
            await getCurrencyList();
        }
        loadCurrencyList();
    }, []);

    useEffect(() => {
        const queryCoinList = async () => {
            if(query.length > 0) {
                await searchCoinList(query);
            } else {
                await getCurrencyList(); // if got no query search, retrieve all list
            }
        }
        queryCoinList();
    }, [query]);

    useEffect(() => {
        if(dataResult) {
            setDataList(dataResult);
        };
        if(searchResult) {
            setDataList(searchResult);
        }
    }, [dataResult, searchResult]);
    

    const renderItemSeparator = () => {
        return (<ListItemDivider />);
    }

    const renderEmptyView = () => {
        return (<EmptyResultView />)
    }

    const renderItem = ({ item }: { item: CurrencyInfo }) => {
        const itemInitial = item.name.slice(0,1);
        const showMoreInfoButton = !item?.code
        return (
            <TouchableOpacity 
                style={styles.itemView} 
                onPress={() => {
                    if(!item?.code) {
                        navigation.navigate('Details', { coinInfo: item }) 
                    }
                }}>
                <View style={styles.leftContainer}>
                    <View style={styles.itemIconView}>
                        <Text style={styles.itemIconText}>{itemInitial}</Text>
                    </View>
                    <Text style={styles.nameText}>
                        {item.name}
                    </Text>
                </View>
                
                {showMoreInfoButton && (
                    <View style={styles.coinInfoView}>
                        <Text style={styles.coinInitial}>{item.symbol}</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end'}}>
                            <MaterialCommunityIcons 
                                name="chevron-right" 
                                size={20} color="#ccc" 
                                style={styles.chevronButton}
                            />
                        </View>  
                    </View> 
                )}
            </TouchableOpacity>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <SearchHeader 
                title={'Search'}
                initialQuery={query}
                onSearchTextChange={setQuery}
                placeholder={'Search here...'}
                showLeftActionButton={true}
                showRightActionButton={true} />

            <View style={styles.listContainer}>
                <FlatList
                    data={dataList}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    ItemSeparatorComponent={renderItemSeparator}
                    ListEmptyComponent={renderEmptyView}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    headerStyle: {
        backgroundColor: '#FFF',
        alignContent: 'center'
    },
    itemView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 14,
    },
    itemIconView: {
        borderRadius: 100,
        width: 30,
        height: 30,
        backgroundColor: '#000',
        marginHorizontal: 10,
        alignItems: 'center',
        marginVertical: 5
    },
    itemIconText: {
        color: '#FFF',
        fontSize: 16,
        alignSelf: 'center',
        marginTop: 6
    },
    nameText: {
        fontSize: 16,
        marginTop: 8
    },
    chevronButton: {
        marginRight: 0
    },
    coinInitial: {
        color: '#666',
        marginRight: 4,
        fontWeight: '500',
    },
    coinInfoView: {
        flexDirection: 'row',
        marginTop: 8,
        alignItems: 'center'
    },
    listContainer: {
        flex: 1
    },
    leftContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});

export default SearchScreen;