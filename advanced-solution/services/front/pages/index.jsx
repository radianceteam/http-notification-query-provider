import {log} from "@http-notifs/logger";
import {GitHub as GitHubIcon} from "@mui/icons-material";
import {Box, Button, Container, Link, Stack, Typography} from "@mui/material";
import {useRouter} from "next/router";

import useUser from "../src/hooks/useUser";

export default function Index() {
  const router = useRouter();

  const {user, logout} = useUser();

  log("user from swr data", user);

  return (
    <Container maxWidth="md">
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        mt={4}
        textAlign="center"
      >
        Http Notifs
      </Typography>
      <Typography variant="subtitle2" textAlign="center">
        A microservice oriented webservice delivering messages from blockchain
      </Typography>
      <Typography mt={4} textAlign="center">
        To see more more information about project, please, checkout{" "}
        <Link
          href="https://github.com/radianceteam/http-notifs"
          target="_blank"
        >
          <GitHubIcon sx={{mr: 0.5, mb: -0.5}} />
          http-notifs
        </Link>
      </Typography>
      <Stack alignItems="center">
        {user ? (
          <>
            <Typography mt={4} variant="body2">
              Check out your webhook urls
            </Typography>
            <Box>
              <Button
                variant="outlined"
                sx={{mr: 1}}
                onClick={() => router.push("/webhooks")}
              >
                Webhook urls
              </Button>
              <Button
                variant="contained"
                onClick={() => logout()}
                color="error"
              >
                Logout
              </Button>
            </Box>
          </>
        ) : (
          <>
            <Typography mt={4} variant="body2">
              To get started you need to
            </Typography>
            <Box>
              <Button
                variant="outlined"
                sx={{mr: 1}}
                onClick={() => router.push("/sign-in")}
              >
                Sign In
              </Button>
              <Button
                variant="contained"
                onClick={() => router.push("/sign-up")}
              >
                Sign Up
              </Button>
            </Box>
          </>
        )}
      </Stack>
    </Container>
  );
}
