import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Surah } from '../types/types';

interface SurahItemProps {
  number: number;
  name: string;
  revelationType: string;
  numberOfAyahs: number;
  onPress: () => void;
}

const SurahItem: React.FC<SurahItemProps> = ({
  number,
  name,
  revelationType,
  numberOfAyahs,
  onPress,
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.numberContainer}>
        <Text style={styles.number}>{number}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.subtitle}>
          {revelationType.toUpperCase()} • {numberOfAyahs} VERSES
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
  },
  numberContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  number: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
});

export default SurahItem;
