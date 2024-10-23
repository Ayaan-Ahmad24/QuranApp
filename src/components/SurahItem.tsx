import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface LastReadProps {
  surah: string;
  ayah: number;
}

const LastRead: React.FC<LastReadProps> = ({ surah, ayah }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Last Read</Text>
      <Text style={styles.surah}>{surah}</Text>
      <Text style={styles.ayah}>Ayah No. {ayah}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#6C63FF',
    borderRadius: 16,
    padding: 16,
    marginVertical: 16,
    marginHorizontal: 16,
  },
  title: {
    color: '#fff',
    fontSize: 14,
    opacity: 0.8,
  },
  surah: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 8,
  },
  ayah: {
    color: '#fff',
    fontSize: 14,
    marginTop: 4,
  },
});

export default LastRead;