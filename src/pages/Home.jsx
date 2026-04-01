import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Flex,
  Heading,
  Input,
  Button,
  VStack,
  Text,
  Select,
  Box,
} from "@chakra-ui/react";

function Home() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  return (
    <Flex width="100vw" height="100vh" position="relative">
      {/* select de idioma fixo no canto superior direito */}
      <Select
        position="absolute"
        top={4}
        right={4}
        width="120px"
        bgColor="#161b22"
        color="#e6edf3"
        borderColor="#30363d"
        onChange={(e) => i18n.changeLanguage(e.target.value)}
        value={i18n.language}
        zIndex={1}
      >
        <option
          value="pt"
          style={{ backgroundColor: "#161b22", color: "#e6edf3" }}
        >
          🇧🇷 PT-BR
        </option>
        <option
          value="en"
          style={{ backgroundColor: "#161b22", color: "#e6edf3" }}
        >
          🇺🇸 EN
        </option>
      </Select>

      {/* lado esquerdo — some no mobile */}
      <Flex
        display={["none", "none", "flex"]}
        width="50%"
        height="100%"
        bgColor="#0d1117"
        align="center"
        justify="center"
        direction="column"
        gap={4}
        p={8}
      >
        <svg height="80" viewBox="0 0 16 16" width="80" fill="#e6edf3">
          <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
        </svg>
        <Text color="#8b949e" fontSize="lg" textAlign="center">
          {t("home.title")}
        </Text>
      </Flex>

      {/* lado direito — full width no mobile, 50% no desktop */}
      <Flex
        width={["100%", "100%", "50%"]}
        height="100%"
        bgColor="#161b22"
        align="center"
        justify="center"
      >
        <VStack spacing={4} width="80%" maxWidth="400px">
          <Box display={["block", "block", "none"]}>
            <svg height="60" viewBox="0 0 16 16" width="60" fill="#e6edf3">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
            </svg>
          </Box>
          <Heading color="#e6edf3" fontSize={["xl", "2xl"]} textAlign="center">
            {t("home.text")}
          </Heading>

          <Input
            placeholder={t("home.placeholder")}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            bgColor="#0d1117"
            color="#e6edf3"
            borderColor="#30363d"
            _placeholder={{ color: "#8b949e" }}
            _focus={{ borderColor: "#58a6ff", boxShadow: "0 0 0 1px #58a6ff" }}
            onKeyDown={(e) =>
              e.key === "Enter" &&
              username.trim() &&
              navigate(`/profile/${username}`)
            }
          />

          <Button
            width="100%"
            bgColor="#238636"
            color="#fff"
            _hover={{ bgColor: "#2ea043" }}
            onClick={() => username.trim() && navigate(`/profile/${username}`)}
          >
            {t("home.button")}
          </Button>
        </VStack>
      </Flex>
    </Flex>
  );
}

export default Home;
