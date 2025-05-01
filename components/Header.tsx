import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { Appbar, TextInput } from "react-native-paper";
import debounce from 'lodash.debounce';

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
    title: string;
    placeholder?: string;
    initialQuery: string;
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
                    testID={'header-back-button'}/>
            )}
            <Appbar.Content title={props.title}/>
            {props?.showRightActionButton && props.rightButtonOnPress &&  (
                <Appbar.Action icon={ props?.rightActionButtonIcon || 'dots-vertical'} onPress={props.rightButtonOnPress} />
            )}
        </Appbar.Header>
    );
}

export const SearchHeader = (props: SearchHeaderProps) => {
    const { goBack } = useNavigation();
    const [query, setQuery] = useState(props.initialQuery);
    const [searchMode, setSearchMode] = useState(false);

    const handleTextChange = (text: string) => {
        setQuery(text);
        props.onSearchTextChange(text);
    };

    // Debounced callback
  const debouncedSearch = useCallback(
    debounce((text: string) => {
      props.onSearchTextChange(text);
    }, props.debounceDelay),
    []
  );

    const handleSearchToggle = () => {
        const nextMode = !searchMode;
        setSearchMode(nextMode);
        if (!nextMode) {
            setQuery('');
            props.onSearchTextChange('');
        }
    };

    const clearText = () => {
        setQuery('');
        props.onSearchTextChange('');
     };

    return (
        <Appbar.Header style={props.style}>
            {props?.showLeftActionButton && (
                <Appbar.BackAction 
                    size={16} 
                    onPress={goBack}
                    style={styles.backButton}
                    testID={'header-back-button'}/>
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
                        />
                    { query.length > 0 && (
                        <Pressable onPress={clearText} style={styles.clearButton}>
                            <MaterialCommunityIcons name="close-circle" size={20} color="#ccc" />
                        </Pressable>
                    )}
                </View>
            ) : (
                <Appbar.Content title={props.title} />
            )}
            {props?.showRightActionButton &&  (
                <Appbar.Action icon={searchMode ? 'close' : 'magnify'} onPress={handleSearchToggle} />
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