import React, { memo} from 'react';
import {TouchableOpacity, View, Text, Image, StyleSheet} from 'react-native';
import {SVG} from '@/assets/svg';
import {Country} from '@/types/Country';


interface CountryItemProps {
  item: Country;
  isSelected: boolean;
  onPress: (country: Country) => void;
}

const CountryItem: React.FC<CountryItemProps> = ({item, isSelected, onPress}) => {
  return (
    <TouchableOpacity style={styles.row} onPress={() => onPress(item)}>
      <View style={styles.leftSection}>
        <Image
          source={{uri: item.flag}}
          style={{width: 28, height: 28, borderRadius: 14}}
        />
        <View style={styles.textContainer}>
          <Text style={styles.countryCode}>{item.code}</Text>
          <Text style={styles.countryName}>{item.name}</Text>
        </View>
      </View>
      {isSelected ? <SVG.BlueCheck /> : <SVG.RightArrow />}
    </TouchableOpacity>
  );
};

export default memo(CountryItem);

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
    fontSize: 12,
    lineHeight: 16,
    color: '#647184',
    fontFamily: 'Mulish-Regular',
  },
  countryCode: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: 'Mulish-Bold',
    color: '#002859',
    letterSpacing: 0.2,
  },
});
