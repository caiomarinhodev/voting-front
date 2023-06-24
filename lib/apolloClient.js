import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://7mq9mvzoj3.execute-api.us-east-1.amazonaws.com/dev/', // Substitua pela URL do seu backend GraphQL
  cache: new InMemoryCache(),
});

export default client;
