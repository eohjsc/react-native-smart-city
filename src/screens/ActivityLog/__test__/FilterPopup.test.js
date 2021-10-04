import React from 'react';
import { TouchableOpacity } from 'react-native';
import { act, create } from 'react-test-renderer';
import FilterPopup from '../FilterPopup';
import { SCProvider } from '../../../context';
import { mockSCStore } from '../../../context/mockStore';
import RadioCircle from '../../../commons/RadioCircle';
import { TESTID } from '../../../configs/Constants';
import BottomButtonView from '../../../commons/BottomButtonView';

const wrapComponent = (props) => (
  <SCProvider initState={mockSCStore({})}>
    <FilterPopup {...props} />
  </SCProvider>
);

jest.mock('react', () => {
  return {
    ...jest.requireActual('react'),
    memo: (x) => x,
  };
});

test('test FilterPopup', async () => {
  const mockOnHide = jest.fn();
  const mockOnApply = jest.fn();
  let tree;
  let props = {
    isVisible: true,
    members: [
      { id: 0, name: 'all' },
      { id: 1, name: 'name 1' },
      { id: 2, name: 'name 2' },
    ],
    filters: {
      users: [],
    },
    onHide: mockOnHide,
    onApply: mockOnApply,
  };

  await act(async () => {
    tree = await create(wrapComponent(props));
  });
  const instance = tree.root;
  const radioCircles = instance.findAllByType(RadioCircle);
  const itemButtons = instance.findAll(
    (el) =>
      el.props.testID === TESTID.ITEM_USER_FILTER &&
      el.type === TouchableOpacity
  );
  const bottomButtonView = instance.findByType(BottomButtonView);

  expect(radioCircles[0].props.active).toBeTruthy();
  expect(radioCircles[1].props.active).toBeFalsy();
  expect(radioCircles[2].props.active).toBeFalsy();

  // click all
  await act(async () => {
    await itemButtons[0].props.onPress();
  });
  expect(radioCircles[0].props.active).toBeTruthy();
  expect(radioCircles[1].props.active).toBeFalsy();
  expect(radioCircles[2].props.active).toBeFalsy();

  // click 1
  await act(async () => {
    await itemButtons[1].props.onPress();
  });
  expect(radioCircles[0].props.active).toBeFalsy();
  expect(radioCircles[1].props.active).toBeTruthy();
  expect(radioCircles[2].props.active).toBeFalsy();

  // click 2
  await act(async () => {
    await itemButtons[2].props.onPress();
  });
  expect(radioCircles[0].props.active).toBeFalsy();
  expect(radioCircles[1].props.active).toBeTruthy();
  expect(radioCircles[2].props.active).toBeTruthy();

  // click 2
  await act(async () => {
    await itemButtons[2].props.onPress();
  });
  expect(radioCircles[0].props.active).toBeFalsy();
  expect(radioCircles[1].props.active).toBeTruthy();
  expect(radioCircles[2].props.active).toBeFalsy();

  // click apply
  await act(async () => {
    await bottomButtonView.props.onPressMain();
  });
  expect(mockOnHide).toBeCalled();
  expect(mockOnApply).toBeCalledWith({
    users: [1],
  });

  // click cancel
  await act(async () => {
    await bottomButtonView.props.onPressSecondary();
  });
  expect(mockOnHide).toBeCalled();
  expect(radioCircles[0].props.active).toBeTruthy();
  expect(radioCircles[1].props.active).toBeFalsy();
  expect(radioCircles[2].props.active).toBeFalsy();
});
