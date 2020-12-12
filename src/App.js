import React, { useEffect, useState } from 'react';
import "firebase/firestore";
import { Row, Col } from 'react-flexbox-grid';
import CompanyForm from './components/CompanyForm';
import CompaniesList from './components/CompaniesList';
import { getCompanyList } from './services/firestoreService';
import './App.css';

function App() {
  const [companies, setCompanies] = useState([]);
  useEffect(() => {
    getCompanyList()
      .then(querySnapshot => {
        let result = []
        querySnapshot.forEach(x => {
          result.push(x.data())
        })
        setCompanies(result)
      })
      .catch(() => {});
  }, []);

  return (
    <div className="App">
      <Row>
        <Col xs={6}>
          <div  className="companies-list">
            <CompaniesList
              {...{
                companies
              }}
            />
          </div>
        </Col>
        <Col xs={6}>
          <div  className="company-form">
            <p>A <strong>visible minority</strong> is defined by the Government of Canada as "persons, other than aboriginal peoples, who are <strong>non-Caucasian</strong> in race or <strong>non-white</strong> in colour". The term is used primarily as a demographic category by Statistics Canada, in connection with that country's Employment Equity policies.</p>
            <CompanyForm />
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default App;
