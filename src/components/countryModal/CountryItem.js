import React from 'react';
import {TouchableOpacity, View, Text, Image, StyleSheet} from 'react-native';
import {SVG} from '@/assets/svg/index';

const CountryItem = ({item, isSelected, onPress}) => {
  return (
    <TouchableOpacity style={styles.row} onPress={() => onPress(item)}>
      <View style={styles.leftSection}>
        <Image
          source={{uri: item.flag}}
          style={{width: 28, height: 20, borderRadius: 3}}
        />
        <View style={styles.textContainer}>
          <Text style={styles.countryName}>{item.name}</Text>
          <Text style={styles.countryCode}>{item.code}</Text>
        </View>
      </View>
      {isSelected ? <SVG.BlueCheck /> : <SVG.RightArrow />}
    </TouchableOpacity>
  );
};

export default React.memo(CountryItem);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    flexDirection: 'column',
    paddingLeft: 10,
  },
  countryName: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: 'Mulish-Bold',
    color: '#002859',
    letterSpacing: 0.2,
  },
  countryCode: {
    fontSize: 12,
    lineHeight: 16,
    color: '#647184',
    fontFamily: 'Mulish-Regular',
  },
});
