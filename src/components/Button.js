import React from 'react';
import {TouchableOpacity, Text, StyleSheet, View} from 'react-native';

const Button = ({label, disabled, onPress, icon, variant = 'primary'}) => {
  let buttonStyle = {};
  let textStyle = {};

  switch (variant) {
    case 'primary':
      buttonStyle = {
        backgroundColor: disabled ? '#EAF3FF' : '#035AC5',
      };
      textStyle = {
        color: disabled ? '#71B0FD' : '#FFFFFF',
      };
      break;

    case 'secondary':
      buttonStyle = {
        backgroundColor: disabled ? '#D3DCE6' : '#F9FAFC',
      };
      textStyle = {
        color: '#035AC5',
      };
      break;

    case 'iconOnly':
      buttonStyle = {
        backgroundColor: '#035AC5',
        padding: 10,
      };
      break;

    case 'small':
      buttonStyle = {
        backgroundColor: '#035AC5',
        paddingVertical: 6,
        paddingHorizontal: 12,
      };
      textStyle = {
        color: '#FFFFFF',
        fontSize: 12,
      };
      break;

    default:
      buttonStyle = {
        backgroundColor: disabled ? '#AECFFF' : '#007BFF',
      };
      textStyle = {
        color: disabled ? '#6D6D6D' : '#FFFFFF',
      };
      break;
  }

  return (
    <TouchableOpacity
      style={[styles.buttonBase, buttonStyle]}
      onPress={disabled ? null : onPress}
      disabled={disabled}>
      <View style={styles.content}>
        {variant !== 'iconOnly' && label ? (
          <Text style={[styles.text, textStyle]}>{label}</Text>
        ) : null}
        {icon ? <View style={styles.iconContainer}>{icon}</View> : null}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonBase: {
    borderRadius: 6,
    paddingVertical: 18,
    paddingHorizontal: 16,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 14,
    fontFamily: 'Mulish-Bold',
  },
  iconContainer: {
    marginLeft: 8,
  },
});

export default Button;
