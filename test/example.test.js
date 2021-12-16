// IMPORT MODULES under test here:
import { renderGame, renderTeam } from '../render-utils.js';

const test = QUnit.test;

test('time to test a function', (expect) => {
    //Arrange
    // Set up your arguments and expectations
    const game = {
        name1: 'united',
        name2: 'american',
        score1: 4,
        score2: 5
    };

    let name = 'Bob';
    let score = 4;
    const expected = '<div class="game"><div class="team"><p class="name">united</p><p class="score">4</p></div><div class="team"><p class="name">american</p><p class="score">5</p></div></div>';

    const expected2 = '<div class="team"><p class="name">Bob</p><p class="score">4</p></div>';


    
    //Act 
    // Call the function you're testing and set the result to a const
    const actual = renderGame(game);
    const actual2 = renderTeam(name, score);

    //Expect
    // Make assertions about what is expected versus the actual result
    expect.equal(actual.outerHTML, expected);
    expect.equal(actual2.outerHTML, expected2);
});
