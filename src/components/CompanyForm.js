import React from 'react';
import { Formik } from 'formik';
import { Row, Col } from 'react-flexbox-grid';
import * as FirestoreService from '../services/firestoreService';
import { populationGroups } from '../constants';

export default () => {
  const onSubmit = (values) => {
    console.log(values)
    FirestoreService.addCompany(values)
      .then(docRef => {
        console.log('new id', docRef.id)
          // onCreate(docRef.id, userName);
      })
      .catch(reason => console.log(reason));
  }

  return (
    <Formik
       initialValues={{ monorityAdvance: "false" }}
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
      }) => {
        console.log(values.monorityAdvance);
        
        return (
          <form onSubmit={handleSubmit}>
            <div>
              <label>Company name</label>
              <input
                type="string"
                name="companyName"
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <div>
              <label>Company type</label>
              <input
                type="string"
                name="companyType"
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <hr />
            <div>
              <label>
                <input
                  type="radio"
                  name="monorityAdvance"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value="false"
                  checked={values.monorityAdvance === 'false'}
                /> Basic
              </label>
              {values.monorityAdvance === 'false' && (
                <>
                  <div>
                    <label>White</label>
                    <input
                      type="string"
                      name="ethnicGroup.white"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </div>
                  <div>
                    <label>Non-white</label>
                    <input
                      type="string"
                      name="ethnicGroup.other"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </div>
                </>
              )}
            </div>
            <div>
              <label>
                <input
                  type="radio"
                  name="monorityAdvance"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value="true"
                  checked={values.monorityAdvance === 'true'}
                /> Advanced
              </label>
              {values.monorityAdvance === 'true' && populationGroups.map(group => (
                <Row>
                  <Col xs="8">
                    <label>{group.name}</label>
                  </Col>
                  <Col xs="4">
                    <input
                      type="number"
                      name={`ethnicGroup.${group.id}`}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Col>
                </Row>
              ))}
  
            </div>
            
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </form>
        )
      }}
    </Formik>
  );
}