import React, { useState } from 'react';
import styles from './App.module.scss';
import Form from './components/Form';
import List from './components/List';

interface IListState {
  task: {
    name: string;
    id: number;
    isFinished: boolean;
  }[]
}

function App() {
  const [name, setName] = useState<string>('');
  const [list, setList] = useState<IListState['task']>([]);
  const [editing, setEditing] = useState<boolean>(false);
  const [editID, setEditID] = useState<number>();
  const [category, setCategory] = useState<string>('all');

  return (
    <section className={styles.app}>
      <h1>Todo List</h1>
      <Form 
      name={name} 
      setName={setName} />
      <List />
    </section>
  );
}

export default App;
