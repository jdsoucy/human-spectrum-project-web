import React from 'react';
import { Row, Col } from 'react-flexbox-grid';


export default ({ companies }) => {
  return (
    <>
      {companies.map(company => {
        let total = 0;
        let label = 0;
        Object.keys(company.ethnicGroup).forEach((key) => {
          total = total + Number(company.ethnicGroup[key]);
          label = `${label}, ${company.ethnicGroup[key]} ${key}`;
        });
        const whiteCount = company.ethnicGroup.white;
        const monoritiesCount = total - whiteCount;

        return (
          <article>
            <Row>
              <Col xs="2">{total}</Col>
              <Col xs="2">{Math.floor(whiteCount * 100 / total)}% white</Col>
              <Col xs="2">{Math.floor(monoritiesCount * 100 / total)}% non white</Col>
              <Col xs="6">{Object.keys(company.ethnicGroup).map((key, index) => {
                return `${company.ethnicGroup[key]} ${key}, `;
              })}</Col>
            </Row>
          </article>
        )
      })}
    </>
  );
}