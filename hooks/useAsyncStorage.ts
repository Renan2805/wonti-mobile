import AsyncStorage from '@react-native-async-storage/async-storage'

const storeData = (key: string, value: string) => {
  try {
    AsyncStorage.setItem(key, value)
  } catch (e) {
    console.error(e)
  }
}

const getData = async (key: string) => {
  try {
    return await AsyncStorage.getItem(key);
    // if (data !== null) {
    //   console.log(data);
    //   return data;
    // }
  } catch (error) {
    console.log(error);
  }
}

const getMultipleData = async (keys: Array<string>) => {
  try {
    return await AsyncStorage.multiGet(keys)
  } catch (error) {
    console.log(error)
  }
}


export {storeData, getData, getMultipleData}