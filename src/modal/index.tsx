import React from 'react';
import * as Yup from 'yup';
import style from './index.module.scss';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { v4 as uuidv4 } from 'uuid';
import { IDrink } from '../types';

const validationSchema = Yup.object({
  name: Yup.string().required('Please enter your name.'),
  drinkName: Yup.string().required('Please enter your drink.'),
  price: Yup.number().required('Please enter the price.')
});
type IModal = {
  isNew?: boolean;
  selectedInfo: IDrink | null;
  submitFn: (value: IDrink) => void;
  closeFn: () => void;
};

function Modal(props: IModal) {
  const { submitFn, selectedInfo, closeFn } = props;
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
              <button className={style.closeButton} onClick={closeFn}>X</button>
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
