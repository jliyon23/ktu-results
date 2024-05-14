import { useState } from "react";
import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Flex, Heading, Card, CardHeader, VStack,Alert, AlertIcon, Text, Box, Select, Button } from "@chakra-ui/react";

export default function Home() {
    const [program, setProgram] = useState("");
    const navigate = useNavigate();
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    function handleSubmit(e) {
        e.preventDefault();
        console.log(program);
        setLoading(true);
        axios.post("/", { program })
            .then((res) => {
                console.log(res.data);
                if (!res.data.success) {
                    navigate('/')
                }
                setTimeout(() => {
                    setLoading(false);
                    setResults(res.data.data);
                }, 1000);
            })
            .catch((error) => {
                console.error(error);

            });
    }

    return (
        <Box p={4}>
            <Flex width="full" align="center" justifyContent="center">

                <Box textAlign="center" mt={4} p={8} maxW={800} borderWidth={2} borderRadius={8}>
                    <Heading as="h3" m={2} size="lg">
                        Select your program
                    </Heading>
                    <Select placeholder="Select Program" onChange={(e) => setProgram(e.target.value)}>
                        <option value="1">B.Tech</option>
                        <option value="2">M.Tech</option>
                        <option value="3">MBA</option>
                        <option value="4">MCA</option>
                        <option value="5">B.Arch</option>
                        <option value="6">M.Arch</option>
                        <option value="7">Hotel Management and Catering Technology</option>
                        <option value="8">MHM</option>
                        <option value="9">M.planning</option>
                        <option value="10">MCA (Second year direct)</option>
                        <option value="11">MHM Dual Degree (INTEGRATED)</option>
                        <option value="12">PhD</option>
                        <option value="13">B.Des</option>
                        <option value="14">MCA TWO YEARS</option>
                        <option value="15">B.Voc</option>
                        <option value="16">MBA INTEGRATED</option>
                        <option value="17">MBA with specialization</option>
                        {/* Add other options */}
                    </Select>
                    <Box textAlign="center" mt={4}>
                        <Button colorScheme="blue" onClick={handleSubmit}>
                            Submit
                        </Button>
                    </Box>
                </Box>

            </Flex>
            <Flex width="full" mt={8} align="center" justifyContent="center">
                {loading ? (
                    <Box maxW={800}>
                        <Alert status='info'>
                            <AlertIcon />
                            Loading Available Results....
                        </Alert>
                    </Box>
                ) : (
                    results.length > 0 ? (
                        <Card width="100%" p={8}>
                            <CardHeader align="center">
                                <VStack spacing={4}>
                                    {results.map((result, index) => (
                                        <React.Fragment key={index}>
                                            <Heading size="md">{result.resultName}</Heading>
                                            <Text fontSize="md">Date of Result: {result.publishDate}</Text>
                                            <Button
                                                colorScheme="blue"
                                                width="50%"
                                                mb={4}
                                                variant='outline'
                                                onClick={() => navigate(`/individualResults/${result.examDefId}/${result.schemeId}`)}
                                            >
                                                View more
                                            </Button>
                                        </React.Fragment>
                                    ))}
                                </VStack>
                            </CardHeader>
                        </Card>
                    ) : (
                        <Box textAlign="center">
                            <p>No results found</p>
                        </Box>
                    )
                )}
            </Flex>

            {/* <Box mt={8}>
                {results.length > 0 ? (
                    <Box overflowX="auto">
                        <table>
                            <thead>
                                <tr>
                                    <th>Result Name</th>
                                    <th>Date of Result</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {results.map((result, index) => (
                                    <tr key={index}>
                                        <td>{result.resultName}</td>
                                        <td>{result.publishDate}</td>
                                        <td>
                                            <Button colorScheme="blue" onClick={() => navigate(`/individualResults/${result.examDefId}/${result.schemeId}`)}>
                                                View Details
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </Box>
                ) : (
                    <Box textAlign="center">
                        <p>No results found</p>
                    </Box>
                )}
            </Box> */}
        </Box>
    );
}