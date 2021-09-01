import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { ScrollView, StyleSheet, SafeAreaView, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { t } from 'i18n-js';

import { API, Colors } from '../../configs';
import { Section, ViewButtonBottom } from '../../commons';
import Text from '../../commons/Text';
import { axiosGet } from '../../utils/Apis/axios';
import Routes from '../../utils/Route';
import { TESTID } from '../../configs/Constants';

const AddNewGateway = memo(({ route }) => {
  const { unit_id, wifiName, wifiPass, imei } = route.params;
  const { navigate, goBack } = useNavigation();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [chipName, setChipName] = useState('');
  const [unit, setUnit] = useState({ stations: [] });
  const [stationName, setStationName] = useState('');

  const fetchDetails = useCallback(async () => {
    const { success, data } = await axiosGet(
      API.UNIT.UNIT_DETAIL(unit_id),
      {},
      true
    );
    if (success) {
      setUnit(data);
    }
  }, [unit_id]);

  useEffect(() => {
    fetchDetails();
  }, [fetchDetails]);

  const onRight = useCallback(() => {
    !!imei &&
      navigate(Routes.ScanChipQR, {
        stationName,
        unit_id: unit.id,
        unit_name: unit.name,
        phoneNumber,
        chipName,
        wifiName,
        wifiPass,
        imei,
      });
  }, [
    chipName,
    imei,
    navigate,
    phoneNumber,
    stationName,
    unit.id,
    unit.name,
    wifiName,
    wifiPass,
  ]);

  const onChangePhoneNumber = useCallback((text) => {
    setPhoneNumber(text);
  }, []);

  const onChangeChipName = useCallback((text) => {
    setChipName(text);
  }, []);

  const onChangeStationName = useCallback((text) => {
    setStationName(text);
  }, []);

  const isValid = useMemo(() => {
    if (!stationName) {
      return false;
    }
    if (!phoneNumber) {
      return false;
    }
    if (!chipName) {
      return false;
    }
    if (!wifiName) {
      return false;
    }
    if (!wifiPass) {
      return false;
    }
    if (!imei) {
      return false;
    }
    return true;
  }, [chipName, imei, phoneNumber, stationName, wifiName, wifiPass]);

  return (
    <SafeAreaView style={styles.wrap}>
      <Text
        testID={TESTID.ADD_NEW_GATEWAY_ADD}
        semibold
        size={20}
        color={Colors.Black}
        style={styles.txtHeader}
      >
        {t('add_new_gateway')}
      </Text>
      <Text
        testID={TESTID.ADD_NEW_GATEWAY_THEN_SELECT}
        size={14}
        color={Colors.Gray8}
        style={styles.txtNote}
      >
        {t('then_select_a_sub_unit_to_add')}
      </Text>

      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <Section type={'border'}>
          <TextInput
            value={stationName}
            style={styles.textInput}
            placeholder={t('station_name')}
            underlineColorAndroid={null}
            onChangeText={onChangeStationName}
          />
        </Section>
        <Section type={'border'}>
          <TextInput
            value={phoneNumber}
            style={styles.textInput}
            placeholder={t('phone_number')}
            underlineColorAndroid={null}
            keyboardType={'phone-pad'}
            onChangeText={onChangePhoneNumber}
          />
          <TextInput
            value={chipName}
            style={styles.textInput}
            placeholder={t('gateway_name')}
            underlineColorAndroid={null}
            keyboardType={'num-pad'}
            onChangeText={onChangeChipName}
          />
        </Section>
        <Section type={'border'}>
          <Text color={Colors.Primary}>{t('wifi_name')}</Text>
          <Text>{wifiName}</Text>
          <Text color={Colors.Primary}>{t('imei')}</Text>
          <Text testID={TESTID.ADD_NEW_GATEWAY_TEXT_IMEI}>{imei}</Text>
        </Section>
      </ScrollView>
      <ViewButtonBottom
        leftTitle={t('text_back')}
        onLeftClick={goBack}
        rightTitle={t('text_next')}
        rightDisabled={!isValid}
        onRightClick={onRight}
      />
    </SafeAreaView>
  );
});

export default AddNewGateway;

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: Colors.Gray2,
  },
  txtHeader: {
    marginTop: 16,
    marginLeft: 16,
    marginBottom: 8,
    lineHeight: 28,
  },
  txtNote: {
    marginHorizontal: 16,
    marginBottom: 8,
    lineHeight: 22,
  },
  textInput: {
    width: '100%',
    height: 58,
    borderBottomColor: Colors.Gray4,
    borderBottomWidth: 1,
    fontSize: 16,
    fontFamily: 'SFProDisplay-Regular',
    lineHeight: 24,
  },
});
