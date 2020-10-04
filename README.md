# Wiki-API

RESTful API for Wikipedia-like articles using Node.js and Express

### Install

    $ npm install

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
        <td>Get all of the articles</td>
    </tr>
    <tr>
        <td>POST</td>
        <td>/articles</td>
        <td>Add a new article</td>
    </tr>
</table>

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
