# Marvel heroes
Example, contains simple implementation of semantically relevant inhabit interactive module

###Use case
We want to display information about marvel hero, his name, thumbnail and bio if this hero mentioned in the article

###Requirements
For this demo you will need to achieve developer key for the marvel api. It is free and easy to do
just for go to the [developer.marvel.com](https://developer.marvel.com) and register your account
After you will register go to your marvels developer account and grab your public key. Add "loclhost" 
to you authorized referrers as well, so marvel will not block you loclhost calls

Insert your public key to the [MarvelAPI](https://github.com/ArkadiumInc/inhabit-examples-MarvelHeroes/blob/master/src/MarvelAPI.js)
```javascript
var MarvelAPI = function ($) {
    this.$ = $;
    this.apiKey = "{{YOUR_MARVEL_APIKEY}}";
    this.charactersRestUrl = "https://gateway.marvel.com:443/v1/public/characters";
};
```

###Let's start
```
npm install
```

