const express = require("express");
const { ApolloServer, gql} = require("apollo-server-express");
const cors = require("cors");

const app = express();
app.use(cors());

const movies = [
    {id: "1", title: "Star Wars", director: "George Lucas", releaseYear: 1977},
    {id: "2", title: "Back to the Future", director: "Robert Zemeckis", releaseYear: 1985},
    {id: "3", title: "Jurassic Park", director: "Steven Spielberg", releaseYear: 1993},
    {id: "4", title: "Batman Begins", director: "Christopher Nolan", releaseYear: 2005},
    {id: "5", title: "Iron Man", director: "Jon Favreau", releaseYear: 2008},

];

const typeDefs = gql`
type Movie{
id: ID!
title: String!
director: String!
releaseYear: Int! 
}
type Query{
getMovies: [Movie]
getMovie(id: ID!): Movie
}
type Mutation{
addMovie(title: String!, director: String!, releaseYear: Int!): Movie
}
`;

const resolvers = {
    Query: {
        getMovies: ()=> movies,
        getMovie: (_, {id}) => movies.find(movie => movie.id === id)
    },

    Mutation: {
        addMovie: (_, {title, director, releaseYear}) => {
            const newMovie = {id: String(movies.length + 1), title, director, releaseYear};

            movies.push(newMovie);
            return newMovie;
        }
    }
};

const server = new ApolloServer({typeDefs, resolvers});

async function startServer(){
    await server.start();
    server.applyMiddleware({app});

    app.listen(4000, () => {
        console.log("Server running at http://localhost:4000/graphql");
    });
}

startServer();