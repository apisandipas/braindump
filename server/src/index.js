import "@babel/polyfill";
import { ApolloServer } from "apollo-server-express";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { verify } from "jsonwebtoken";
import { fileLoader, mergeResolvers, mergeTypes } from "merge-graphql-schemas";
import models from "models";
import path from "path";
import { createTokens } from "services/auth";

dotenv.config();

const typeDefs = mergeTypes(fileLoader(path.join(__dirname, "./schema")));
const resolvers = mergeResolvers(
  fileLoader(path.join(__dirname, "./resolvers"))
);
const port = process.env.PORT || 8080;
const app = express();

app.use(cors({ origin: process.env.CLIENT_URL }));

app.use(async (req, res, next) => {
  const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;
  const accessToken = req.headers["x-token"];
  const refreshToken = req.headers["x-refresh-token"];

  if (!accessToken && !refreshToken) {
    return next();
  }

  //console.log(req.headers);

  try {
    const { user } = verify(accessToken, ACCESS_TOKEN_SECRET);

    req.user = user.id;
    return next();
  } catch (err) {
    console.error(err);
  }

  if (!refreshToken) {
    return next();
  }

  let data;

  try {
    data = verify(refreshToken, REFRESH_TOKEN_SECRET);
  } catch (err) {
    console.error(err);
    return next();
  }

  const user = await models.User.where({ id: data.user.id }).fetch();
  if (!user || user.get("invalidationCount") !== data.user.invalidationCount) {
    return next();
  }

  const newTokens = createTokens(user);
  console.log("newTokens", newTokens);
  if (newTokens.token && newTokens.refreshToken) {
    res.set("Access-Control-Expose-Headers", "x-token, x-refresh-token");
    res.set("x-token", newTokens.token);
    res.set("x-refresh-token", newTokens.refreshToken);
  }

  req.user = user.get("id");

  next();
});

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => ({ models, req, res }),
  playground: process.env.NODE_ENV === "development"
});

server.applyMiddleware({ app });

app.listen({ port }, () => {
  console.log(
    `🚀  Server ready at http://locahost:${port}${server.graphqlPath}`
  ); // eslint-disable-line no-console
});
