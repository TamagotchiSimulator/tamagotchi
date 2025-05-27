# Off Brand Tamagotchi Simulator 🐩

> _What could be more fun than having a pet? Making your own!_

## What Is This?

This is a simple tamagotchi emulator that allows you to create and manage your own collection of pets. But remember, you must take care of your pets, by feeding them, playing with them and putting them to sleep. If you don't, they will decide not to live.

## Getting Started

1. Clone the project
2. Run `bun install`
3. Run `bun run dev` to start the development server
4. Open `http://localhost:5173` in your browser to view the app
5. Start creating your own pets!

## Functionality

- Name your animals!
- Choose from 4 different animal types (dog, cat, parrot, dinosaur)
- Play with them to make them happy
- Feed them to make them less hungry
- Let them sleep to make them less sleepy
- Each animal starts with a healthy neutral amount of happiness, hunger and sleep
- Animal happiness decreases over time, so keep them happy!
- Animals get hungry over time, so feed them!
- Animals get sleepy over time, so let them have a nap
- Make sure that you're animal doesn't get too hungry or sleepy, or their happiness will decrease faster
- Each animal is different, so their rates will change differently to each other.
- If an animal's hunger reaches 100, and their happiness is 0, they will sadly pass on to lands unknown.

## General overview

This is (hopefully) a very simple approach to the problem that was posed. The main logic of the simulator is within the game class found at `game/index.ts`. This is a simple class that takes care of the frame by frame logic of the game.

Rather than depend on using setInterval, I decided to go for the more dependable requestAnimationFrame method, which allowed me to have a bit more control over how often the game updated. This also allows the game to run at the frame rate that the user's browser is capable of - so the stats should
update at a consistent rate despite other resources the browser may be using.

The main game logic is then subscribed to by the react app, the entry point is still the `main.tsx` file. This is where the react app is mounted, and the game is started. We see here that there are a few providers, the `GameProvider` which gives us a single source of truth for the actual game instance (mainly the list of animals, and their current stats), and the NuqsAdapter which lets us use the URL to store the state of the game.

Using the `useGame` hook, the components re-render when a change is made
in the main game loop. In theory, by separating these concerns, we have a
way of further adapting the game logic without having to change the fundamental game loop. For example, if we wanted the authentic 1990s frame
rate of the game, we could do this in the react app.

## Testing

The tests are colocated to the components and game logic, and use `jest` as well as `react-testing-library` to test the components. If you want to run these tests, you can run `bun run test` to run the tests.

## Future improvements

- Colour
- Add a UI that allows us to remove the animals
- Use a local method of storage to persist our game. Our game logic should in theory allow us to start the game with animals at a certain state, and then resume from that state when the user returns to the app. We'd save the game every X seconds and then load it when the game is instantiated next
- Let the animals move around the screen
