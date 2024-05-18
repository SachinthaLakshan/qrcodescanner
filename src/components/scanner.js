"use client";
import React, { useEffect, useState } from "react";
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import * as XLSX from 'xlsx';

const Scanner = () => {

    const [selectedArea, setSelectedArea] = useState(11);
    const [fixedNumbers, setFixedNumbers] = useState(null);
    const [numbers, setNumbers] = useState([]);
    const [count, setCount] = useState(1000);

    useEffect(() => {

    }, [])

    const areaCodes = [
        { district: 'Ampara', areacode: 63 },
        { district: 'Anuradhapura', areacode: 25 },
        { district: 'Avissawella', areacode: 36 },
        { district: 'Badulla', areacode: 55 },
        { district: 'Bandarawela', areacode: 57 },
        { district: 'Batticaloa', areacode: 65 },
        { district: 'Gampaha', areacode: 33 },
        { district: 'Hambantota', areacode: 47 },
        { district: 'Jaffna', areacode: 21 },
        { district: 'Kalmunai', areacode: 67 },
        { district: 'Kalutara', areacode: 34 },
        { district: 'Kandy', areacode: 81 },
        { district: 'Kegalle', areacode: 35 },
        { district: 'Kurunegala', areacode: 37 },
        { district: 'Mannar', areacode: 23 },
        { district: 'Matale', areacode: 66 },
        { district: 'Matara', areacode: 41 },
        { district: 'Nawalapitiya', areacode: 54 },
        { district: 'Negombo', areacode: 31 },
        { district: 'Nuwara Eliya', areacode: 52 },
        { district: 'Polonnaruwa', areacode: 27 },
        { district: 'Puttalam', areacode: 32 },
        { district: 'Ratnapura', areacode: 45 },
        { district: 'Trincomalee', areacode: 26 },
        { district: 'Vavuniya', areacode: 24 }
    ];

    const formSubmit = (e) => {
        e.preventDefault()
        const fixedNoLength= fixedNumbers==null?0:fixedNumbers.length;
        generateNumbers((7-fixedNoLength), count);
    }

    const generateNumbers = (length, noCount) => {
        const newNumbers = [];
        for (let i = 0; i < noCount; i++) {
            let randomNumber = Math.floor(Math.random() * 10 ** length) + 10 ** length; 

            // Ensure unique numbers within the specified length
            while (newNumbers.includes(randomNumber) && newNumbers.length == length) {
                randomNumber = Math.floor(Math.random() * (10 ** length));
            }
            newNumbers.push({Numbers:`0${selectedArea}${fixedNumbers!=null?fixedNumbers:''}${randomNumber.toString()}`}); // Convert to string for display
        }

        const worksheet = XLSX.utils.json_to_sheet(newNumbers);
        const workbook = XLSX.utils.book_new();

        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const excelBlob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(excelBlob);
        link.download = 'numberList.xlsx';
        link.click();
    };


    return (
        <Container>
            <h1>Generate phone numbers </h1>
            <Form onSubmit={formSubmit}>
                <Row className="mb-3 d-flex responsie-flex">
                    <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>districts</Form.Label>
                        <Form.Select value={selectedArea} onChange={(e) => setSelectedArea(e.target.value)} defaultValue="Choose...">
                            {areaCodes.map(area => (
                                <option value={area.areacode}>{`${area.district} (0${area.areacode})`}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridCity">
                        <Form.Label>Fixed numbers</Form.Label>
                        <Form.Control placeholder="Eg:- 01122xxxxx" value={fixedNumbers} onChange={(e) => setFixedNumbers(e.target.value)} />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridZip">
                        <Form.Label>Number count</Form.Label>
                        <Form.Control value={count} onChange={(e) => setCount(e.target.value)} />
                    </Form.Group>
                </Row>

                {/* <Form.Group className="mb-3" id="formGridCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group> */}

                <Button  variant="success" className="btncolor" type="submit">
                    Download Excel
                </Button>
            </Form>
        </Container>
    );
};

export default Scanner;
