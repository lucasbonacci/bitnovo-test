import {View, Text, Button} from 'react-native';

function ScreenB({navigation}: {navigation: any}) {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Screen B</Text>
      <Button
        title="Volver a Screen A"
        onPress={() => navigation.navigate('ScreenA')}
      />
    </View>
  );
}

export default ScreenB;
