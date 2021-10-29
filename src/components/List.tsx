import React from 'react';
import styles from './List.module.scss';

interface IListState {
  filteredList: {
    name: string;
    id: number;
    isFinished: boolean;
  }[];
  deleteItem: (id:number) => void;
  editItem: (id:number) => void;
  finishItem: (id:number) => void;
  
}

const List = ({ filteredList, deleteItem, editItem, finishItem }: IListState) => {
  return (
    <section className="container">
      <ul>
        {filteredList.map((item) => {
          return (
            <li key={item.id}>
              {item.name}
              <div className={styles.buttons}>
                <button
                  title="Edit task"
                  onClick={() => editItem(item.id)}
                  aria-label="Edit"
                  className={styles.editButton}
                  type="button"
                >
                  <i className="far fa-edit"></i>
                </button>
                <button
                  title="Task finished"
                  onClick={() => finishItem(item.id)}
                  aria-label="Done"
                  className={styles.doneButton}
                  type="button"
                >
                  <i className="fas fa-check"></i>
                </button>
                <button
                  title="Delete task"
                  onClick={() => deleteItem(item.id)}
                  aria-label="Delete"
                  className={styles.deleteButton}
                  type="button"
                >
                  <i className="far fa-trash-alt"></i>
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default List;
