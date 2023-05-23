export const core = `#graphql
  type Core {
    version: String
    run_at: String
    ok: String
  }

  extend type Query {
    core: Core
  }
`;
