import React from 'react';
import { Formik } from 'formik';
import { Row, Col } from 'react-flexbox-grid';
import * as FirestoreService from '../services/firestoreService';
import { populationGroups } from '../constants';

export default () => {
  const onSubmit = (values) => {
    FirestoreService.addCompany(values)
      .then(docRef => {
        console.log('new id', docRef.id)
          // onCreate(docRef.id, userName);
      })
      .catch(reason => console.log(reason));
  }

  return (
    <Formik
       initialValues={{ chinese: 0, black: 0, white: 0 }}
       onSubmit={onSubmit}
     >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        /* and other goodies */
      }) => (
        <form onSubmit={handleSubmit}>
          {populationGroups.map(group => (
            <Row>
              <Col xs="8">
                <label>{group.name}</label>
              </Col>
              <Col xs="4">
                <input
                  type="number"
                  name={group.id}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Col>
            </Row>
          ))}
          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </form>
      )}
    </Formik>
  );
}