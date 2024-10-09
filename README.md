## Demonstration of the SameSite=Strict solution

1. Add `127.0.0.1 client.localhost` and `127.0.0.1 api.localhost` to your hosts file.
2. Run `npm start`
3. Browse to http://localhost:8080
4. Observe in dev tools' network tab that the cookie "authCookie" is set with SameSite=Strict, and that the `makeApiCall` request includes that cookie.
5. Open `attack.html` as a local file
6. Open dev tools and go to the network tab
7. Click the button
8. Observe that the POST request does not contain any cookies.  The response will have the `set-cookie` header.
