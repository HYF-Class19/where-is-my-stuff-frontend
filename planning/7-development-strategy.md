# Development Strategy for `Lend it` Mobile App

## 1- Introduction

- Lend IT is a mobile app designed to help users keep track of items they have lent out.
- The project is named "where-is-my-stuff".
- This development strategy outlines the steps and user stories that will be implemented to create the Lend it mobile app.

## 2- Wireframe

- The Lend IT mobile app wireframe was created by two designers to establish the structure and flow of possible design solutions.
- The wireframe can be found at [WireFrame.](assets/prototype.png)
- The wireframe was created using [Figma](https://www.figma.com/file/vfAwWuY4Lr3s50Uvv7jgN5/Whrere-is-my-stuff?node-id=0-1&t=1aTz189fCtVNjumx-0)

## 3- Tools for Wireframe

- To get started, clone the [frontend repository](https://github.com/HYF-Class19/where-is-my-stuff-frontend) where you can use ssh or https for clone
- Navigate to the repository folder directory where-is-my-stuff-frontend and install the node package management dependencies.
- Make sure you have the latest Ionic CLI installed globally with  `npm install -g @ionic/cli`.
- After installation, install npm packages with npm i.
- Finally, run the command npm run start on Linux and npm serve on MacOS and Windows. The project will open on this port [http://localhost:3000/](http://localhost:3000/) and let the port running while you're working on the project.

## 4- User Stories

The user stories for the Lend IT mobile app are as follows:

### 0. Setup

Clone the repository and install dependencies as outlined in the tools for wireframe section.

### 1. Home page

- As a user, I want to see the header with app bar icon and logo.
- The app bar icon should display a list of links.
- This user story is developed on branch `home`.
- The branch is merged into main after completion.

### 2. Creation page item

- As a user, I want to be able to create an item that I want to lend out.
- The creation page should have a description of the item, name of the item, and reminder date.
- This user story is developed on branch `create`.
- The branch is merged into main after completion.

### 3. Lend out item page

- As a user, I want to see the items that I have created on the creation page.
- The lend-out item page should display a list of items with categories to filter the items by letter.
- This user story is developed on branch `lend__out__items`.
- The branch is merged into main after completion.

### 4. Reminders page

- As a user, I want to see my reminder dates.
- The reminders page should display reminder dates that allow the user to see when they should be returned.
- This user story is developed on branch `reminders`.
- The branch is merged into main after completion.

### 5. Details

- As a user, I want to see the description of an item.
- The details page should display the item's description when the user clicks on one item in the reminder page.
- The page should also have an alert card that allows the user to update or delete the item.
- This user story is developed on branch `details`.
- The branch is merged into main after completion.

### 6. Update

- As a user, I want to be able to update an item that I have mistakenly set in the reminder page.
- The update page should allow the user to correct some details as well as dates.
- This user story is developed on branch `update`.
- The branch is merged into main after completion.

### 7. Delete

- As a user, I want to be able to delete an item that I do.

## Note

"Dear team members,
As we work on developing our mobile app 'Lend IT' for tracking lent items, I want to remind everyone of our development strategy. It's important that we follow the user stories we've defined and work on each feature on separate branches before merging them into the main branch. We should also make sure to update the wireframe as needed and use the Figma tool for designing the app.

Please remember to clone the frontend repository and install the necessary dependencies. Make sure to have the latest Ionic CLI installed and run the project on the specified port while working on it.

Let's aim for efficient and organized development by sticking to our strategy.