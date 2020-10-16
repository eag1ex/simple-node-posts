
### Simple Node Posts
#### [ Developed by Eaglex ](http://eaglex.net)


##### LICENSE
* LICENCE: CC BY-NC-ND
* SOURCE: _(https://creativecommons.org/licenses/by-nc-nd/4.0/)_

  
#### Install
To instal run `npm i`

- Set your minimum nodejs and npm to versions specified in `package.json`
- To run code/lint: `npm run lint:install` then `npm run lint`

 
#### Start
- `npm run server`, and navigate to `http://localhost:5000/posts` _(or which ever :port was used)_


#### About
- NodeJS/Express.js application loads posts/authors from json/database on /posts page using ejs template engine.


#### Scope
- Controllers responsible for handling located in `./libs/server/controllers`
- Application views and layout located in `./views/app/posts`
- Mock database responsible for parsing .json files located in `./libs/db/api.js`

```.sh
/$ npm run server

./libs
> /server.js
> controllers.js
> /views/app/..
```
  

#### Stack
- NodeJS, Javascript, Express.js, .json, mock database, ejs/template, Rest/API, lint


#### Deadline
1 days.


#### Tests & Coverage
Not in scope of this project, maybe add it later


#### Recommended VScode extensions
-  `vscode-language-babe, vscode-babel-coloring, comment-anchors, joelday.docthis, vscode-standardjs`


#### Developer Notes
* Application works fine per package.json config
* No Mobile optimization, not required by client
* Static pagination, not required by client


#### Contact
Have questions, or would like to submit feedback, **contact me at:** (https://eaglex.net/app/contact?product=simple-node-posts)

  
#### Thank you