import React, {useState} from 'react';
import {
  Text,
  View,
  FlatList,
  SafeAreaView,
  TextInput,
  StyleSheet,
  Image,
  Dimensions,
  Pressable,
} from 'react-native';
import {getTrackData} from '../services/FetchApi';
import RowText from '../components/RowText';
import DetailModal from '../components/DetailModal';

const Empty = () => (
  <View style={styles.emptyCmp}>
    <Text>No Data Available</Text>
  </View>
);

const RowItem = ({
  onPress,
  item,
}) => (
  <Pressable
    style={styles.row}
    onPress={() => {
      onPress(item);
    }}>
    <View style={styles.imageContainer}>
      <Image style={styles.thumbnail} source={{uri: item?.artworkUrl100}} />
    </View>
    <View style={{flex: 0.7}}>
      <RowText name={item?.trackName} />
      <RowText name={item?.collectionName} />
      <RowText name={item?.artistName} />
    </View>
  </Pressable>
);

export default function HomeScreen(props) {
  const [songData, setSongData] = useState('');
  const [data, setData] = useState([]);
  const [isDetailModalVisible, setDetailModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const toggleDetailModal = () => setDetailModalVisible(!isDetailModalVisible);
  const onSelect = item => {
    setSelectedItem(item);
    toggleDetailModal();
  };
  const getSongsData = text => {
    /// FETCHING UP THE TRACK DATA

    setSongData(text);
    if (text != null) {
      getTrackData(text)
        .then(response => response.data)
        .then(data => {
          console.log('DATA', JSON.stringify(data));
          setData(data?.results);
        });
    } else if (text == null) {
      setData([]);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainContent}>
        <TextInput
          onChangeText={getSongsData}
          value={songData}
          placeholder={'Search Artist'}
          style={styles.textInput}
        />
        <View style={styles.listContainer}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={data}
            ListEmptyComponent={<Empty />}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => <RowItem item={item} onPress={onSelect} />}
          />
        </View>
        <DetailModal
          modalVisible={isDetailModalVisible}
          selectedItem={selectedItem}
          setModalVisible={() => toggleDetailModal()}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContent: {
    padding: 10,
    flex: 1,
  },
  textInput: {
    height: 50,
    padding: 5,
    borderColor: 'lightgrey',
    borderWidth: 1,
    //backgroundColor: 'red',
  },
  listContainer: {
    paddingVertical: 20,
    flex: 1,
    //alignItems: 'center',
  },
  rowText: {
    padding: 5,
  },
  imageContainer: {
    flex: 0.3,
    alignItems: 'center',
  },
  row: {
    minHeight: 100,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  emptyCmp: {
    height: Dimensions.get('window').height * 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  thumbnail: {height: 100, width: 100},
});
