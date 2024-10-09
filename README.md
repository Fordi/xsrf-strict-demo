## Demonstration of the SameSite=Strict solution

1. Run `npm start`
2. Browse to http://localhost:8080
3. Observe in dev tools that the cookie "authCookie" is set with SameSite=Strict
3. Open `attack.html` as a local file
4. Open dev tools and go to the network tab
5. Click the button
6. Observe that the POST request does not contain any cookies.