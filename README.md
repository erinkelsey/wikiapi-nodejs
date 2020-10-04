# Wiki-API

RESTful API for Wikipedia-like articles using Node.js and Express

### Install

    $ npm install

### Setup

Create a .env file in the main folder, containing the connection string for your MongoDB. For example, use the following for local connections:

MONGODB_SRV_ADDRESS=mongodb://localhost:27017/blogDB

### Run

    $ npm start

## API Details

<table>
    <thead>
        <tr>
            <th>Method</th>
            <th>Route</th>
            <th>Description</th>
        </tr>
    </thead>
    <tr>
        <td>GET</td>
        <td>/articles</td>
        <td>Get all of the articles in the collection.</td>
    </tr>
    <tr>
        <td>POST</td>
        <td>/articles</td>
        <td>Add a new article to the collection.</td>
    </tr>
    <tr>
        <td>DELETE</td>
        <td>/articles</td>
        <td>Deletes all articles in the collection.</td>
    </tr>
    <tr>
        <td>GET</td>
        <td>/articles/:articleTitle</td>
        <td>Get the article with the specific title from the collection.</td>
    </tr>
    <tr>
        <td>PUT</td>
        <td>/articles/:articleTitle</td>
        <td>Replaces the entire document with the specific title.</td>
    </tr>
    <tr>
        <td>PATCH</td>
        <td>/articles/:articleTitle</td>
        <td>Updates the document with the specific title, but only those fields that are sent in request.</td>
    </tr>
    <tr>
        <td>DELETE</td>
        <td>/articles/:articleTitle</td>
        <td>Deletes article with the specific title.</td>
    </tr>
</table>

NOTE: All articleTitle params are case-sensitive.

### GET Method -> JSON Response Example

        [
            {
                "_id":"5f795439cfcf52abb5694943",
                "title":"REST",
                "content":"REST is short for REpresentational State Transfer. It's an architectural style for designing APIs."
            },
            {
                "_id":"5c139771d79ac8eac11e754a",
                "title":"API",
                "content":"API stands for Application Programming Interface. It is a set of subroutine definitions, communication protocols, and tools for building software. In general terms, it is a set of clearly defined methods of communication among various components. A good API makes it easier to develop a computer program by providing all the building blocks, which are then put together by the programmer."
            }
        ]

### POST Method -> Request Body

Request body must be x-www-form-urlencoded, with key-value pairs for title and content fields.
