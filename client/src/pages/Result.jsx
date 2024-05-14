import { useParams } from 'react-router-dom';
import { useState } from 'react';
import html2canvas from 'html2canvas-pro';
import { useRef } from 'react';
import jsPDF from 'jspdf';
import axios from 'axios';
import { Flex, Box,  Alert, AlertIcon, FormControl, FormLabel, Input, Button, Card, Stack, Heading, Text as CText, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";

export default function Result() {
    const { examDefId, schemeId } = useParams();
    const [registerNumber, setRegisterNumber] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [examResults, setExamResults] = useState([]);
    const [notValid, setNotValid] = useState(false)
    const [sgpa, setSgpa] = useState()

    const targetRef = useRef();

        const downloadPDF = () => {
            const input = targetRef.current;
            html2canvas(input).then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF('p', 'mm', 'a4', true);
                const pdfHeight = pdf.internal.pageSize.getHeight();
                const pdfWidth = pdf.internal.pageSize.getWidth();
                const imgWidth = canvas.width;
                const imgHeight = canvas.height;
                const ratio = Math.min(pdfWidth/imgWidth, pdfHeight/imgHeight);
                const imgX = (pdfWidth - imgWidth * ratio);
                const imgY = 30;
                pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth*ratio, imgHeight*ratio);
                pdf.save(`${examResults.registerNo}.pdf`)
            })
        }


    const handleSubmit = () => {
        axios.post(`/individualResult`, {
            registerNumber, dateOfBirth, examDefId, schemeId
        })
            .then(res => {

                console.log(res.data.data);
                setExamResults(res.data.data);
                setSgpa(res.data.sgpa);
                setNotValid(false)
            })
            .catch(error => {
                setNotValid(true);
                console.error(error);
            });
    };

    return ( 
        <Box p={4}>

            <Flex width="full" align="center" justifyContent="center">


                <Box textAlign="center" mt={4} p={8} width={500} borderWidth={2} borderRadius={8}>
                    
                    {notValid ? (
                        <Alert status='error'>
                        <AlertIcon />
                        invalid register number and dob
                    </Alert>
                    ) : (
                        <>
                        </>
                    )}
                    
                    
                    <Box mt={2}>
                        <FormControl>
                            <FormLabel>Register Number</FormLabel>
                            <Input type="text" value={registerNumber} onChange={(e) => setRegisterNumber(e.target.value)} />
                        </FormControl>
                    </Box>
                    <Box mt={2}>
                        <FormControl>
                            <FormLabel>Date of Birth</FormLabel>
                            <Input type="date" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} />
                        </FormControl>
                    </Box>
                    <Box mt={2}>
                        <Button type="submit" variant="outline" width="full" mt={4} colorScheme="blue" onClick={handleSubmit}>
                            Submit
                        </Button>
                    </Box>
                </Box>
            </Flex>
            <Box width="100%" ref={targetRef}>

           
            {examResults && examResults.resultDetails ? (
                <Card maxW={800} borderWidth={2} borderRadius={8} p={8} mx="auto" mt={4}>
                    <Stack spacing={2}>
                        <Heading as="h3" size="lg">
                            {examResults.resultName}
                        </Heading>
                        <CText fontSize="md">
                            <strong>Student Name    :</strong>     {examResults.fullName}
                        </CText>
                        <CText fontSize="md">
                        <strong>Institution Name      :</strong> {examResults.institutionName}
                        </CText>
                        <CText fontSize="md">
                        <strong>Register No        :</strong> {examResults.registerNo}
                        </CText>
                        <CText fontSize="md">
                        <strong>Branch      :</strong> {examResults.branchName}
                        </CText>
                        <Heading as="h6" align="center" size="lg">
                            SGPA : {sgpa}
                        </Heading>
                        <Button variant="outline" colorScheme="teal" onClick={downloadPDF} >Print Result</Button>
                    </Stack>
                </Card>
            ) : (
                <p></p>
            )}
            <Box mt={8}>
                <Table>
                    <Thead>
                        <Tr>
                            <Th>Subject</Th>
                            <Th>Marks</Th>
                            <Th>Credits</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {examResults && examResults.resultDetails && examResults.resultDetails.length > 0 ? (
                            examResults.resultDetails.map((item, index) => (
                                <Tr key={index}>
                                    <Td><strong>{item.courseName}</strong></Td>
                                    <Td><strong>{item.grade}</strong></Td>
                                    <Td><strong>{item.credits}</strong></Td>
                                </Tr>
                            ))
                        ) : (
                            <Tr>
                                <Td colSpan="3">No results found</Td>
                            </Tr>
                        )}
                    </Tbody>
                </Table>
            </Box>
            </Box>
        </Box>
    );
}