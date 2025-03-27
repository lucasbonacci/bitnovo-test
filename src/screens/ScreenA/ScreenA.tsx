import {View, Text, Button} from 'react-native';

function ScreenA({navigation}: {navigation: any}) {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Screen A</Text>
      <Button
        title="Volver a Screen BBBBBBBBBBBB"
        onPress={() => navigation.navigate('ScreenB')}
      />
    </View>
  );
}

export default ScreenA;
