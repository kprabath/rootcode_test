import React from 'react';
import {
  Text,
  View,
  Image,
  SafeAreaView,
  Modal,
  StyleSheet,
  Dimensions,
  Pressable,
} from 'react-native';
import RowText from './RowText';
import CloseIcon from './CloseIcon';
import {formatDateString2} from '../utilities/CommonFunctions';



const DetailModal = ({modalVisible, selectedItem, setModalVisible}) => {
  return (
    <Modal
      animationType="slide"
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible();
      }}>
      <SafeAreaView style={styles.container}>
        <View style={styles.subContainer}>
          <CloseIcon close={() => setModalVisible()} />
          <View style={styles.imgContainer}>
            <Image
              style={styles.image}
              resizeMode={'cover'}
              source={{uri: selectedItem?.artworkUrl100}}
            />
          </View>

          <View>
            <RowText name={selectedItem?.trackName} />
            <RowText name={selectedItem?.collectionName} />
            <RowText name={selectedItem?.artistName} />
            <RowText name={`${selectedItem?.collectionPrice}USD`} />
            <RowText name={formatDateString2(selectedItem?.releaseDate)} />
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    height: 150,
    width: 150,
  },
  imgContainer: {
    height: Dimensions.get('window').height * 0.3,
    justifyContent: 'center',
  },
  subContainer: {
    alignItems: 'center',
  },
});

export default DetailModal;
