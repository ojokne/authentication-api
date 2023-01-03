# authentication-api

## About

This repository is a partial implementation for API authetication. It should be used in a project where users require a token to use the service. 

Customize the code to fit the specific requirements of the application


## Motivation

Being a front end enthusiast, I have good skills in HTML, CSS and JavaScript and the [react.js](https://reactjs.org/) framework.
However, these normally are not enough. I have in some circumstances wanted to implement secure API for my several front end clients.

Having knowledge of [node.js](https://nodejs.org/en/), I create APIs which my front end projects make requets to, However, handling authentication becomes repetitive after several projects. Therefore I created this so that I dont have to repeat myself but just fork it and modify to the requirements of the kind of API and creating

## Framework

The API is fully written in [Express.js](https://expressjs.com/)

## Installation

```
git clone https://github.com/ojokne/authentication-api.git
```

```
npm install
```

## Then run the project
```
npm start
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
http://localhost:5000/api/signup
```

 Json data
 
```json
{
    "username":"oen",
    "password":"0771234567"
}
```

#### Response

The response if the request was successful and the account has been created

```json
{
    "response_code": 0,
    "response_message": "Success",
    "user": {
        "id": 3,
        "username": "oen33",
        "verified": false
    }
}
```

The response a user already exists with that username

```json
{
    "response_code": 3,
    "response_message": "User already exists"
}
```

 ### `/login`
 
```
http://localhost:5000/api/login
```

Json data

```json
{
    "username":"oen",
    "password":"0771234567"
}
```

#### Response

The response if the request was successful, the user was verified therefore a token is returned

```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im9lbmgyIiwicGFzc3dvcmQiOiIwNzcxMjM0NTYiLCJpYXQiOjE2NzI3NzM0MDF9.nMWJLC18Ya8LW3wnJ6xys0W1UenF_EEl9AUIFxLxeaU",
    "response_code": 0,
    "response_message": "Success",
    "user": {
        "id": 2,
        "username": "oenh2",
        "verified": false
    }
}
```

The response if the request was not successful, due wrong credentials

```json
{
    "response_code": 4,
    "response_message": "Incorrect credentials"
}
```

### Miscellaneous Responses

These responses will be returned when the request data lacks a field or an empty field.

They are returned for both the `/signup` and `/login` endpoints

When the request data lacks a field or two. Solved by providing both username and password

```json
{
    "response_code": 1,
    "response_message": "Provide all fields"
}
```

When the request data has an empty field. Solved by adding data to the field(s)

```json
{
    "response_code": 2,
    "response_message": "Populate all fields"
}
```
