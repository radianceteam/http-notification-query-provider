import {Static, Type} from "@sinclair/typebox";

export const Body = Type.Object({
  hash: Type.String(),
  data: Type.String(),
});

export type BodyType = Static<typeof Body>;

export const Response = Type.String();

export type ResponseType = Static<typeof Response>;

export type CredentialsType = {
  email: string;
  passwordHash: string;
  sessionId: string;
};
