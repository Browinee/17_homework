import React from 'react';
import style from './style.module.scss';
import { IDrink } from '../../types';

type IList = {
  drink: IDrink;
  editFn: (id: string) => void;
  deleteFn: (id: string) => void;
};
function List({ drink, editFn, deleteFn }: IList) {
  const { id, name, drinkName, price, note } = drink;
  return (
    <div className={style['list-wrapper']}>
      <div className={style.header}>
        <h2>{name}</h2>
        <div className={style['button-group']}>
          <button onClick={() => editFn(id)}>
            <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
          </button>
          <button onClick={() => deleteFn(id)}>
            <i className="fa fa-trash" aria-hidden="true"></i>
          </button>
        </div>
      </div>
      <div className={style.order}>
        <span>{drinkName}</span>
        <span>$: {price}</span>
      </div>
      <small className={style.note}> {note}</small>
    </div>
  );
}

export default List;
