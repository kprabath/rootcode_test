import {Image, Pressable} from 'react-native';
import React from 'react';

const CloseIcon = ({close}) => {
  return (
    <Pressable
      onPress={close}
      style={{position: 'absolute', top: 5, right: 10}}>
      <Image
        style={{height: 30, width: 30}}
        source={require('../assets/images/error.png')}
      />
    </Pressable>
  );
};

export default CloseIcon;
