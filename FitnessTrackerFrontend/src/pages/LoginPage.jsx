import { useState } from "react";
import { Box, Input, Button, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const DUMMY_USER = {
  email: "john@example.com",
  password: "securepass",
  username: "john_doe",
  id: 2,
};

const LoginPage = () => {
  const navigate = useNavigate();
  const [loginInput, setLoginInput] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    // username password validation
    if (
      (loginInput === DUMMY_USER.email || loginInput === DUMMY_USER.username) &&
      password === DUMMY_USER.password
    ) {
      setError("");
      // Save user info to localStorage for later use
      localStorage.setItem("user", JSON.stringify(DUMMY_USER));
      navigate("/dashboard");
    } else {
      setError("Invalid username/email or password");
    }
  };

  return (
    <Box
      minH="90vh"
      minW="90vw"
      bg="white"
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
          WELCOME TO FITNESS TRACKER
        </Text>
        <Input
          placeholder="Username or Email address"
          variant="filled"
          mb={4}
          bg="white"
          _placeholder={{ color: "gray.500" }}
          size="md"
          width="100%"
          color="black"
          fontSize="md"
          borderRadius="md"
          value={loginInput}
          onChange={(e) => setLoginInput(e.target.value)}
        />
        <Input
          placeholder="Password"
          type="password"
          variant="filled"
          mb={6}
          bg="white"
          color="black" 
          _placeholder={{ color: "gray.500" }}
          size="md"
          width="100%"
          fontSize="md"
          borderRadius="md"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
          onClick={handleLogin}
        >
          Login
        </Button>
        {error && (
          <Text color="red.300" fontSize="sm" mb={4}>
            {error}
          </Text>
        )}
        <Text color="white" fontSize="sm">
          New to us?{" "}
          <span
            style={{
              textDecoration: "underline",
              cursor: "pointer",
              fontWeight: "bold",
            }}
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </span>
        </Text>
      </Box>
    </Box>
  );
};

export default LoginPage;
