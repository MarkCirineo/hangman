import React from "react";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";

const httpLink = createHttpLink({
    uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem("id_token");

    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : ``,
        },
    };
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});

function App() {
    return (
        <ApolloProvider client={client}>
            <Router>
                <NavBar />
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/signup" component={Signup} />
                    <Route exact path="/user/:username" component={Profile} />           
                </Switch>
            </Router>
        </ApolloProvider>
    );
}

export default App;
