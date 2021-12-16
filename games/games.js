import { 
    logout, 
    checkAuth,
    getGames,
    createGame,
} from '../fetch-utils.js';
import { renderGame } from '../render-utils.js';

const currentGameEl = document.getElementById('current-game-container');
const pastGamesEl = document.getElementById('past-games-container');
const logoutButton = document.getElementById('logout');

const nameForm = document.getElementById('name-form');
const teamOneAddButton = document.getElementById('team-one-add-button');
const teamTwoAddButton = document.getElementById('team-two-add-button');
const teamOneSubtractButton = document.getElementById('team-one-subtract-button');
const teamTwoSubtractButton = document.getElementById('team-two-subtract-button');
const finishGameButton = document.getElementById('finish-game-button');
const teamOneLabel = document.getElementById('team-one-name');
const teamTwoLabel = document.getElementById('team-two-name');

checkAuth();

let name1 = '';
let name2 = '';
let score1 = 0;
let score2 = 0;

nameForm.addEventListener('submit', (e) => {
    // don't forget to prevent the default form behavior!
    e.preventDefault();
    // get the name data from the form
    const data = new FormData(nameForm);
    name1 = data.get('team-one');
    name2 = data.get('team-two');

    // set the state to this data from the form
    teamOneLabel.textContent = name1;
    teamTwoLabel.textContent = name2;
    // reset the form values
    nameForm.reset();
    // display updated data in the current game div
    displayCurrentGameEl();

});


teamOneAddButton.addEventListener('click', () => {
    // increment the current state for team one's score
    score1++;
    // display updated data in the current game div
    displayCurrentGameEl();
});

teamTwoAddButton.addEventListener('click', () => {
    // increment the current state for team two's score
    score2++;
    // display updated data in the current game div
    displayCurrentGameEl();
});

teamOneSubtractButton.addEventListener('click', () => {
    // decrement the current state for team one's score
    score1--;
    // display updated data in the current game div
    displayCurrentGameEl();
});

teamTwoSubtractButton.addEventListener('click', () => {
    // decrement the current state for team two's score
    score2--;
    // display updated data in the current game div
    displayCurrentGameEl();
});

finishGameButton.addEventListener('click', async() => {
    
    // create a new game using the current game state
    let game = {
        name1,
        name2,
        score1,
        score2
    };
    await createGame(game);

    
    // re-fetch the games to get the updated state
    let fetchingGames = await getGames();
    // console.log('🚀 ~ file: games.js ~ line 90 ~ finishGameButton.addEventListener ~ fetchingGames', fetchingGames);


    // reassign the past games state to the re-fetched, updated games
    // pastGamesEl.textContent = fetchingGames
    displayAllGames(fetchingGames);
    
    name1 = '';
    name2 = '';
    score1 = 0;
    score2 = 0;


    displayCurrentGameEl();
});

logoutButton.addEventListener('click', () => {
    logout();
});

 // on load . . .
window.addEventListener('load', async() => {
    // fetch all games
    let fetchingGames = await getGames();

    if (fetchingGames) {
        displayAllGames(fetchingGames);
    } else {
        pastGamesEl.textContent = '';
    }
    // check if there are any
    // if there are, set those as the initial state of pastGames
    // then display all the games (hint: call displayAllGames())
});


function displayCurrentGameEl() {
    // clear out the current game div
    currentGameEl.textContent = '';
    // change the label to show team one's name;
    // change the label to show team two's name;
    teamOneLabel.textContent = name1;
    teamTwoLabel.textContent = name2;
    // call the render game function to create a game element
    let game = {
        name1,
        name2,
        score1,
        score2
    };


    let currentGame = renderGame(game);
    // append the element to the cleared out current game div
    currentGameEl.append(currentGame);
}


function displayAllGames(games) {
    // clear out the past games list in the DOM
    pastGamesEl.textContent = '';
    // fetch and loop through the past games 
    for (const game of games) {
        let renderedGames = renderGame(game);
        pastGamesEl.append(renderedGames);
    }
    // render and append a past game for each past game in state
}


displayCurrentGameEl();
