import React, {useState, useEffect} from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';
import {SVG} from '@/assets/svg/index';

const CurrencyModal = ({
  visible,
  onClose,
  onSelectCurrency,
  selectedCurrency,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const currencies = [
    {name: 'Euro', code: 'EUR'},
    {name: 'Dólar Estadounidense', code: 'USD'},
    {name: 'Libra Esterlina', code: 'GBP'},
  ];

  const [filteredCurrencies, setFilteredCurrencies] = useState(currencies);

  useEffect(() => {
    const filtered = currencies.filter(
      currency =>
        currency.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        currency.code.toLowerCase().includes(searchQuery.toLowerCase()),
    );
    setFilteredCurrencies(filtered);
  }, [searchQuery]);

  const handleSelectCurrency = currency => {
    onSelectCurrency(currency);
    onClose();
  };

  const selectSvg = code => {
    switch (code) {
      case 'EUR':
        return <SVG.Euro />;
      case 'USD':
        return <SVG.Usd />;
      case 'GBP':
        return <SVG.Libra />;
      default:
        return <SVG.Usd />;
    }
  };

  return (
    <Modal animationType="slide" transparent={false} visible={visible}>
      <View style={styles.container}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 10,
            marginBottom: 20,
          }}>
          <TouchableOpacity onPress={onClose}>
            <SVG.BackArrow />
          </TouchableOpacity>
          <Text style={styles.title}>Selecciona una divisa</Text>
          <View />
        </View>

        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <FlatList
          data={filteredCurrencies}
          keyExtractor={item => item.code}
          renderItem={({item}) => {
            const isSelected = item.code === selectedCurrency.code;
            return (
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
                onPress={() => handleSelectCurrency(item)}>
                <View style={styles.leftSection}>
                  {selectSvg(item.code)}
                  <View style={styles.textContainer}>
                    <Text style={styles.currencyName}>{item.name}</Text>
                    <Text style={styles.currencyCode}>{item.code}</Text>
                  </View>
                </View>

                {isSelected ? <SVG.BlueCheck /> : <SVG.RightArrow />}
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </Modal>
  );
};

export default CurrencyModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: 10,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#002859',
    lineHeight: 22,
    textAlign: 'center',
  },
  searchContainer: {
    backgroundColor: '#F2F2F2',
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  searchInput: {
    fontSize: 16,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    paddingTop: 15,
  },
  textContainer: {
    flexDirection: 'column',
    paddingLeft: 10,
  },
  currencyName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  currencyCode: {
    fontSize: 14,
    color: '#999',
  },
  checkMark: {
    color: '#007AFF',
    fontSize: 18,
    marginRight: 8,
  },
});
