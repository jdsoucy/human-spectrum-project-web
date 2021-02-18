import React, { useEffect, useState } from 'react';
import "firebase/firestore";
import { Row, Col } from 'react-flexbox-grid';
import CompanyForm from './components/CompanyForm';
import CompaniesList from './components/CompaniesList';
import { getCompanyList } from './services/firestoreService';
import './App.css';

function App() {
  const [companies, setCompanies] = useState([]);
  const [isForm, setIsForm] = useState(false);
  const [filteredCompanies, setFilteredCompanies] = useState([]);

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


  useEffect(() => {
    setFilteredCompanies(companies)
  }, [companies]);

  const onClickForm = () => {
    setIsForm(!isForm);
  }

  const onClickClose = () => {
    setIsForm(false);
  }

  const onChangeSearch = (e) => {
    const value = e.currentTarget.value;
    if (!value) {
      setFilteredCompanies(companies);
    } else {
      setFilteredCompanies(companies.filter(company => {
        return company.companyName.includes(value);
      }));
    }
  }

  return (
    <div className="App">
      <header>
        <Row>
          <Col><div className="title">Human Spectrum Project</div></Col>
          <Col><button onClick={onClickForm}>Add company</button></Col>
        </Row>
      </header>
      {isForm && 
        <div  className="company-form">
          <button onClick={onClickClose}>close</button>
          <p>A <strong>visible minority</strong> is defined by the Government of Canada as "persons, other than aboriginal peoples, who are <strong>non-Caucasian</strong> in race or <strong>non-white</strong> in colour". The term is used primarily as a demographic category by Statistics Canada, in connection with that country's Employment Equity policies.</p>
          <CompanyForm />
        </div>
        }
      <Row>
      <Col xs={12}>
          <input type="text" placeholder="Type something" onChange={onChangeSearch} />
        </Col>
        <Col xs={12}>
          <div  className="companies-list">
            <CompaniesList
              {...{
                companies: filteredCompanies
              }}
            />
          </div>
        </Col>
      </Row>
       
    </div>
  );
}

export default App;
