export const additional = `#graphql
  type Additional {
    message: String
    run_at: String
  }

  extend type Query {
    additional: Additional
  }
`;
