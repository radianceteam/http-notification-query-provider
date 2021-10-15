import {signUpValidation} from "@http-notifs/validation";
import {
  Alert,
  AlertTitle,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import {useFormik} from "formik";
import _ from "lodash";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";

import useUser from "../src/hooks/useUser";

export default function SignUpPage() {
  const [alert, setAlert] = useState(null);

  const {user} = useUser();
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
      passwordConfirmation: "",
    },
    validationSchema: signUpValidation,
    async onSubmit({email, password, passwordConfirmation}, {resetForm}) {
      const {data} = await axios.post(
        "https://http-notifs.xyz/api/auth/email-register",
        {
          email,
          password,
          passwordConfirmation,
        },
      );

      resetForm();

      if ("error" in data) setAlert("error");
      else setAlert("success");
    },
  });

  return (
    <Container maxWidth="sm" component="form" onSubmit={handleSubmit}>
      <Typography variant="h5" component="h2" mt={2} textAlign="center">
        Sign Up
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
        <TextField
          label="Confirm password"
          variant="outlined"
          sx={{mt: 2, minWidth: 290}}
          name="passwordConfirmation"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.passwordConfirmation}
          error={touched.passwordConfirmation && !!errors.passwordConfirmation}
          helperText={
            touched.passwordConfirmation &&
            _(errors.passwordConfirmation).startCase().toLowerCase()
          }
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
            This email already registered —{" "}
            <strong>try to reset password</strong>
          </Alert>
        )}
        {alert === "success" && !dirty && (
          <Alert severity="success" sx={{mt: 3}} onClose={() => setAlert(null)}>
            <AlertTitle>Success</AlertTitle>
            We sent you email with <strong>confirmation link</strong>
            <Typography variant="body2">
              (Link will expire in 1 hour)
            </Typography>
          </Alert>
        )}
      </Stack>
    </Container>
  );
}
