# react-hooks
React hooks demo portfolio: built-in hooks plus custom ones for personal toolkit.


This repo is an implementation of the React Hooks course that Kyle Cook (WebDev Simplified) offered (something like this YouTube playlist: https://www.youtube.com/watch?v=0c6znExIqRw&list=PLZlA0Gpn_vH-aEDXnaFNLsqiJWFpIWV03).


There are instances of all the built-in React hooks, plus dozens of custom ones that make handy 
additions to any developer's toolkit.


Also, an excellent opportunity to "Think in React".

Also, at least one hook that is entirely my own creation (useSourceCode - source code with syntax highlighting).


1. Clone this repo
2. `cd react-hooks`
3. `yarn run start`

Some hooks require SSL (geoLocation,...); to enable SSL on a domain of your
choice:

1. Use LetsEncrypt to generate `privkey.pem` and `fullchain.pem` files
2. Concatenate them into the default location, overwriting the default file:
   `cat privkey.pem fullchain.pem > node_modules/webpack-dev-server/ssl/server.pem`
3. `yarn run start`
4. Create a file called `.env` and put `HTTPS=true` in it
5. Point a browser to $your_domain:3001


The keys and port ought to be able to be specified via the `.env` file, but
`yarn` seems to ignore those certificate settings.
