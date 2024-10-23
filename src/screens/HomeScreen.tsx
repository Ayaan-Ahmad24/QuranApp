import React from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { useQuranData } from '../hooks/useQuranData';
import { useOfflineStorage } from '../hooks/useOfflineStorage';
import SurahItem from '../components/SurahItem';
import LastRead from '../components/LastRead';
import { Surah, LastRead as LastReadType } from '../types/types';

const HomeScreen: React.FC = () => {
  const { surahs, loading, error } = useQuranData();
  const { data: lastRead, setData: setLastRead } = useOfflineStorage<LastReadType>('lastRead', {
    surah: 'Al-Fatiah',
    ayah: 1,
  });

  const handleSurahPress = (surah: Surah) => {
    setLastRead({
      surah: surah.name,
      ayah: 1,
    });
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#6C63FF" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text>Error loading data. Please try again later.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>Assalamualaikum</Text>
      <LastRead surah={lastRead.surah} ayah={lastRead.ayah} />
      <View style={styles.tabContainer}>
        <Text style={styles.activeTab}>Surah</Text>
        <Text style={styles.tab}>Para</Text>
        <Text style={styles.tab}>Page</Text>
        <Text style={styles.tab}>Hijb</Text>
      </View>
      <FlatList<Surah>
        data={surahs}
        keyExtractor={(item) => item.number.toString()}
        renderItem={({ item }) => (
          <SurahItem
            number={item.number}
            name={item.name}
            revelationType={item.revelationType}
            numberOfAyahs={item.numberOfAyahs}
            onPress={() => handleSurahPress(item)}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 14,
    color: '#666',
    marginTop: 16,
    marginLeft: 16,
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginTop: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  tab: {
    marginRight: 24,
    paddingBottom: 8,
    color: '#666',
  },
  activeTab: {
    marginRight: 24,
    paddingBottom: 8,
    color: '#6C63FF',
    borderBottomWidth: 2,
    borderBottomColor: '#6C63FF',
  },
});

export default HomeScreen;