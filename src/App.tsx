import React, { useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import style from './App.module.scss';
import { List, NoData } from './components';
import Modal from './modal';
import { IDrink } from './types/';

const DEFAULT_DRINKS: IDrink[] = Array.from({ length: 10 }, (val, i) => {
  return {
    id: uuidv4(),
    name: `test-${i}`,
    drinkName: 'pearl milk tea',
    price: 65,
    note:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
  };
});

function App() {
  const [drinks, setDrinks] = useState<IDrink[]>([...DEFAULT_DRINKS]);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedInfo, setSelectedInfo] = useState<IDrink | null>(null);

  const deleteFn = (id: string) => setDrinks(drinks.filter((drink) => drink.id !== id));
  const addFn = useCallback(() => {
    toggleModal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const editFn = (id: string) => {
    const drink = drinks.find((drink) => drink.id === id) as IDrink;
    setSelectedInfo(drink);
    setModalOpen(true);
  };
  const submitFn = (value: IDrink) => {
    if (selectedInfo) {
      const findedIndex = drinks.findIndex((drink) => drink.id === value.id);
      drinks.splice(findedIndex, 1, value);
      setDrinks(drinks);
    } else {
      setDrinks([value, ...drinks]);
    }
    toggleModal();
  };

  const toggleModal = useCallback(() => {
    setModalOpen((status) => !status);
    setSelectedInfo(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <div className={style.App}>
        {drinks.length === 0 ? (
          <NoData />
        ) : (
          <>
            <header className={style['App-header']}>
              <h1>DailyDrinks!</h1>
            </header>
            <main>
              {
                drinks.map((drink) => <List key={drink.id} drink={drink} editFn={editFn} deleteFn={deleteFn} />)
              }
            </main>
          </>
        )}
        <div className={style.plus} onClick={addFn}>
          <i className="fa fa-plus" aria-hidden="true"></i>
        </div>
      </div>

      {isModalOpen ? <Modal submitFn={submitFn} selectedInfo={selectedInfo} closeFn={toggleModal} /> : null}
    </>
  );
}

export default App;
