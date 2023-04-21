# Infinite Scrolling Next.js App

This repository contains my code for the Front-End challenge 
for Clerkie. This is an infinite scrolling Next.js app based on a provided Figma design.

## Project Description

- Implement the Figma design exactly. All icons, layouts, and cases were provided in the Figma file. 
- Build the site with only what was provided in the Next.js starter project, without the help of any external component or helper libraries.
- Created a JSON structure for the friend rows and displayed those rows by parsing the JSON objects.
- Used mock data functions to simulate fetching data. Each request had a 1s delay to show the loading states of the app.

## Extra Credit
For extra credit, I implemented the following:
- **Extra credit #1**: Added fade animations to the loader components.
- **Extra credit #2**: Routed to a basic friend info screen when clicking on a friend row. 
- **Bonus Feature**: Dynamic page rendering with pagination

## Implementation Details
- The project was built using Next.js, React, and CSS.
- The mock API request was implemented using a Next.js API route which fetches the data from a JSON file located in the data folder.
- The fade animations were implemented using the `@keyframes` CSS rule and the `animation` property.
- The routing was implemented using the `next/link` component.

## Demo Link
[Click here](https://friends-app-one.vercel.app/) to view the live demo of the app.