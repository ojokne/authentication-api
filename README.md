# authentication-api
## About
This is an API based authenticated, the base url is https://authentication-api.up.railway.app/api/

## Packages
This is purely created in node js and the following packages
https://github.com/ojokne/authentication-api/blob/d7c79bb8382641744ea77f0245185b23974a7c6a/package.json#L13-L19

## Usage
- It provides two end points with both supporting only `POST` method.
- `/signup` is signin up with a `username` and `password`
- `/login` is requesting a token with a `username` and `password`. It returns a token if the `username` and `password` are verified

Therefore, the user must be registered on the system through signing up before they can login and a token is issued

### Example
##### sign up end point (`/signup`)
The `username` and `password` are added to the database. However, the `password` is **hashed** before it is stored.

`https://authentication-api.up.railway.app//api/signup`
##### Json data
```json
{
    "username":"oen",
    "password":"0771234567"
}
```
##### Response 
- if the account was created successfully

```json
{
    "message": "User created successfully"
}
```

- If a user already exists with the `username` and `password`

```json
{
    "message": "There is already a user with that username"
}
```

#### sign in endpoint (`/login`)
`https://authentication-api.up.railway.app/api/login`

##### Json data
```json
{
    "username":"oen",
    "password":"0771234567"
}
```

##### Response
- If the `username` and `password`
 are valid

```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im9lbjQ0IiwicGFzc3dvcmQiOiIwNzcyMzA1MTU2IiwiaWF0IjoxNjY5NDY3NTkwfQ.eZqODx4wROi5NxoG6KuRoICwxsN3xoV2gYlBI8BcjNU",
    "message": "success"
}
```

- If the `username` and `password` are invalid

```json
{
    "message": "Incorrect username or password"
}
```
