import { Box, Input, Button, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const navigate = useNavigate();

  return (
    <Box
      minH="100vh"
      bg="gray.100"
      display="flex"
      alignItems="center"
      justifyContent="center"
      m={0}
      p={0}
    >
      <Box
        w="370px"
        maxW="90vw"
        p={8}
        bg="teal.400"
        borderRadius="xl"
        boxShadow="0 4px 24px rgba(0,0,0,0.10)"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Text
          fontSize="2xl"
          fontWeight="semibold"
          color="white"
          mb={8}
          letterSpacing="-tight"
        >
          CREATE YOUR ACCOUNT
        </Text>

        <Input
          placeholder="Email address"
          variant="filled"
          mb={4}
          bg="white"
          _placeholder={{ color: "gray.500" }}
          size="md"
          width="100%"
          fontSize="md"
          borderRadius="md"
        />

        <Input
          placeholder="Username"
          variant="filled"
          mb={4}
          bg="white"
          _placeholder={{ color: "gray.500" }}
          size="md"
          width="100%"
          fontSize="md"
          borderRadius="md"
        />

        <Input
          placeholder="Password"
          type="password"
          variant="filled"
          mb={6}
          bg="white"
          _placeholder={{ color: "gray.500" }}
          size="md"
          width="100%"
          fontSize="md"
          borderRadius="md"
        />

        <Button
          colorScheme="teal"
          bg="white"
          color="teal.500"
          width="100%"
          borderRadius="md"
          fontWeight="bold"
          fontSize="md"
          mb={6}
          _hover={{ bg: "teal.100" }}
          boxShadow="sm"
        >
          Register
        </Button>

        <Text color="white" fontSize="sm">
          Already have an account?{" "}
          <span
            style={{
              textDecoration: "underline",
              cursor: "pointer",
              fontWeight: "bold",
            }}
            onClick={() => navigate("/")}
          >
            Log in
          </span>
        </Text>
      </Box>
    </Box>
  );
};

export default RegisterPage;
