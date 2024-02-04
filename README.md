# Client

## Tech Stack:

- React JS
- SASS
- Javascript
- Node packages:
  - Sentiment (sentiment analysis)
  - Carousel (for image carousel on homepage)
  - axios (api requests to backend)
  - more in the package.json

## Installation

    - create a react app with node
    - clone repo
    - npm i to install all dependancies
    - create a .env file following the .env.sample file example
    - npm start to launch (REQUIRES SERVER TO BE RUNNING)

## API references

    GET /games
        INPUT: N/A
        OUTPUT: status 200 [{game1}, {game2}, {game3}, ...]
    GET /games/tags
        INPUT: N/A
        OUTPUT: status 200 [   {id: 1, tag: tagname},
                    {id:2, tag: tagname},
                ...]
    GET /games/:gameId
        INPUT: N/A
        OUTPUT: status 200 {
                    id: 1,
                    game: "Game name",
                    short_description: "lorem ipsum",
                    ...,
                    reviews: [{review}, {review}, ...],
                    ...

                }
    POST /reviews/:reviewId
        INPUT: { userId: NUMBER, gameId: NUMBER, review: STRING}
        OUTPUT: status 201 {{ userId: NUMBER, gameId: NUMBER, review: STRING}, score: NUMBER}

    PUT /reviews/:reviewId
        INPUT: { userId: NUMBER, reviewId: NUMBER, like: BOOLEAN }
        OUTPUT: status 200 {updated: {updated interaction}}

    DELETE /reviews/:reviewId
        INPUT: {id: NUMBER}
        OUTPUT: status 204

## Lessons Learned

    This project has taught me that when tackling a new project, its best to stay with one maybe two new tools or packages. It is difficult to navigate back and forth from the documentation of multiple tools, especially with a time constraint. Add one thing, get comfortable with it, then add another.

## Moving Forward

    Add a delete review feature
    Make the sorting/filtering more consistent
    Add login/signup functionality with a profile page
    More validation, although most of the enpoints do not require input data
    Implement Natural Language Processing to support Sentiment analysis, and factor in other available data into the score of the games and the reviews.
    Present historical changes in a game's score and sentiment
