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
import {SVG} from '@/assets/svg';
import {Currency} from '@/types/Currency';

interface CurrencyModalProps {
  visible: boolean;
  onClose: () => void;
  onSelectCurrency: (currency: Currency) => void;
  selectedCurrency: Currency;
}

const CurrencyModal: React.FC<CurrencyModalProps> = ({
  visible,
  onClose,
  onSelectCurrency,
  selectedCurrency,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const currencies: Currency[] = [
    {name: 'Euro', code: 'EUR'},
    {name: 'Dólar Estadounidense', code: 'USD'},
    {name: 'Libra Esterlina', code: 'GBP'},
  ];

  const [filteredCurrencies, setFilteredCurrencies] =
    useState<Currency[]>(currencies);

  useEffect(() => {
    const filtered = currencies.filter(currency => {
      const lowerName = currency.name.toLowerCase();
      const lowerCode = currency.code.toLowerCase();
      const lowerQuery = searchQuery.toLowerCase();

      return lowerName.includes(lowerQuery) || lowerCode.includes(lowerQuery);
    });
    setFilteredCurrencies(filtered);
  }, [searchQuery]);

  const handleSelectCurrency = (currency: Currency) => {
    onSelectCurrency(currency);
    setSearchQuery('');
    onClose();
  };

  const selectSvg = (code: string) => {
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
        <View style={styles.titleContainer}>
          <TouchableOpacity onPress={onClose}>
            <SVG.BackArrow />
          </TouchableOpacity>
          <Text style={styles.title}>Selecciona una divisa</Text>
          <View style={{width: 28}} />
        </View>

        <View style={styles.searchContainer}>
          <SVG.SearchIcon />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar"
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#647184"
          />
        </View>

        <FlatList
          data={filteredCurrencies}
          keyExtractor={item => item.code}
          renderItem={({item}) => {
            const isSelected = item.code === selectedCurrency.code;
            return (
              <TouchableOpacity
                style={styles.listItem}
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
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 25,
  },
  title: {
    fontFamily: 'Mulish-Bold',
    fontSize: 18,
    lineHeight: 22,
    color: '#002859',
    textAlign: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: '#E5E9F2',
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
    color: '#647184',
    fontFamily: 'Mulish-Regular',
    backgroundColor: '#FFFFFF',
    marginLeft: 8,
    letterSpacing: 0.2,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
    paddingTop: 5,
  },
  currencyName: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: 'Mulish-Bold',
    color: '#002859',
    letterSpacing: 0.2,
  },
  currencyCode: {
    fontSize: 12,
    lineHeight: 16,
    color: '#647184',
    fontFamily: 'Mulish-Regular',
  },
});
