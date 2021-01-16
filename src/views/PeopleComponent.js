import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchPeople, fetchPeopleDetails, fetchFilmDetails } from '../redux/actions/PeopleAction'
import { Col, Container, Row, Button } from 'react-bootstrap'
const PeopleComponent = (props) => {
    const [peopleList, setPeopleList] = useState([]);
    const [paginationURL, setPaginationURL] = useState({})
    const [filmDetails, setFilmDetails] = useState(null)
    useEffect(() => {
        getPeopleList()
    }, [])
    const getPeopleList = async () => {
        let response = await props.fetchPeople()
        if (response && response.data && response.data.results) {
            let results = response.data.results, data = [];
            results.map(item => {
                data.push({
                    ...item,
                    showDetail: false
                })
            })
            setPeopleList(data);
            setPaginationURL({
                next: response.data.next,
                previous: response.data.previous
            })
        }
    }
    const onNextButtonClick = async () => {
        if (!paginationURL.next) return
        let response = await props.fetchPeople(paginationURL.next)
        if (response && response.data && response.data.results) {
            let results = response.data.results, data = [];
            results.map(item => {
                data.push({
                    ...item,
                    showDetail: false
                })
            })
            setPeopleList(data);
            setPaginationURL({
                next: response.data.next,
                previous: response.data.previous
            })
        }
    }
    const onBackButtonClick = async () => {
        if (!paginationURL.previous) return
        let response = await props.fetchPeople(paginationURL.previous)
        if (response && response.data && response.data.results) {
            let results = response.data.results, data = [];
            results.map(item => {
                data.push({
                    ...item,
                    showDetail: false
                })
            })
            setPeopleList(data);
            setPaginationURL({
                next: response.data.next,
                previous: response.data.previous
            })
        }
    }
    const showDetails = async (index) => {
        let response = await props.fetchPeopleDetails(index + 1)
        if (response && response.data) {
            let _filmDetails = await props.fetchFilmDetails(response.data.films)
            console.log(_filmDetails)
            setFilmDetails(_filmDetails)
            let _list = peopleList;
            _list.map((item, _index) => {
                if (_index === index) {
                    item['showDetail'] = true
                }
                else {
                    item['showDetail'] = false
                }
            })
            setPeopleList([..._list])

        }

    }
    return (
        <Container>
            {
                peopleList && peopleList.length !== 0 &&
                <Col>
                    <Row className="table-header">
                        <Col className="table-header-item">Name</Col>
                        <Col className="table-header-item">Height</Col>
                        <Col className="table-header-item">Mass</Col>
                        <Col className="table-header-item">Details</Col>
                    </Row>
                    {
                        peopleList.map((item, index) => {
                            return (
                                <>
                                    <Row key={index} className="table-row">
                                        <Col>{item.name}</Col>
                                        <Col>{item.height}</Col>
                                        <Col>{item.mass}</Col>
                                        <Col>
                                            <button className="details-button" onClick={() => showDetails(index)}>+</button>
                                        </Col>
                                    </Row>
                                    {
                                        item.showDetail &&
                                        <Col className="detail-section">
                                            <Col className="details-title"><b>Details :</b></Col>
                                            <Row className="user-details">
                                                <Col lg={2}>
                                                    <Col><b>Name:</b></Col>
                                                    <Col><b>Birth Year:</b></Col>
                                                    <Col><b>Gender:</b></Col>
                                                </Col>
                                                <Col lg={2}>
                                                    <Col>{item.name}</Col>
                                                    <Col>{item.birth_year}</Col>
                                                    <Col>{item.gender}</Col>
                                                </Col>
                                            </Row>
                                            <Col className="details-title"><b>Films :</b></Col>
                                            <ul>
                                                {
                                                    filmDetails && filmDetails.map((item, index) => {
                                                        return (
                                                            <li key={index} className="film-details">{item.data.title}</li>
                                                        )
                                                    })
                                                }
                                            </ul>
                                        </Col>
                                    }

                                </>
                            )
                        })
                    }

                </Col>
            }
            {
                peopleList && peopleList.length !== 0 &&
                <Col className="d-flex justify-content-end footer" >
                    <Button variant="outline-primary" className="footer-button" onClick={onBackButtonClick} >{'BACK'}</Button>
                    <Button variant="outline-primary" className="footer-button" onClick={onNextButtonClick} >{'NEXT'}</Button>
                </Col>
            }

        </Container>
    )
}

export default connect(null, {
    fetchPeople,
    fetchPeopleDetails,
    fetchFilmDetails
})(PeopleComponent)