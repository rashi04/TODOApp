import React from 'react';
import TodoItem from '../TodoItem';
import { mount } from 'enzyme';

describe('TodoItem component testing', () => {
  let wrapper;
  let setState;
  let useStateMock;
  let removeItem;
  let editItem;
  let item;
  beforeEach(() => {
    item = {
      id: 1,
      priority: 1,
      title: 'must do',
    };
    editItem = jest.fn();
    removeItem = jest.fn();
    setState = jest.fn();
    useStateMock = (state) => [state, setState];
    jest.spyOn(React, 'useState').mockImplementation(useStateMock);
    wrapper = mount(<TodoItem editItem={editItem} removeItem={removeItem} item={item} />);
  });

  test('AddTodo contains form tag', () => {
    expect(wrapper.find('li').length).toBe(1);
    expect(wrapper.find('form').length).toBe(1);
  });

  test('when double clicked on list item, edit style will be changed', () => {
    let list = wrapper.find('li');
    let editBox = list.find('input').at(1);
    list.simulate('doubleClick');
    list.props().onDoubleClick();
    expect(editBox.exists()).toBe(true);
  });

  test('change priority value', () => {
    let priorityCmp = wrapper.find('form').find('input').at(0);
    priorityCmp.simulate('change');
    expect(priorityCmp.props().value).toBeTruthy();
  });

  test('change title value', () => {
    let titleCmp = wrapper.find('form').find('input').at(1);
    titleCmp.simulate('change');
    expect(titleCmp.props().value).toBeTruthy();
  });

  test(' edit method is called on blur', () => {
    let list = wrapper.find('li');
    list.simulate('blur');
    expect(editItem.mock.calls.length).toEqual(1);
  });
  test(' remove method is called on click of delete', () => {
    let button = wrapper.find('li').find('button');
    button.simulate('click');
    expect(removeItem.mock.calls.length).toEqual(1);
  });
});
