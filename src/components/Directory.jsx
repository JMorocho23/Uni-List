import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Pagination, Card } from 'react-bootstrap';
import UniSearch from './UniSearch';

function Directory() {
  let [active, setActive] = useState(1);
  let [unis, setUnis] = useState([]);
  let pages = [];
  const numOfUnisPerPage = 10;
  var indOfLastEpi = active * numOfUnisPerPage;
  var indOfFirstEpi = indOfLastEpi - numOfUnisPerPage;

  for (let number = 1; number <= 10; number++) {
    pages.push(
      <Pagination.Item
        key={number}
        active={number === active}
        onClick={() => pagination(number)}
      >
        {number}
      </Pagination.Item>
    );
  }

  useEffect(() => {
    if (active === 1) {
      axios
        .get('http://universities.hipolabs.com/search?country=United States')
        .then((data) => {
          setUnis(data.data.slice(indOfFirstEpi, indOfLastEpi));
        });
    }
  }, [active]);

  const pagination = (number) => {
    indOfLastEpi = number * numOfUnisPerPage;
    indOfFirstEpi = indOfLastEpi - numOfUnisPerPage;
    setActive(number);
    axios
      .get('http://universities.hipolabs.com/search?country=United States')
      .then((data) => {
        setUnis(data.data.slice(indOfFirstEpi, indOfLastEpi));
      });
  };

  return (
    <Container className="my-3" fluid>
      <Row>
        <Col md={12}>
          <h2>University List</h2>
        </Col>
      </Row>
      <UniSearch />
      <hr />
      <h2>Universities</h2>
      <Row className="d-flex flex-wrap justify-content-center">
        {unis.map((uni, index) => (
          <Col key={index} md={3} className="m-3">
            <Card>
              <Card.Body>
                <Card.Title>
                  {' '}
                  <b>Name: </b>
                  {uni.name}
                </Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  <span>
                    <b>Domain: </b>
                    {uni.domains[0]}
                  </span>
                </Card.Subtitle>
                <Card.Text>
                  <span>
                    <b>Country: </b>
                    {uni.country}
                  </span>
                </Card.Text>
                <Card.Link href={uni.web_pages[0]}>
                  <span>{uni.name}</span>
                </Card.Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <Row className="justify-content-center">
        <Col md={2}>
          <Pagination size="sm">
            <Pagination.First
              onClick={() => {
                pagination(1);
              }}
            />
            <Pagination.Prev
              onClick={() => {
                if (active > 1) {
                  pagination(active - 1);
                }
              }}
            />
            {pages}
            <Pagination.Next
              onClick={() => {
                pagination(10);
              }}
            />
            <Pagination.Last
              onClick={() => {
                pagination(10);
              }}
            />
          </Pagination>
        </Col>
      </Row>
    </Container>
  );
}

export default Directory;
