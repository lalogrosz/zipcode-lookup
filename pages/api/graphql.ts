import { makeExecutableSchema } from "@graphql-tools/schema";
import { ApolloServer } from "apollo-server-micro";
import { NextApiRequest, NextApiResponse } from "next";
import typeDefs from "../../graphql/typeDefs";
import resolvers from "../../graphql/resolvers";

const schema = makeExecutableSchema({ typeDefs, resolvers });

export const config = {
  api: {
    bodyParser: false
  }
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "OPTIONS") {
    res.end();
    return;
  }

  const apolloServer = new ApolloServer({
    schema
  });
  await apolloServer.start();
  await apolloServer.createHandler({
    path: "/api/graphql"
  })(req, res);
};

export default handler;
