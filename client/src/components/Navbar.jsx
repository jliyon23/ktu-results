import { Box, Flex,  Stack } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <Box bg="#d7e0e6" borderWidth={2}  p={4}>
      <Flex align="center" justify="space-between">
        <NavLink to="/" className="font-bold">
          <Box fontSize="2xl">KTU Results</Box>
        </NavLink>
        <Stack direction="row" spacing={4}>
          <NavLink to="/" className="text-dark bg-blue-400 p-4 rounded-md">
            Home
          </NavLink>
          {/* <NavLink to="/contact" className="text-dark bg-blue-400 p-4 rounded-md">
            Contact Admin
          </NavLink>
          <NavLink to="/report" className="text-dark bg-blue-400 p-4 rounded-md">
            Report Issue
          </NavLink> */}
        </Stack>
      </Flex>
    </Box>
  );
}