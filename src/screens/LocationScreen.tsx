import {
  ActivityIndicator,
  FlatList,
  Image,
  ImageBackground,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import Video from 'react-native-video';
import React, {useCallback, useEffect} from 'react';
import SearchBar from 'react-native-platform-searchbar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import SearchForCities from '../../services/searchForCities';
import City from '../../model/City';

function LocationScreen() {
  const [background, setBackground] = React.useState<string>();
  const [searchText, setSearchText] = React.useState<string>('');
  const [cities, loading] = SearchForCities(searchText);
  const [isCitiesList, setIsCitiesList] = React.useState<boolean>(false);
  const [isModal, setIsModal] = React.useState<boolean>(false);

  const retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('background');
      if (value !== null) {
        setBackground(value);
      }
    } catch (error) {
      // Error retrieving data
    }
  };
  useEffect(() => {
    retrieveData();
  }, []);

  return (

      <SafeAreaView style={styles.container}>
      <Video
          source={require("../img/Background/snowy_day.mp4")}
          style={styles.backgroundVideo}
          muted={true}
          repeat={true}
          resizeMode={"cover"}
          rate={0.5}
          ignoreSilentSwitch={"obey"}
        />
        <SearchBar
          value={searchText}
          onChangeText={(text: string) => setSearchText(text)}
          style={{width: '90%', paddingTop: 20}}
          onFocus={() => setIsCitiesList(true)}
          onCancel={() => setIsCitiesList(false)}
          placeholder="Bấm vào đây để tìm thành phố"
          inputStyle={{alignItems: 'center'}}>
          {loading ? (
            <ActivityIndicator style={{marginRight: 10}} />
          ) : undefined}
        </SearchBar>
        <View style={{backgroundColor: 'transparent', marginTop: 20}}>
          {isCitiesList ? (
            <FlatList
              data={cities}
              renderItem={({item}) => (
                <TouchableOpacity>
                  <Text
                    style={{
                      padding: 10,
                      fontSize: 18,
                      height: 44,
                      color: Colors.white,
                    }}>
                    {item.name}
                  </Text>
                </TouchableOpacity>
              )}
            />
          ) : null}
        </View>
      </SafeAreaView>
  );
}
export default LocationScreen;
const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  backgroundVideo: {
        position: "absolute",
        top: 0,
        left: 0,
        alignItems: "stretch",
        bottom: 0,
        right: 0
      },
});
