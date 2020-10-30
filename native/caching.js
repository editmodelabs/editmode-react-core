import { AsyncStorage } from 'react-native';

export const getCachedData = async (id) => {
  try {
    return await AsyncStorage.getItem(id);
  } catch (error) {
    console.error('Error in fetching chunk.', error);
  }
}

export const storeCache = async (id, data) => {
  try {
    await AsyncStorage.setItem(
      id,
      JSON.stringify(data)
    );
  } catch (error) {
    console.error('Error in saving chunk.', error);
  }
}
