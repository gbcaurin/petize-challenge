import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { user, repos } from "../services/github.js";
import { userSchema } from "../schemas/user.js";
import { repoSchema } from "../schemas/repository.js";
import { formatDate } from "../utils/dateUtils.js";
import { z } from "zod";
import { useTranslation } from "react-i18next";
import {
  Box,
  Flex,
  Text,
  Heading,
  Image,
  Button,
  Select,
  SimpleGrid,
  Link,
} from "@chakra-ui/react";

function Profile() {
  const navigate = useNavigate();
  const { username } = useParams();
  const [userData, setUserData] = useState(null);
  const [reposData, setReposData] = useState([]);
  const [page, setPage] = useState(1);
  const [moreRepos, setMoreRepos] = useState(true);
  const [sort, setSort] = useState("created");
  const [error, setError] = useState(null);
  const loading = useRef(false);
  const obsRef = useRef();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    async function fetchUserData() {
      try {
        const userData = await user(username);
        if (userData.message === "Not Found") {
          setError(t("profile.notFound"));
          return;
        }
        const validate = userSchema.safeParse(userData);
        if (!validate.success) return;
        setUserData(validate.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
    fetchUserData();
  }, [username, t]);

  useEffect(() => {
    async function fetchReposData() {
      if (loading.current) return;
      loading.current = true;
      try {
        const reposData = await repos(username, page, sort);
        const validate = z.array(repoSchema).safeParse(reposData);
        if (!validate.success) return;
        setReposData((prev) => [...prev, ...validate.data]);
        if (validate.data.length < 10) setMoreRepos(false);
      } catch (error) {
        console.error("Error fetching repos data:", error);
      } finally {
        loading.current = false;
      }
    }
    fetchReposData();
  }, [username, page, sort]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && moreRepos) {
        setPage((prev) => prev + 1);
      }
    });
    observer.observe(obsRef.current);
    return () => observer.disconnect();
  }, [moreRepos]);

  if (error) {
    return (
      <Flex
        minH="100vh"
        bgColor="#0d1117"
        align="center"
        justify="center"
        direction="column"
        gap={4}
      >
        <Text color="#e6edf3" fontSize="xl">
          {error}
        </Text>
        <Button
          bgColor="#238636"
          color="#fff"
          _hover={{ bgColor: "#2ea043" }}
          onClick={() => navigate(-1)}
        >
          {t("profile.back")}
        </Button>
      </Flex>
    );
  }

  return (
    <Box minH="100vh" bgColor="#0d1117" color="#e6edf3">
      {/*header*/}
      <Flex
        bgColor="#161b22"
        borderBottom="1px solid #30363d"
        px={8}
        py={4}
        align="center"
      >
        <Select
          position="absolute"
          top={4}
          right={4}
          width="120px"
          bgColor="#161b22"
          color="#e6edf3"
          borderColor="#30363d"
          onChange={(e) => i18n.changeLanguage(e.target.value)} //troca idioma ao selecionar
          value={i18n.language}
        >
          <option
            value="pt"
            style={{
              backgroundColor: "#161b22",
              color: "#e6edf3",
            }}
          >
            🇧🇷 PT-BR
          </option>
          <option
            value="en"
            style={{
              backgroundColor: "#161b22",
              color: "#e6edf3",
            }}
          >
            🇺🇸 EN
          </option>
        </Select>
        <Button
          bgColor="transparent"
          color="#58a6ff"
          _hover={{ bgColor: "#21262d" }}
          onClick={() => navigate(-1)}
        >
          ← {t("profile.back")}
        </Button>
      </Flex>

      <Box maxW="1100px" mx="auto" px={8} py={10}>
        {/*foto com infos*/}
        {userData && (
          <Flex gap={8} mb={10} align="flex-start">
            {/* Avatar circular */}
            <Image
              src={userData.avatar_url}
              alt={userData.login}
              borderRadius="full"
              boxSize="150px"
              border="2px solid #30363d"
            />

            <Box
              flex={1}
              bgColor="#161b22"
              border="1px solid #30363d"
              borderRadius="md"
              p={6}
            >
              <Link href={`https://github.com/${userData.login}`}>
                <Heading fontSize="xl" color="#e6edf3">
                  {userData.login}
                </Heading>
              </Link>

              {userData.bio && (
                <Text color="#8b949e" mt={2}>
                  {userData.bio}
                </Text>
              )}

              {/* botões (se tiver twitter, site) */}
              <Flex gap={3} mt={6}>
                {userData.blog && (
                  <Link href={userData.blog} isExternal>
                    <Button
                      size="sm"
                      bgColor="#21262d"
                      color="#58a6ff"
                      border="1px solid #30363d"
                      _hover={{ bgColor: "#30363d" }}
                    >
                      {t("profile.site")}
                    </Button>
                  </Link>
                )}
                {userData.twitter_username && (
                  <Link
                    href={`https://x.com/${userData.twitter_username}`}
                    isExternal
                  >
                    <Button
                      size="sm"
                      bgColor="#21262d"
                      color="#58a6ff"
                      border="1px solid #30363d"
                      _hover={{ bgColor: "#30363d" }}
                    >
                      𝕏 {t("profile.twitter")}
                    </Button>
                  </Link>
                )}
              </Flex>
            </Box>
          </Flex>
        )}

        <Flex justify="space-between" align="center" mb={6}>
          <Heading fontSize="lg" color="#e6edf3">
            {t("profile.repos")}
          </Heading>
          <Select
            width="220px"
            bgColor="#161b22"
            color="#e6edf3"
            borderColor="#30363d"
            _focus={{ borderColor: "#58a6ff" }}
            value={sort}
            onChange={(e) => {
              setReposData([]);
              setPage(1);
              setMoreRepos(true);
              setSort(e.target.value);
            }}
          >
            <option value="created" style={{ backgroundColor: "#161b22" }}>
              {t("profile.sortCreated")}
            </option>
            <option value="updated" style={{ backgroundColor: "#161b22" }}>
              {t("profile.sortUpdated")}
            </option>
            <option value="pushed" style={{ backgroundColor: "#161b22" }}>
              {t("profile.sortPushed")}
            </option>
            <option value="full_name" style={{ backgroundColor: "#161b22" }}>
              {t("profile.sortFullName")}
            </option>
          </Select>
        </Flex>

        <SimpleGrid columns={2} spacing={4}>
          {reposData.map((repo) => (
            <Box
              key={repo.id}
              bgColor="#161b22"
              border="1px solid #30363d"
              borderRadius="md"
              p={5}
              _hover={{ borderColor: "#58a6ff" }}
              transition="border-color 0.2s"
            >
              {/*nome do repo como link */}
              <Link
                href={repo.html_url}
                isExternal
                color="#58a6ff"
                fontWeight="bold"
                fontSize="md"
              >
                {repo.name}
              </Link>

              {/* descrição (se existir) */}
              {repo.description && (
                <Text color="#8b949e" fontSize="sm" mt={2} noOfLines={2}>
                  {repo.description}
                </Text>
              )}

              {/* estrelas, forks e linguagem utilizada*/}
              <Flex gap={4} mt={4} align="center">
                {repo.language && (
                  <Text color="#8b949e" fontSize="xs">
                    ● {repo.language}
                  </Text>
                )}
                <Text color="#8b949e" fontSize="xs">
                  ⭐ {repo.stargazers_count}
                </Text>
                <Text color="#8b949e" fontSize="xs">
                  🍴 {repo.forks_count}
                </Text>
                <Text color="#8b949e" fontSize="xs">
                  {t("profile.updated")}
                  {formatDate(repo.updated_at, t)}
                </Text>
              </Flex>
            </Box>
          ))}
        </SimpleGrid>

        {/* IntersectionObserver para renderização infinita*/}
        <div ref={obsRef} />
      </Box>
    </Box>
  );
}

export default Profile;
