import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useQuranData } from '../hooks/useQuranData';
import { useOfflineStorage } from '../hooks/useOfflineStorage';
import Icon from 'react-native-vector-icons/MaterialIcons';

const HomeScreen: React.FC = () => {
  const { surahs, loading, error, fetchSurahAyahs } = useQuranData();
  const [expandedSurah, setExpandedSurah] = useState<number | null>(null);
  
  const { data: lastRead, setData: setLastRead } = useOfflineStorage('lastRead', {
    surah: 'Al-Fatiha',
    ayah: 1,
  });

  const handleSurahPress = async (surah: any) => {
    const isExpanding = expandedSurah !== surah.number;
    setExpandedSurah(isExpanding ? surah.number : null);
    
    if (isExpanding && !surah.ayahs) {
      await fetchSurahAyahs(surah.number);
    }

    setLastRead({
      surah: surah.englishName,
      ayah: 1,
    });
  };

  const handleSearch = () => {
    Alert.alert('Search', 'Search functionality coming soon!');
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <TouchableOpacity>
        <Icon name="menu" size={24} color="#fff" />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Quran App</Text>
      <TouchableOpacity onPress={handleSearch}>
        <Icon name="search" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );

  const renderLastRead = () => (
    <View style={styles.lastReadContainer}>
      <View style={styles.lastReadContent}>
        <Icon name="book" size={24} color="#fff" style={styles.bookIcon} />
        <View>
          <Text style={styles.lastReadTitle}>Last Read</Text>
          <Text style={styles.lastReadText}>
            {lastRead.surah} - Ayah {lastRead.ayah}
          </Text>
        </View>
      </View>
      <Image
        source={require('../assets/quran.png')}
        style={styles.quranImage}
        resizeMode="contain"
      />
    </View>
  );

  const renderSurahItem = ({ item }: { item: any }) => (
    <View>
      <TouchableOpacity
        style={styles.surahItem}
        onPress={() => handleSurahPress(item)}
      >
        <View style={styles.surahNumber}>
          <Text style={styles.surahNumberText}>{item.number}</Text>
        </View>
        <View style={styles.surahInfo}>
          <Text style={styles.surahName}>{item.englishName}</Text>
          <Text style={styles.surahDetails}>
            {item.revelationType} - {item.numberOfAyahs} Verses
          </Text>
        </View>
        <Text style={styles.surahArabicName}>{item.name}</Text>
      </TouchableOpacity>
      {expandedSurah === item.number && item.ayahs && (
        <View style={styles.ayahContainer}>
          {item.ayahs.map((ayah: any) => (
            <Text key={ayah.number} style={styles.ayahText}>
              {ayah.numberInSurah}. {ayah.text}
            </Text>
          ))}
        </View>
      )}
    </View>
  );

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
      {renderHeader()}
      <View style={styles.content}>
        <Text style={styles.greeting}>Assalamualaikum</Text>
        <Text style={styles.name}>Ayaan Ahmad</Text>
        {renderLastRead()}
        <View style={styles.tabContainer}>
          <Text style={styles.activeTab}>Surah</Text>
          <Text style={styles.tab}>Para</Text>
          <Text style={styles.tab}>Page</Text>
          <Text style={styles.tab}>Hijb</Text>
        </View>
        <FlatList
          data={surahs}
          keyExtractor={(item) => item.number.toString()}
          renderItem={renderSurahItem}
          style={styles.list}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#6C63FF',
    },
    content: {
      flex: 1,
      paddingTop: 16,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 16,
      paddingTop: 48,
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
    headerTitle: {
      fontSize: 22,
      fontWeight: 'bold',
      color: '#fff',
      letterSpacing: 0.5,
    },
    centerContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',
    },
    greeting: {
      fontSize: 16,
      color: '#fff',
      marginLeft: 16,
      marginBottom: 4,
      fontWeight: '500',
      opacity: 0.9,
    },
    name: {
      fontSize: 26,
      fontWeight: 'bold',
      color: '#fff',
      marginLeft: 16,
      marginTop: 4,
      letterSpacing: 0.5,
    },
    lastReadContainer: {
      margin: 16,
      borderRadius: 20,
      padding: 16,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: 'rgba(255, 255, 255, 0.15)',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    lastReadContent: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    bookIcon: {
      marginRight: 12,
      opacity: 0.9,
    },
    lastReadTitle: {
      color: '#fff',
      fontSize: 14,
      marginBottom: 4,
      opacity: 0.9,
    },
    lastReadText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
    },
    quranImage: {
      width: 80,
      height: 80,
      opacity: 0.9,
    },
    tabContainer: {
      flexDirection: 'row',
      paddingHorizontal: 16,
      marginTop: 24,
      marginBottom: 8,
      borderBottomWidth: 1,
      borderBottomColor: 'rgba(255, 255, 255, 0.2)',
    },
    tab: {
      marginRight: 24,
      paddingBottom: 12,
      color: 'rgba(255, 255, 255, 0.7)',
      fontSize: 16,
      fontWeight: '500',
    },
    activeTab: {
      marginRight: 24,
      paddingBottom: 12,
      color: '#fff',
      borderBottomWidth: 3,
      borderBottomColor: '#fff',
      fontSize: 16,
      fontWeight: '600',
    },
    list: {
      backgroundColor: '#fff',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      marginTop: 16,
      paddingTop: 8,
    },
    surahItem: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: 'rgba(0, 0, 0, 0.1)',
      backgroundColor: '#fff',
    },
    surahNumber: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: 'rgba(108, 99, 255, 0.1)',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 16,
    },
    surahNumberText: {
      color: '#6C63FF',
      fontWeight: 'bold',
      fontSize: 14,
    },
    surahInfo: {
      flex: 1,
    },
    surahName: {
      fontSize: 17,
      fontWeight: '600',
      color: '#333',
      marginBottom: 4,
    },
    surahDetails: {
      fontSize: 13,
      color: '#666',
      fontWeight: '500',
    },
    surahArabicName: {
      fontSize: 20,
      color: '#6C63FF',
      marginLeft: 16,
      fontWeight: '500',
    },
    ayahContainer: {
      padding: 16,
      backgroundColor: 'rgba(108, 99, 255, 0.05)',
      borderBottomWidth: 1,
      borderBottomColor: 'rgba(0, 0, 0, 0.1)',
    },
    ayahText: {
      fontSize: 15,
      color: '#333',
      lineHeight: 24,
      marginBottom: 12,
      paddingHorizontal: 8,
    },
    errorContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',
      padding: 20,
    },
    errorText: {
      fontSize: 16,
      color: '#666',
      textAlign: 'center',
      marginTop: 8,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',
    },
    shadow: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
  });
  


export default HomeScreen;