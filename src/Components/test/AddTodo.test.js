import React from 'react';
import AddTodo from '../AddTodo';
import { mount, shallow } from 'enzyme';

describe('AddTodo component testing', () => {
  let addData;
  let wrapper;
  let setState;
  let useStateMock;
  beforeEach(() => {
    addData = jest.fn();
    setState = jest.fn();
    useStateMock = (state) => [state, setState];
    jest.spyOn(React, 'useState').mockImplementation(useStateMock);
    wrapper = mount(<AddTodo addData={addData} />);
  });

  test('AddTodo contains form tag', () => {
    expect(wrapper.find('form').length).toBe(1);
  });

  test('change priority value', () => {
    let priorityCmp = wrapper.find('form').find('input').at(0);
    priorityCmp.simulate('change', {
      target: {
        value: 2,
      },
    });
    expect(setState).toHaveBeenCalledWith(2);
  });

  test('change title value', () => {
    let titleCmp = wrapper.find('form').find('input').at(1);
    titleCmp.simulate('change', {
      target: {
        value: 'Collect form',
      },
    });
    expect(setState).toHaveBeenCalledWith('Collect form');
  });

  test('add method will not be called when priority and title are empty', () => {
    expect(addData.mock.calls.length).toEqual(0);
  });

  it('Expects to run onClick function when button is clicked ', () => {
    const mockCallBackClick = jest.fn();
    const wrapper = shallow(<button onClick={mockCallBackClick} />);
    wrapper.find('button').simulate('click');
    expect(mockCallBackClick.mock.calls.length).toEqual(1);
  });
});
