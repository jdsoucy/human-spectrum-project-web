import React from 'react';
import { Row, Col } from 'react-flexbox-grid';


export default ({ companies }) => {
  console.log(companies)
  return (
    <>
      {companies.map((company, index) => {
        let total = 0;
        let label = 0;
        let whiteCount = 0;
        let monoritiesCount = 0;
        if (company.ethnicGroup) {
          Object.keys(company.ethnicGroup).forEach((key) => {
            total = total + Number(company.ethnicGroup[key]);
            label = `${label}, ${company.ethnicGroup[key]} ${key}`;
          });
          whiteCount = company.ethnicGroup.white;
          monoritiesCount = total - whiteCount;
        }
        console.log(company)
        return (
          <article key={index}>
            <Row>
              <Col sx="2">{total}<br />{company.companyName}<br />{company.companyType}</Col>
              <Col sx="2">{Math.floor(whiteCount * 100 / total)}% white</Col>
              <Col sx="2">{Math.floor(monoritiesCount * 100 / total)}% non white</Col>
              <Col sx="6">{label}</Col>
            </Row>
          </article>
        )
      })}
    </>
  );
}