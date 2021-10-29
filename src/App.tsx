import React, { useState, useEffect } from 'react';
import styles from './App.module.scss';
import Form from './components/Form';
import List from './components/List';

interface IListState {
  task: {
    name: string;
    id: number;
    isFinished: boolean;
  }[];
}

function App() {
  const [name, setName] = useState<string>('');
  const [list, setList] = useState<IListState['task']>([]);
  const [editing, setEditing] = useState<boolean>(false);
  const [editID, setEditID] = useState<number>(0);
  const [category, setCategory] = useState<string>('all');
  const [filteredList, setFilteredList] = useState<IListState['task']>([]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    if (name && !editing) {
      const newListItem = {
        name: name,
        id: new Date().getTime(),
        isFinished: false,
      };
      setList([...list, newListItem]);
      setName('');
    } else if (!name) {
      alert('Please enter value!');
    } else if (name && editing) {
      setList(
        list.map((item) => {
          if (item.id === editID) {
            return { ...item, name: name };
          }
          return item;
        }),
      );
      setEditing(false);
      setEditID(0);
    }
  };

  const deleteItem = (id: number): void => {
    setList(list.filter((item) => item.id !== id));
    setEditing(false);
    setEditID(0);
  };

  const editItem = (id: number): void => {
    const editingItem = list.find((item) => item.id === id);
    if (typeof editingItem === 'object' && typeof editingItem.name === 'string') {
      setName(editingItem.name);
      setEditing(true);
      setEditID(id);
    }
  };

  const finishItem = (id: number) => {
    setList(
      list.map((item) => {
        if (item.id === id) {
          return { ...item, isFinished: true };
        }
        console.log(list)
        return item;
      })
    );
  };

  const clearList = () => {
    setList([]);
    setEditing(false);
    setEditID(0);
  };

  const filterCategory = () => {
    switch (category) {
      case 'uncompleted':
        setFilteredList(list.filter((item) => item.isFinished === false));
        break;
      case 'completed':
        setFilteredList(list.filter((item) => item.isFinished === true));
        break;
      default:
        setFilteredList(list);
        break;
    }
  };

  useEffect(() => {
    filterCategory();
  }, [category, list]);

  return (
    <section className={styles.app}>
      <h1>Todo List</h1>
      <Form
        name={name}
        setName={setName}
        handleSubmit={handleSubmit}
        setCategory={setCategory}
        editing={editing}
      />

      {list.length ? (
        <>
          <List
            filteredList={filteredList}
            deleteItem={deleteItem}
            editItem={editItem}
            finishItem={finishItem}
          />
          <button
            className={styles.clearButton}
            type="submit"
            onClick={clearList}
          >
            Clear list
          </button>
        </>
      ) : (
        <h4>The list is empty, please add new item</h4>
      )}
    </section>
  );
}

export default App;
