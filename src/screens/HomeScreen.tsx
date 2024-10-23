import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  Image,
  Animated,
} from "react-native";
import { useQuranData } from "../hooks/useQuranData";
import { useOfflineStorage } from "../hooks/useOfflineStorage";
import { Surah, LastRead as LastReadType, Ayah } from "../types/types";
import Icon from "react-native-vector-icons/MaterialIcons";

const HomeScreen: React.FC = () => {
  const { surahs, loading, error } = useQuranData();
  const [expandedSurah, setExpandedSurah] = useState<number | null>(null);
  const { data: lastRead, setData: setLastRead } =
    useOfflineStorage<LastReadType>("lastRead", {
      surah: "Al-Fatiha",
      ayah: 1,
    });

  const handleSurahPress = (surah: Surah) => {
    setExpandedSurah(expandedSurah === surah.number ? null : surah.number);
    setLastRead({
      surah: surah.nameEnglish,
      ayah: 1,
    });
  };

  const handleSearch = () => {
    Alert.alert("Search", "Search functionality coming soon!");
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
        source={require("../assets/quran.png")}
        style={styles.quranImage}
        resizeMode="contain"
      />
    </View>
  );

  const renderSurahItem = ({ item }: { item: Surah }) => (
    <View>
      <TouchableOpacity
        style={styles.surahItem}
        onPress={() => handleSurahPress(item)}
      >
        <View style={styles.surahNumber}>
          <Text style={styles.surahNumberText}>{item.number}</Text>
        </View>
        <View style={styles.surahInfo}>
          <Text style={styles.surahName}>{item.nameEnglish}</Text>
          <Text style={styles.surahDetails}>
            {item.revelationType} - {item.numberOfAyahs} Verses
          </Text>
        </View>
        <Text style={styles.surahArabicName}>{item.name}</Text>
      </TouchableOpacity>
      {expandedSurah === item.number && (
        <View style={styles.ayahContainer}>
          {item.ayahs?.map((ayah: Ayah) => (
            <Text key={ayah.number} style={styles.ayahText}>
              {ayah.number}. {ayah.text}
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
    backgroundColor: "#6C63FF",
  },
  content: {
    flex: 1,
    paddingTop: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    paddingTop: 48,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  greeting: {
    fontSize: 14,
    color: "#fff",
    marginLeft: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginLeft: 16,
    marginTop: 4,
  },
  lastReadContainer: {
    margin: 16,
    borderRadius: 20,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  lastReadContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  bookIcon: {
    marginRight: 12,
  },
  lastReadTitle: {
    color: "#fff",
    fontSize: 12,
    marginBottom: 4,
  },
  lastReadText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  quranImage: {
    width: 80,
    height: 80,
  },
  tabContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    marginTop: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.2)",
  },
  tab: {
    marginRight: 24,
    paddingBottom: 8,
    color: "rgba(255, 255, 255, 0.7)",
  },
  activeTab: {
    marginRight: 24,
    paddingBottom: 8,
    color: "#fff",
    borderBottomWidth: 2,
    borderBottomColor: "#fff",
  },
  list: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: 16,
  },
  surahItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  surahNumber: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
  },
  surahNumberText: {
    color: "#6C63FF",
    fontWeight: "bold",
  },
  surahInfo: {
    flex: 1,
    marginLeft: 16,
  },
  surahName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  surahDetails: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
  },
  surahArabicName: {
    fontSize: 18,
    color: "#6C63FF",
  },
  ayahContainer: {
    padding: 16,
    backgroundColor: "#f9f9f9",
  },
  ayahText: {
    fontSize: 14,
    color: "#333",
    marginBottom: 8,
  },
});

export default HomeScreen;
