import React, { memo, useState, useCallback } from 'react';
import { View, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';

import styles from './StatesGridActionTemplateStyles';
import SelectActionCard from '../SelectActionCard';
import Text from '../Text';

const StatesGridActionTemplate = memo(({ data, onSelectAction }) => {
  const [visible, setVisible] = useState(false);
  const [actionName, setActionName] = useState(null);
  const onClose = () => setVisible(false);
  const onPress = () => setVisible(true);
  const { title, configuration, template } = data;
  const { options } = configuration;

  const hanleSelectAction = useCallback(
    (item) => {
      setActionName(item.text);
      onSelectAction &&
        onSelectAction({
          action: item.action,
          data: null,
          template,
        });
      setVisible(false);
    },
    [setVisible, onSelectAction, template]
  );

  return (
    <View>
      <SelectActionCard onPress={onPress} action={actionName} title={title} />

      <Modal
        isVisible={visible}
        onBackButtonPress={onClose}
        onBackdropPress={onClose}
      >
        <View style={styles.popoverStyle}>
          <View style={styles.modalContent}>
            {options.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => hanleSelectAction(item)}
              >
                <Text type="H4" style={styles.textwithline}>
                  {item.text}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
    </View>
  );
});

export default StatesGridActionTemplate;
