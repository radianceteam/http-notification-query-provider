import "core-js/es/promise";
import "core-js/es/set";
import "core-js/es/map";

import * as yup from "yup";

export const signInValidation = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required().min(6),
});

export const signUpValidation = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required().min(6),
  passwordConfirmation: yup
    .string()
    .required()
    .oneOf([yup.ref("password")], "passwords must match"),
});

export const webHookValidation = yup.object().shape({
  webUrl: yup.string().url().required(),
});

export const linkConfirmationValidation = yup.object().shape({
  id: yup.string().uuid().required(),
});
