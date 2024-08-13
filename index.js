/**
 * @module SmartSearchBox
 *
 * This module exports a `SmartSearchBox` component designed for React Native applications.
 * The component provides an advanced search input with a range of features to enhance user
 * search experiences. It includes capabilities such as filtering,
 * and customizable styling, making it suitable for a variety of search use cases.
 * 
 * @author Bhagyesh Jain [bhagyesh.chhabra@gmail.com]
 * @author Dilip Thakar [dilipthakkarnew@gmail.com]
 */
import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Modal,
  FlatList,
  Animated,
  Image,
} from 'react-native';
import filter from "./assets/filter.png";
import search from "./assets/search.png";
import cancel from "./assets/cancel.png";

/**
 * 
 * A Smart Search Box component that provides a user-friendly UI with a variety of features and animations.
 * 
 * This component includes functionalities such as search input, filter options, and customizable behaviors
 * like expansion and collapsibility. It is designed to enhance the search experience in React Native applications.
 * 
 * @component
 * @param {string} placeholder - The placeholder text displayed in the input box.
 * @param {function(string): void} onSearch - Callback function that is triggered when a search is performed. 
 *   Receives the updated value of the input text.
 * @param {Object[]} filterOptions - An array of filter options to be displayed alongside the search box. 
 *   Each option should be an object with properties like `label` and `value`.
 * @param {function(Object): void} onChangeFilterOption - Callback function that is triggered when the filter option is changed.
 *   Receives the selected filter option object.
 * @param {function(): void} onSubmit - Callback function that is triggered when the user presses enter or clicks the search button.
 * @param {boolean} [isExpanded=false] - Boolean indicating if the search box should be expanded by default.
 * @param {boolean} [isCollapsible=true] - Boolean indicating if the search box can be collapsed or not.
 * 
 * @returns {JSX.Element} The rendered SmartSearchBox component.
 */
const SmartSearchBox = ({placeHolder, onSearch, filterOptions, onChangeFilterOption, onSubmit, isExpanded, isCollapsible = true}) => {
  
  // State to store the value of input box
  const [text, setText] = useState('');

  // State to store the expansion state of the component
  const [expand, setExpand] = useState(!isCollapsible || isExpanded || false);

  // Reference of the animated width property
  const animatedWidth = useRef(
    new Animated.Value(expand ? Dimensions.get('window').width * 0.9 : 40),
  ).current;

  // Reference of the input box
  const inputRef = useRef(null);

  /**
   * Toggles the expansion state and animates the width of the component.
   * If currently expanded, it collapses the component and vice versa.
   */
  const handleToggleExpand = () => {
    const isExpanded = expand;
    focusInput();
    animateWidth(!isExpanded);
    setExpand(!isExpanded);
  };

  /**
   * Clears the input field by setting the text state to an empty string
   */
  const clearInput = () => {
    setText('');
    onSearch('');
  };

  /**
   * Handles the change in text input.
   * 
   * Updates the text state and triggers the search callback.
   * 
   * @param {String} value - The new value of the text input.
   */
  const onChangeText = value => {
    setText(value);
    onSearch(value);
  };

  /**
   * Animates the width of the component based on the expansion state.
   * 
   * @param {boolean} expand - The target expansion state.
   */
  const animateWidth = expand => {
    Animated.timing(animatedWidth, {
      toValue: expand ? Dimensions.get('window').width * 0.9 : 40,
      duration: 500,
      useNativeDriver: false, // width animation doesn't support native driver
    }).start();
  };

  /**
   * Focuses the input field if the reference is available.
   */
  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <Animated.View style={[styles.container, {width: animatedWidth}]}>
      <TouchableOpacity
        disabled={!isCollapsible}
        onPress={handleToggleExpand}
        style={styles.inputGroupContainer}>
          <Image source={search} style={styles.icon} />
      </TouchableOpacity>
      <TextInput
        ref={inputRef}
        style={styles.input}
        placeholder={placeHolder || "Search"}
        value={text}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmit}
      />
      {text ? (
        <TouchableOpacity onPress={clearInput}>
          <Image source={cancel} style={[styles.clearIcon]} />
        </TouchableOpacity>
      ) : null}
      {filterOptions && filterOptions.length > 0 && (
        <>
          <View style={styles.divider}></View>
          <FilterBox
            style={styles.dropdown}
            items={filterOptions}
            onValueChange={onChangeFilterOption}
          />
        </>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    margin: 20,
    height: 50,
    width: 40,
    overflow: 'hidden',
  },
  inputGroupContainer: {
    backgroundColor: '#eee', 
    height: '100%', 
    width: 40, 
    display: "flex", 
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    marginRight: 0,
    color: '#aaa',
    width: 20,
    height: 20,
  },
  input: {
    flex: 1,
    padding: 10,
  },
  divider: {
    width: 2,
    height: 40,
    backgroundColor: '#ccc',
    marginLeft: 5,
  },
  dropdown: {
    width: 50,
    maxHeight: 30,
    marginTop: 5,
    borderColor: 'transparent',
    alignSelf: 'flex-end',
  },
  clearIcon: {
    marginRight: 5,
    width: 25,
    height: 25,
  },
});

const FilterBox = ({items, onValueChange}) => {
  const [selectedValue, setSelectedValue] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [position, setPosition] = useState({top: 0, right: 0});
  const selectBoxRef = useRef();

  const handleSelect = item => {
    setSelectedValue(item);
    onValueChange(item.value);
    setModalVisible(false);
  };

  const openModal = () => {
    selectBoxRef.current.measure((fx, fy, width, height, px, py) => {
      const windowWidth = Dimensions.get('window').width;
      const rightMargin = windowWidth - px - width;
      setPosition({top: py + height + 10, right: rightMargin});
      setModalVisible(true);
    });
  };

  return (
    <View>
      <TouchableOpacity
        ref={selectBoxRef}
        style={filterBoxStyles.selectBox}
        onPress={openModal}>
        <Image source={filter} style={styles.icon} />
      </TouchableOpacity>
      {/* Options list modal box */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="none"
        onRequestClose={() => setModalVisible(false)}>
        <TouchableOpacity
          style={filterBoxStyles.modalOverlay}
          onPress={() => setModalVisible(false)}>
          <View
            style={[
              filterBoxStyles.modalContainer,
              {top: position.top, right: position.right},
            ]}>
            <FlatList
              data={items}
              keyExtractor={item => item.value.toString()}
              renderItem={({item}) => (
                <TouchableOpacity
                  style={[
                    filterBoxStyles.item,
                    selectedValue && selectedValue.value == item.value
                      ? filterBoxStyles.selected
                      : {},
                  ]}
                  onPress={() => handleSelect(item)}>
                  <Text>{item.label}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const filterBoxStyles = StyleSheet.create({
  selectBox: {
    minWidth: 40,
    padding: 10,
    alignItems: 'center',
  },
  modalOverlay: {
    flex: 1,
  },
  modalContainer: {
    position: 'absolute',
    backgroundColor: 'white',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    maxHeight: 200,
    width: Dimensions.get('window').width * 0.5,
    alignSelf: 'center',
  },
  item: {
    padding: 10,
    textAlign: 'flex-end',
  },
  selected: {
    backgroundColor: '#ccc',
  },
});

export default SmartSearchBox;
