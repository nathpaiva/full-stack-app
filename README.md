[![wakatime](https://wakatime.com/badge/user/2aeba48e-4558-4f58-965a-fc1cd46ba978/project/3e0a1c8b-61aa-4a00-b7ac-0233af113236.svg)](https://wakatime.com/badge/user/2aeba48e-4558-4f58-965a-fc1cd46ba978/project/3e0a1c8b-61aa-4a00-b7ac-0233af113236)

# About this app

This is an SPA and API application in which the user can import a `CSV` file in the Front-end, and the SPA will render the data parsed.

The `CSV` should have this format, in which the first line is the header, and the following lines are each row. Some columns can have more than one value inside.

```csv
url,spam_score,matchin_target_indexs,matching_soucer_urls,domain_authority
globo1.com,1,"1,2,3","globo.com, 10",1
globo2.com,2,"4,5,6","globo.com, 11",2
globo1.com,3,"7,8,9",,3
globo2.com,4,,"globo.com, 13",4
```

## Project developed with:

- [React](https://react.dev/)
- [Node](https://nodejs.org/en/download/)
- [Typescript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/)
- [Mongodb](https://www.mongodb.com/cloud/atlas/lp/try4?adgroup=146373896140&cq_cmp=19616985274&gad=1)

## Test developed with:

- [Jest](https://jestjs.io/)

## To run the project, you need to install the following:

- [Node](https://nodejs.org/en/download/)
- [Yarn](https://yarnpkg.com/lang/en/docs/install/) or NPM (already installed with the node)
- [Mongodb](https://docs.mongodb.com/manual/installation/)

## To start, it is necessary to rotate the Mongo locally:

- [mongod](https://docs.mongodb.com/manual/tutorial/manage-mongodb-processes/)

## Before starting the project, you must install the dependencies:

- `yarn`

## To start the project, you have to run the commands:

`yarn start`

- This command to access the API on:

  - [http://localhost:3000](http://localhost:3000)

  - And the front-end on: [http://localhost:3000](http://localhost:2000)

## Say hello 👋

Since I aim to learn more about `back-end`, any tips or suggestions are welcome. I would love to hear from you. Feel free to open [an issue](https://github.com/nathpaiva/full-stack-app/issues) or also a [pull request](https://github.com/nathpaiva/full-stack-app/fork).
