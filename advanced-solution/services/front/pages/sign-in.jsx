import {log} from "@http-notifs/logger";
import {signInValidation} from "@http-notifs/validation";
import {
  Alert,
  AlertTitle,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import {useFormik} from "formik";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";

import useUser from "../src/hooks/useUser";

export default function SignUpPage() {
  const [alert, setAlert] = useState(null);

  const {user, login} = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user) router.replace("/");
  }, [user, router]);

  const {
    values,
    handleBlur,
    handleChange,
    handleSubmit,
    errors,
    touched,
    isValid: valid,
    dirty,
    isSubmitting: submitting,
    isValidating: validating,
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: signInValidation,
    async onSubmit({email, password}, {resetForm}) {
      const data = await login(email, password);

      log("data from sign-in", data);

      resetForm();

      if ("error" in data) setAlert("error");
      else setAlert("success");
    },
  });

  return (
    <Container maxWidth="sm" component="form" onSubmit={handleSubmit}>
      <Typography variant="h5" component="h2" mt={2} textAlign="center">
        Sign In
      </Typography>
      <Stack alignItems="center">
        <TextField
          label="Email"
          variant="outlined"
          sx={{mt: 2, minWidth: 290}}
          name="email"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.email}
          error={touched.email && !!errors.email}
          helperText={touched.email && errors.email}
        />
        <TextField
          label="Password"
          variant="outlined"
          sx={{mt: 2, minWidth: 290}}
          name="password"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.password}
          error={touched.password && !!errors.password}
          helperText={touched.password && errors.password}
          type="password"
        />
        <Button
          sx={{mt: 3}}
          variant="contained"
          type="submit"
          disabled={!valid || submitting || validating}
        >
          Submit
        </Button>
        {alert === "error" && !dirty && (
          <Alert severity="error" sx={{mt: 3}} onClose={() => setAlert(null)}>
            <AlertTitle>Error</AlertTitle>
            Something went wrong
          </Alert>
        )}
        {alert === "success" && !dirty && (
          <Alert severity="success" sx={{mt: 3}} onClose={() => setAlert(null)}>
            <AlertTitle>Success</AlertTitle>
            You logged in
          </Alert>
        )}
      </Stack>
    </Container>
  );
}
