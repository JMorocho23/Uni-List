import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Form,
  FormControl,
  Button,
  Card
} from "react-bootstrap";

function Directory() {
  var [active, setActive] = useState(1);
  var [unis, setUnis] = useState([]);

  useEffect(() => {
    console.log(active);
    if (active === 1) {
      axios.get("http://universities.hipolabs.com/search").then((data) => {
        console.log(data);
        setUnis(data);
      });
    }
  }, [active]);

  return (
    <Container className="my-3" fluid>
      <Row>
        <Col xs={4}>
          <h2>University List</h2>
        </Col>
        <Col xs={8}>
          <Form className="d-flex">
            <FormControl
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Col>
      </Row>
      <Row className="justify-content-md-center my-5">
        <Col md={3}>
          <Card style={{ width: "18rem" }}>
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                Card Subtitle
              </Card.Subtitle>
              <Card.Text>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </Card.Text>
              <Card.Link href="#">Card Link</Card.Link>
              <Card.Link href="#">Another Link</Card.Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <hr />
      <h2>Universities</h2>
      <Row>
        {unis.map((uni) => (
          <Col>
            <Card>
              <Card.Body>
                <Card.Title>{uni.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  Card Subtitle
                </Card.Subtitle>
                <Card.Text>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </Card.Text>
                <Card.Link href="#">Card Link</Card.Link>
                <Card.Link href="#">Another Link</Card.Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Directory;
