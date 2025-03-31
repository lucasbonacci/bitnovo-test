import React, { useState, useEffect} from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {SVG} from '@/assets/svg';
import CountryItem from './CountryItem';
import {Country} from '@/types/Country';

interface RestCountry {
  translations?: {
    spa?: {
      common?: string;
    };
  };
  name: {
    common: string;
  };
  idd?: {
    root?: string;
    suffixes?: string[];
  };
  cca2: string;
  flags: {
    png: string;
  };
}

interface CountryModalProps {
  visible: boolean;
  onClose: () => void;
  selectedCountry?: Country | null;
  setSelectedCountry: (country: Country) => void;
}

export const CountryModal: React.FC<CountryModalProps> = ({
  visible,
  onClose,
  selectedCountry,
  setSelectedCountry,
}) => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await fetch('https://restcountries.com/v3.1/all?lang=es');
        const data = (await res.json()) as RestCountry[];

        const formatted = data
          .filter(c => c.idd?.root && c.idd?.suffixes && c.idd.suffixes.length > 0)
          .map(c => ({
            name: c.translations?.spa?.common || c.name.common,
            code: `${c.idd?.root || ''}${c.idd?.suffixes?.[0] || ''}`,
            cca2: c.cca2,
            flag: c.flags.png,
          }))
          .sort((a, b) => a.name.localeCompare(b.name));

        setCountries(formatted);
        setFilteredCountries(formatted);
      } catch (error) {
        console.error('Error fetching countries:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    const filtered = countries.filter(country => {
      const lowerName = country.name.toLowerCase();
      const lowerCode = country.code.toLowerCase();
      const lowerQuery = searchQuery.toLowerCase();
      return lowerName.includes(lowerQuery) || lowerCode.includes(lowerQuery);
    });
    setFilteredCountries(filtered);
  }, [searchQuery, countries]);

  const handleSelectCountry = (country: Country) => {
    setSelectedCountry(country);
    setSearchQuery('');
    onClose();
  };

  return (
    <Modal animationType="slide" transparent={false} visible={visible}>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <TouchableOpacity onPress={onClose}>
            <SVG.BackArrow />
          </TouchableOpacity>
          <Text style={styles.title}>Selecciona un país</Text>
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

        {loading ? (
          <ActivityIndicator
            size="large"
            color="#002859"
            style={{marginTop: 20}}
          />
        ) : (
          <FlatList
            data={filteredCountries}
            removeClippedSubviews
            initialNumToRender={10}
            maxToRenderPerBatch={10}
            windowSize={5}
            keyExtractor={item => item.code + item.name}
            renderItem={({item}) => (
              <CountryItem
                item={item}
                isSelected={item.code === selectedCountry?.code}
                onPress={handleSelectCountry}
              />
            )}
          />
        )}
      </View>
    </Modal>
  );
};

export default CountryModal;

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
  },
});
