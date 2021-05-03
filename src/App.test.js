import React from 'react';
import App from './App';
import AddTodo from './Components/AddTodo';
import { mount } from 'enzyme';
import TodoItem from './Components/TodoItem';

describe('App component testing', () => {
  let wrapper;
  let setState;
  let useStateMock;
  beforeEach(() => {
    const stubInitialState = [
      {
        id: 2,
        priority: 2,
        titile: 'must do',
      },
    ];
   
    Storage.prototype.getItem = jest.fn(() => JSON.stringify(stubInitialState));
    setState = jest.fn();
    useStateMock = (state) => [state, setState];
    jest.spyOn(React, 'useState').mockImplementation(useStateMock);
    wrapper = mount(<App />);
  });
  test('renders AddTodo', () => {
    expect(wrapper.find(AddTodo).length).toBe(1);
  });

  test('addData method is called when clicked on add button', () => {
    let addData = jest.fn();
    addData.mockImplementation((priority, title) => {
      priority = 1;
      title = 'do list';
    });
    wrapper.setProps('addData', addData);
    let btn = wrapper.find(AddTodo).find('form').find('button');
    expect(btn.length).toBe(1);
    const event = { preventDefault: () => {} };
    jest.spyOn(event, 'preventDefault');
    btn.simulate('click', event);
    expect(addData.mock.calls.length).toEqual(1);
    expect(wrapper.find(AddTodo).props().addData).toBeDefined();
  });

  test('editItem props defined', () => {
    let todo = wrapper.find(TodoItem);
    let list = todo.find('li');
    list.simulate('blur');
    //expect(setState.mock.calls.length).toEqual(1);
    expect(todo.props().editItem).toBeDefined();
  });

  test('removeItem props defined', () => {
    let todo = wrapper.find(TodoItem);
    let button = todo.find('li').find('button');
    button.simulate('click');
    expect(todo.props().removeItem).toBeDefined();
  });
});
