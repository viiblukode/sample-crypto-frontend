import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import { Pressable, StyleSheet, View, Text } from "react-native";
import { Appbar, Menu, TextInput } from "react-native-paper";
import debounce from 'lodash.debounce';
import { CurrencyListType } from "../types/dataTypes";

interface HeaderProps {
    title: string;
    style?: any;
    showLeftActionButton?: boolean;
    showRightActionButton?: boolean;
    rightActionButtonIcon?: string;
    rightButtonOnPress?: () => void;
}
interface SearchHeaderProps {
    onSearchTextChange: (text: string) => void;
    onSelectListType: (val: CurrencyListType) => void;
    title: string;
    initialType: CurrencyListType;
    placeholder?: string;
    initialQuery?: string;
    style?: any;
    showLeftActionButton?: boolean;
    showRightActionButton?: boolean;
    rightActionButtonIcon?: string;
    rightButtonOnPress?: () => void;
    debounceDelay?: number;
}

export const Header = (props: HeaderProps) => {
    const { goBack } = useNavigation();
    return (
        <Appbar.Header style={props.style}>
            {props?.showLeftActionButton && (
                <Appbar.BackAction 
                    size={16} 
                    onPress={goBack}
                    style={styles.backButton}
                    testID={'header-back-btn'}/>
            )}
            <Appbar.Content title={props.title} testID={'header-title'}/>
            {props?.showRightActionButton && props.rightButtonOnPress &&  (
                <Appbar.Action icon={ props?.rightActionButtonIcon || 'dots-vertical'} onPress={props.rightButtonOnPress} testID={'header-right-action-btn'}/>
            )}
        </Appbar.Header>
    );
}

export const SearchHeader = (props: SearchHeaderProps) => {
    const { goBack } = useNavigation();
    const [query, setQuery] = useState(props.initialQuery);
    const [searchMode, setSearchMode] = useState(false);
    const [menuVisible, setMenuVisible] = useState(false);
    const options = Object.values(CurrencyListType);
    const [selected, setSelected] = useState<CurrencyListType>(options[0]);

    const handleTextChange = (text: string) => {
        setQuery(text);
        debouncedSearch(text);
    };

    // Debounced callback
    const debouncedSearch = useCallback(
        debounce((text: string) => {
        props.onSearchTextChange(text);
        }, props.debounceDelay),
        []
    );

    const openMenu = () => setMenuVisible(true);
    const closeMenu = () => setMenuVisible(false);

    const handleSelect = (value: CurrencyListType) => {
        setSelected(value);
        props.onSelectListType(value);
        closeMenu();
    };

    const handleSearchToggle = () => {
        const nextMode = !searchMode;
        setSearchMode(nextMode);
        if (!nextMode) {
            setQuery(undefined);
            props.onSearchTextChange('');
        }
    };

    const clearText = () => {
        setQuery(undefined);
        props.onSearchTextChange('');
     };

    return (
        <Appbar.Header style={props.style}>
            {props?.showLeftActionButton && (
                <Appbar.BackAction 
                    size={16} 
                    onPress={goBack}
                    style={styles.backButton}
                    testID={'header-back-btn'}/>
            )}
            {searchMode ? (
                <View style={styles.searchFieldWrapper}>
                    <TextInput
                        value={query}
                        onChangeText={handleTextChange}
                        placeholder={props.placeholder}
                        autoFocus
                        style={styles.searchInput}
                        placeholderTextColor="#ccc"
                        testID={'search-text-input'}
                        />
                    { query && query.length > 0 && (
                        <Pressable onPress={clearText} style={styles.clearButton} testID={'clear-input-btn'}>
                            <MaterialCommunityIcons name="close-circle" size={20} color="#ccc" />
                        </Pressable>
                    )}
                </View>
            ) : (
                <Appbar.Content title={props.title} />
            )}
            <Menu
                visible={menuVisible}
                onDismiss={closeMenu}
                anchor={
                  <Appbar.Action icon="filter-variant" onPress={openMenu} />
                }
            >
                {options.map((option) => (
                    <Menu.Item
                     key={option}
                     onPress={() => handleSelect(option)}
                     title={
                       <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                         <Text>{option}</Text>
                         {selected === option && <Text>✓</Text>}
                       </View>
                     }
                   />
                ))}
            </Menu>
            {props?.showRightActionButton &&  (
                <Appbar.Action icon={searchMode ? 'close' : 'magnify'} onPress={handleSearchToggle} testID={'header-right-action-btn'}/>
            )}
        </Appbar.Header>
    );
}

const styles = StyleSheet.create({
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 50,
        backgroundColor: '#DCDCDC'
    },
    searchInput: {
        flex: 1,
        backgroundColor: 'transparent',
        color: '#fff',
        fontSize: 18,
        paddingLeft: 10,
    },
    clearButton: {
        paddingHorizontal: 8,
    },
    searchFieldWrapper: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
})