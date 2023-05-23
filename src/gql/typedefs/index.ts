import { additional } from "./additional";
import { core } from "./core";

const base = `#graphql
  type Query {
    status: String
  }
`;

export const typedefs = [base, core, additional];
