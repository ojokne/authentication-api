# authentication-api
## About
This is an API based authentication service, you can use it with any front end project.
It returns a json web token which you can use to validate your users.

The base url is https://authentication-api.up.railway.app/api/

## Motivation
Being a front end enthusiast, I have good skills in HTML, CSS and JavaScript and the [react.js](https://reactjs.org/) framework.
However, these normally are not enough. I have in some circumstances wanted an authentication service for my front end clients.

There are several services out there, but sadly none was simple and easy enough for me to use out of the box. Because of this I decided to write a simple but elegant authentication API.

## Framework
The API is fully written in [Express.js](https://expressjs.com/)

## Installation
```
git clone https://github.com/ojokne/authentication-api.git
```

``` npm install
```

## How to use
The API provides two end points
1. `/signup` to add users to the database
2. `/login` to authenticate users and request for a json web token

> All requests made to the endpoints should be `POST` methods

The requests should always have the following

```json
{
    "username":"username",
    "password":"password"
}
```

`username` should be unique for all users.

### Response codes
The API appends a "Response Code" to each API Call to help tell developers what the API is doing

| response_code | response_message | meaning |
| ------------- | ---------------- | ------- |
| 0             | Success          | For `/signup` The user was successfully created  while `/login` the user credentials where successfully verified and a token is returned as well |
| 1             | Provide all fields | One of `username` or `password` or both fields are missing |
| 2             | Populate all fields | One of `username` or `password` or  fields is empty|
| 3             | User already exists | Reurned by `/ignup` when there is already a user in the database with that username |
| 4             | Incorrect credentials | Returned by `/login` when either `username` or `password` is incorrect |

## Examples
### `/signup`

```
https://authentication-api.up.railway.app//api/signup
```

### Json data
```json
{
    "username":"oen",
    "password":"0771234567"
}
```
#### `/login`
```
https://authentication-api.up.railway.app/api/login
```

##### Json data
```json
{
    "username":"oen",
    "password":"0771234567"
}
```
