### 1. Introduction to React

React is a JavaScript library used to build user interfaces (UI), especially for web applications.

React was developed by Meta (Facebook).

With React, we build applications using small, independent pieces called components.

Example

A traditional website may have one large HTML file:

<header>
  <nav>...</nav>
</header>

<main>
  ...
</main>

<footer>
  ...
</footer>

In React, we can divide this into components:

# App
│
├── Header
├── Navbar
├── Main
│   ├── Product
│   ├── Product
│   └── Product
│
└── Footer

Each component can be created and managed separately.

## Why Use React?
React provides:

Component-based development
Reusable code
Fast UI updates
Easy state management
Large ecosystem
Strong community support
Suitable for small and large applications
Simple React Component
function App() {
  return <h1>Hello React</h1>;
}

export default App;

### 2. Traditional Web Applications vs Single Page Applications (SPA)

## Traditional Web Application
In a traditional web application:

User clicks a link.
Browser sends a request to the server.
Server sends a new HTML page.
Browser reloads the entire page.
Example
User
  ↓
Click About Page
  ↓
Browser Request
  ↓
Server
  ↓
New HTML Page
  ↓
Full Page Reload

Examples include traditional server-rendered websites using PHP or similar technologies.

Single Page Application (SPA)

A Single Page Application loads the main application once.

When the user navigates between pages, JavaScript updates only the required part of the UI.

## SPA Flow
User
  ↓
React Application
  ↓
Update Required Component
  ↓
No Full Page Reload
Example
Home → About → Contact

The browser does not necessarily reload the complete application for every route change.

## SPA Benefits
Faster navigation
Better user experience
Smooth UI transitions
Less full-page reloading
Good for interactive applications
SPA Examples
Dashboard applications
Social media applications
Admin panels
E-commerce applications
Learning platforms


### 3. React Ecosystem
React itself mainly focuses on building the user interface.
For a complete application, we often use other libraries and tools.

React Ecosystem
│
├── React
├── React Router
├── State Management
│   ├── Context API
│   ├── Redux
│   └── Zustand
│
├── API Requests
│   ├── Fetch
│   └── Axios
│
├── UI Libraries
│   ├── Material UI
│   └── Tailwind CSS
│
└── Build Tools
    └── Vite

## Common React Tools
Tool	Purpose
React	Build UI
Vite	Create and run React projects
React Router	Page navigation
Axios / Fetch	API calls
Context API	State sharing
Redux	Large-scale state management
Tailwind CSS	Styling
Material UI	Ready-made UI components


### 4. Setting Up React Using Vite
## What is Vite?
Vite is a modern development and build tool.

Fast development server
Fast project startup
Hot Module Replacement (HMR)
Optimized production build

# Step 1: Install Node.js

First, install Node.js.

Check whether Node.js is installed:

node -v

Check npm:

npm -v

# Step 2: Create a React Project
Open the terminal and run:
npm create vite@latest

Select:

Project name: react-project
Framework: React
Variant: JavaScript

You can also create the project directly:

npm create vite@latest react-project -- --template react

# Step 3: Move into the Project
cd react-project
Step 4: Install Dependencies
npm install
Step 5: Run the Project
npm run dev

You will see something similar to:

Local: http://localhost:5173/

Open the URL in your browser.

### 5. Understanding the React Project Structure

A basic Vite React project looks like this:

react-project
│
├── node_modules
├── public
├── src
│   ├── assets
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── index.css
│
├── index.html
├── package.json
└── vite.config.js
node_modules

Contains installed packages.

node_modules

This folder is created after:

npm install

Usually, we do not manually edit this folder.

public

Used for static files.

Example:

public
│
├── images
└── favicon.ico
src

This is the main folder where most React development happens.

src
│
├── components
├── App.jsx
└── main.jsx
main.jsx

This is the entry point of the React application.

## Example:

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
Flow
main.jsx
    ↓
<App />
    ↓
App.jsx
    ↓
Components
    ↓
Browser
App.jsx

This is the main application component.

function App() {
  return (
    <div>
      <h1>My React Application</h1>
    </div>
  );
}

export default App;

## package.json

Contains project information and dependencies.

Example:

{
  "scripts": {
    "dev": "vite",
    "build": "vite build"
  }
}

Common commands:

npm run dev

Runs the development server.

npm run build

Creates a production build.

### 6. JSX Fundamentals
What is JSX?

JSX stands for JavaScript XML.

JSX allows us to write HTML-like code inside JavaScript.

Example:

const element = <h1>Hello React</h1>;

This looks like HTML, but it is JSX.

## JSX Rules

# Rule 1: Return One Parent Element

# Incorrect:

function App() {
  return (
    <h1>Hello</h1>
    <p>Welcome</p>
  );
}

# Correct:

function App() {
  return (
    <div>
      <h1>Hello</h1>
      <p>Welcome</p>
    </div>
  );
}

# You can also use a React Fragment:

function App() {
  return (
    <>
      <h1>Hello</h1>
      <p>Welcome</p>
    </>
  );
}


# Rule 2: Use className

HTML:

<div class="box">

JSX:

<div className="box">

## Rule 3: Close Tags

# Incorrect:

<img src="image.jpg">

# Correct:

<img src="image.jpg" />


### 7. Expressions in JSX

We can use JavaScript expressions inside JSX using curly brackets {}.

# Example:

function App() {
  const name = "Rohit";

  return <h1>Hello {name}</h1>;
}

Output:

Hello Rohit

## Mathematical Expression
function App() {
  const a = 10;
  const b = 20;

  return <h1>Sum: {a + b}</h1>;
}

Output:

Sum: 30

## Function Expression
function App() {
  function getName() {
    return "Rohit";
  }

  return <h1>Hello {getName()}</h1>;
}

### 8. Rendering Elements

React renders elements into the browser using ReactDOM.

Example in main.jsx:

ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <App />
);

The App component is rendered inside:

<div id="root"></div>

in the index.html file.

Rendering Flow
index.html
    ↓
<div id="root">
    ↓
main.jsx
    ↓
<App />
    ↓
Browser UI

### 9. Component-Based Architecture

React applications are built using components.

A component is a reusable piece of UI.

Example:

Website
│
├── Header
├── Navbar
├── Sidebar
├── Content
│
│   ├── Product
│   ├── Product
│   └── Product
│
└── Footer

Instead of writing all code in one file, we divide the application into smaller components.

Example
function Header() {
  return <h1>My Website</h1>;
}

function Footer() {
  return <p>Copyright 2026</p>;
}

function App() {
  return (
    <>
      <Header />
      <p>Welcome to my website.</p>
      <Footer />
    </>
  );
}

export default App;

### 10. Functional Components

Modern React mainly uses functional components.

A functional component is a JavaScript function that returns JSX.

Example:

function Welcome() {
  return <h1>Welcome Student</h1>;
}

export default Welcome;

Use it inside another component:

import Welcome from "./Welcome";

function App() {
  return (
    <div>
      <Welcome />
    </div>
  );
}


### 11. Reusable Components

A reusable component can be used multiple times.

Example:

function Student() {
  return (
    <div>
      <h2>Student Name</h2>
      <p>React Developer</p>
    </div>
  );
}

function App() {
  return (
    <>
      <Student />
      <Student />
      <Student />
    </>
  );
}

However, all students display the same data.

To make the component dynamic, we use props.

### 12. Props and Data Passing

Props stands for Properties.

Props allow us to send data from a parent component to a child component.

Parent → Child
App
 │
 │ Props
 ↓
Student
Example
Student.jsx
function Student(props) {
  return (
    <div>
      <h2>{props.name}</h2>
      <p>Age: {props.age}</p>
    </div>
  );
}

export default Student;
App.jsx
import Student from "./Student";

function App() {
  return (
    <>
      <Student name="Rohit" age={25} />
      <Student name="Amit" age={22} />
      <Student name="Priya" age={24} />
    </>
  );
}

export default App;

Output:

Rohit - Age: 25
Amit - Age: 22
Priya - Age: 24


### 13. Component Composition

Component Composition means combining multiple components to build a larger component.

Example:

App
│
├── Header
├── Navbar
├── MainContent
└── Footer

## Code:

function Header() {
  return <h1>My Website</h1>;
}

function Navbar() {
  return <nav>Home | About | Contact</nav>;
}

function Footer() {
  return <p>Copyright 2026</p>;
}

function App() {
  return (
    <>
      <Header />
      <Navbar />
      <h2>Welcome to our website</h2>
      <Footer />
    </>
  );
}

This makes large applications easier to manage.

### 14. Event Handling in React

Events are actions performed by the user.

## Examples:

Click
Input
Submit
Mouse movement
Keyboard press

React uses event handlers.

# Button Click Example
function App() {
  function handleClick() {
    alert("Button Clicked");
  }

  return (
    <button onClick={handleClick}>
      Click Me
    </button>
  );
}

export default App;

Notice:

onClick

uses camelCase.

### 15. Synthetic Events

React uses a system called Synthetic Events.

A Synthetic Event is React's wrapper around browser events.

For example:

<button onClick={handleClick}>
  Click
</button>

React handles the event using its event system while providing a consistent API for React applications.

Example:

function handleClick(event) {
  console.log(event);
}

### 16. Event Binding

In functional components, event handling is simple.

Example:

function App() {
  const showMessage = () => {
    alert("Hello Student");
  };

  return (
    <button onClick={showMessage}>
      Click Me
    </button>
  );
}
Passing an Argument

Incorrect:

<button onClick={showMessage("Rohit")}>
  Click
</button>

This runs immediately during rendering.

Correct:

<button onClick={() => showMessage("Rohit")}>
  Click
</button>

## Complete example:

function App() {
  function showMessage(name) {
    alert("Hello " + name);
  }

  return (
    <button onClick={() => showMessage("Rohit")}>
      Click Me
    </button>
  );
}


### 17. Conditional Rendering

Conditional rendering means displaying different UI based on a condition.

Example:

Condition = true
    ↓
Show Component A

Condition = false
    ↓
Show Component B
Method 1: if Statement
function App() {
  const isLoggedIn = true;

  if (isLoggedIn) {
    return <h1>Welcome User</h1>;
  }

  return <h1>Please Login</h1>;
}
Method 2: Ternary Operator

Syntax:

condition ? trueValue : falseValue

Example:

function App() {
  const isLoggedIn = true;

  return (
    <h1>
      {isLoggedIn ? "Welcome User" : "Please Login"}
    </h1>
  );
}

### Method 3: Logical && Operator

Use this when you only want to display something if the condition is true.

function App() {
  const isAdmin = true;

  return (
    <div>
      <h1>Dashboard</h1>

      {isAdmin && <button>Delete User</button>}
    </div>
  );
}

If:

isAdmin = true

The button is displayed.

If:

isAdmin = false

The button is not displayed.