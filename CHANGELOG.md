# Changelog

## 1.0.0-alpha.11 ~ 2022-10-03

### Fixed
- Astra User Intent Create sends `auth` using client and secret. Previously, this caused `POST` `user_intent` to fail with Authorization error. 
