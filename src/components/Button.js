import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  ActivityIndicator,
} from 'react-native';

const Button = ({
  label,
  disabled,
  onPress,
  icon,
  variant = 'primary',
  loading = false,
}) => {
  let buttonStyle = {};
  let textStyle = {};

  switch (variant) {
    case 'primary':
      buttonStyle = {
        backgroundColor: disabled || loading ? '#EAF3FF' : '#035AC5',
      };
      textStyle = {
        color: disabled || loading ? '#71B0FD' : '#FFFFFF',
      };
      break;

    case 'secondary':
      buttonStyle = {
        backgroundColor: disabled || loading ? '#D3DCE6' : '#F9FAFC',
      };
      textStyle = {
        color: '#035AC5',
      };
      break;

    case 'iconOnly':
      buttonStyle = {
        backgroundColor: '#035AC5',
        paddingVertical: 18,
        paddingRight: 20,
        paddingLeft: 10,
        marginLeft: 4,
        marginBottom: 12,
        minWidth: 0,
      };
      break;

    case 'small':
      buttonStyle = {
        backgroundColor: disabled ? '#EAF3FF' : '#035AC5',
        paddingVertical: 6,
        paddingHorizontal: 12,
        maxWidth: 60,
        minWidth: 0,
      };
      textStyle = {
        color: disabled ? '#71B0FD' : '#FFFFFF',
        fontSize: 12,
      };
      break;

    default:
      buttonStyle = {
        backgroundColor: disabled || loading ? '#AECFFF' : '#007BFF',
      };
      textStyle = {
        color: disabled || loading ? '#6D6D6D' : '#FFFFFF',
      };
      break;
  }

  return (
    <TouchableOpacity
      style={[styles.buttonBase, buttonStyle]}
      onPress={disabled || loading ? null : onPress}
      disabled={disabled || loading}>
      <View style={styles.content}>
        {loading ? (
          <ActivityIndicator color={textStyle.color || '#FFFFFF'} />
        ) : (
          <>
            {variant !== 'iconOnly' && label ? (
              <Text style={[styles.text, textStyle]}>{label}</Text>
            ) : null}
            {icon ? <View style={styles.iconContainer}>{icon}</View> : null}
          </>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonBase: {
    borderRadius: 6,
    paddingVertical: 18,
    paddingHorizontal: 16,
    minWidth: '100%',
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
