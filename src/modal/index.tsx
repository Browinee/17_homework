import React, { useEffect, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { validationSchema } from './util';
import style from './style.module.scss';
import { IDrink } from '../types';


const KEY_ESCAPE = 27;
type IModal = {
  isNew?: boolean;
  selectedInfo: IDrink | null;
  submitFn: (value: IDrink) => void;
  closeFn: () => void;
};

function Modal(props: IModal) {
  const { submitFn, selectedInfo, closeFn } = props;
  const handleOutsideArea = useCallback((e: MouseEvent) => {
    if((e.target as HTMLButtonElement ).tagName=== 'DIV') {
      closeFn();
    }
  }, []);
  const handleEsc = useCallback((e: KeyboardEvent) => {
    if(e.keyCode === KEY_ESCAPE) {
      closeFn();
    }
  }, []);
  useEffect(() => {
    window.addEventListener('keydown', handleEsc);
    window.addEventListener('click', handleOutsideArea);
    return () => {
      window.removeEventListener('click', handleOutsideArea);
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);
  return (
    <div className={style['modal-wrapper']}>
      <Formik
        initialValues={selectedInfo ? selectedInfo : { id: uuidv4(), name: '', drinkName: '', price: 0, note: '' }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          resetForm();
          submitFn(values);
        }}
      >
        {({ errors, touched, isValid, dirty }) => {
          return (
            <Form className={style['form']}>
              <header>
                <h1>
                  {!selectedInfo ? 'Order drinks' : 'Edit drinks'} {dirty}
                </h1>
              </header>
              <button className={style.closeButton} onClick={closeFn}>
                X
              </button>
              <Field
                name="name"
                type="text"
                className={`${style['input-field']} ${errors.name && touched.name ? style['is-invalid'] : ''}`}
                placeholder="Name*"
              />
              <ErrorMessage name="name" render={(msg) => <div className={style['invalid-feedback']}>{msg}</div>} />
              <Field
                name="drinkName"
                type="text"
                className={`${style['input-field']} ${errors.drinkName && touched.drinkName ? style['is-invalid'] : ''}`}
                placeholder="Drink*"
              />
              <ErrorMessage name="drinkName" render={(msg) => <div className={style['invalid-feedback']}>{msg}</div>} />
              <Field
                name="price"
                type="number"
                className={`${style['input-field']} ${errors.price && touched.price ? style['is-invalid'] : ''}`}
                placeholder="Price*"
              />
              <ErrorMessage name="price" render={(msg) => <div className={style['invalid-feedback']}>{msg}</div>} />
              <Field name="note" component="textarea" cols="50" rows="5" className={style['input-field']} placeholder="Note" />
              <button className={style.submitButton} type="submit" disabled={!isValid || !dirty}>
                Submit
              </button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

export default Modal;
