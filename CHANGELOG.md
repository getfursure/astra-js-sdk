# Changelog

Updates are from recent to latest (most recent is immediately below) 

## 1.0.0-alpha.12 ~ 2022-10-03

### Fixed
- `users.intents.create()` actually sends Basic Auth. _We now lint for unused vars and created a test that would have caught the bug too._

## 1.0.0-alpha.11 ~ 2022-10-03

### Major Change
- `AuthResource` has `basicAuth` getter for setting the Basic Auth Credentials on some of the resource requests.
- User and Intent resources now receive Auth resource

### Fixed
- Astra User Intent Create sends `auth` using client and secret. Previously, this caused `POST` `user_intent` to fail with Authorization error. 
