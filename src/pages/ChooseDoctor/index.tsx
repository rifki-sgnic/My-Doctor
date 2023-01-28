import {equalTo, get, orderByChild, query, ref} from 'firebase/database';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Header, List} from '../../components';
import {db} from '../../config';
import {colors} from '../../utils';

interface ChooseDoctorProps {
  navigation: any;
  route: any;
}

const ChooseDoctor = ({navigation, route}: ChooseDoctorProps) => {
  const itemCategory = route.params;
  const [listDoctor, setListDoctor] = useState([]);

  useEffect(() => {
    getDoctorByCategory(itemCategory.category);
  }, [itemCategory.category]);

  const getDoctorByCategory = (category: string) => {
    get(query(ref(db, 'doctors/'), orderByChild('category'), equalTo(category)))
      .then(snapshot => {
        if (snapshot.exists()) {
          const dataObj = snapshot.val();
          const data: any = [];
          Object.keys(dataObj).map(key => {
            data.push({
              id: key,
              data: dataObj[key],
            });
          });
          setListDoctor(data);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <View style={styles.page}>
      <Header
        title={`Pilih ${itemCategory.category}`}
        type="dark"
        onPress={() => navigation.goBack()}
      />
      {listDoctor.map((item: any) => {
        return (
          <List
            key={item.id}
            type="next"
            profile={{uri: item.data.photo}}
            name={item.data.fullName}
            desc={item.data.gender}
            onPress={() => navigation.navigate('DoctorProfile', item)}
          />
        );
      })}
    </View>
  );
};

export default ChooseDoctor;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.white,
  },
});
