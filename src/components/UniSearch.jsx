import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card } from 'react-bootstrap';

function UniSearch() {
  var [uniSearch, setUniSearch] = useState([]);
  var [uniName, setUniName] = useState('');

  const getUniSearch = () => {
    axios
      .get(
        'http://universities.hipolabs.com/search?country=United States&name=' +
          uniName
      )
      .then((data) => {
        setUniSearch(data.data);
      });
  };

  return (
    <Container className="my-3">
      <Row className="d-flex flex-wrap justify-content-center">
        <Col md={6}>
          <input
            placeholder="Enter university name"
            onChange={(e) => setUniName(e.target.value)}
          />{' '}
          <button onClick={getUniSearch}>Search</button>
        </Col>
      </Row>
      <Row className="justify-content-md-center my-5">
        {uniSearch.length > 0 ? (
          <Row className="d-flex flex-wrap justify-content-center">
            {uniSearch.map((uni, index) => (
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
        ) : (
          <p>No Results</p>
        )}
      </Row>
    </Container>
  );
}

export default UniSearch;
