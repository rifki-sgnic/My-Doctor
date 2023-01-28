import {
  child,
  get,
  limitToLast,
  orderByChild,
  query,
  ref,
} from 'firebase/database';
import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {
  DoctorCategory,
  Gap,
  HomeProfile,
  NewsItem,
  RatedDoctor,
} from '../../components';
import {db} from '../../config';
import {colors, fonts, showError} from '../../utils';

const Doctor = ({navigation}: any) => {
  const [news, setNews] = useState([]);
  const [categoryDoctor, setCategoryDoctor] = useState([]);
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const dbRef = ref(db);
    getCategoryDoctors(dbRef);
    getNews(dbRef);
    getTopRatedDoctors();
  }, []);

  const getNews = (dbRef: any) => {
    get(child(dbRef, 'news/'))
      .then(snapshot => {
        if (snapshot.exists()) {
          setNews(snapshot.val());
        }
      })
      .catch(err => {
        showError(err.message);
      });
  };

  const getCategoryDoctors = (dbRef: any) => {
    get(child(dbRef, 'category_doctor/'))
      .then(snapshot => {
        if (snapshot.exists()) {
          setCategoryDoctor(snapshot.val());
        }
      })
      .catch(err => {
        showError(err.message);
      });
  };

  const getTopRatedDoctors = () => {
    get(query(ref(db, 'doctors/'), orderByChild('rate'), limitToLast(3)))
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
          setDoctors(data);
        }
      })
      .catch(err => {
        showError('Error');
        console.log(err.message);
      });
  };

  return (
    <View style={styles.page}>
      <View style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.wrapperSection}>
            <Gap height={30} />
            <HomeProfile onPress={() => navigation.navigate('UserProfile')} />
            <Text style={styles.welcome}>
              Mau konsultasi dengan siapa hari ini?
            </Text>
          </View>
          <View style={styles.wrapperScroll}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.category}>
                <Gap width={32} />
                {categoryDoctor.map((item: any) => {
                  return (
                    <DoctorCategory
                      key={item.id}
                      category={item.category}
                      onPress={() => navigation.navigate('ChooseDoctor', item)}
                    />
                  );
                })}
                <Gap width={22} />
              </View>
            </ScrollView>
          </View>
          <View style={styles.wrapperSection}>
            <Text style={styles.sectionLabel}>Top Rated Doctors</Text>
            {doctors.map((item: any) => {
              return (
                <RatedDoctor
                  key={item.id}
                  name={item.data.fullName}
                  desc={item.data.profession}
                  avatar={item.data.photo}
                  onPress={() => navigation.navigate('DoctorProfile', item)}
                />
              );
            })}
            <Text style={styles.sectionLabel}>Good News</Text>
          </View>
          {news.map((item: any) => {
            return (
              <NewsItem
                key={item.id}
                title={item.title}
                date={item.date}
                image={item.image}
              />
            );
          })}
          <Gap height={30} />
        </ScrollView>
      </View>
    </View>
  );
};

export default Doctor;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.secondary,
  },
  content: {
    flex: 1,
    backgroundColor: colors.white,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  wrapperSection: {
    paddingHorizontal: 16,
  },
  welcome: {
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    marginTop: 30,
    marginBottom: 16,
    maxWidth: 209,
  },
  category: {
    flexDirection: 'row',
  },
  wrapperScroll: {
    marginHorizontal: -16,
  },
  sectionLabel: {
    fontSize: 16,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    marginTop: 30,
    marginBottom: 16,
  },
});
