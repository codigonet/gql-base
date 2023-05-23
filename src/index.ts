import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typedefs } from "~gql/typedefs";
import { resolvers } from "~gql/resolvers";

(async () => {
  const globals = [global];
  const server = new ApolloServer({
    typeDefs: typedefs,
    resolvers: resolvers,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 9001 },
  });
  return url;
})().then((url) => {
  console.log(`🚀  GQL Core on: ${url}`);
});
console.log("Starting GQL Core");
