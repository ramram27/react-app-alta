# Module 1: React Fundamentals & Component-Based Development

---

### 1.1 What is React?

React is an **open-source JavaScript library**, developed and maintained by Meta (formerly Facebook), used for building fast and interactive **user interfaces (UIs)**, particularly for single-page web applications. It was first released in 2013 and has since become one of the most widely adopted front-end technologies in the industry.

React is **not a full framework** — it is a **library** focused specifically on the "view" layer of an application (the UI). It is often combined with other libraries (for routing, state management, HTTP requests, etc.) to build complete applications.

**Key characteristics of React:**

| Feature | Description |
|---|---|
| Declarative | Developers describe *what* the UI should look like for a given state, and React handles *how* to update the DOM. |
| Component-Based | UIs are built using independent, reusable pieces called components. |
| Virtual DOM | React maintains an in-memory representation of the real DOM to optimize rendering performance. |
| Learn Once, Write Anywhere | Concepts learned in React can be applied across web (React DOM), mobile (React Native), and other platforms. |

**Example — a minimal React component:**

```jsx
function Welcome() {
  return <h1>Hello, React!</h1>;
}
```

### 1.2 Why Use React?

Students should understand React's advantages over writing UI directly with vanilla JavaScript or jQuery:

1. **Component Reusability** — UI is broken into small, independent, reusable building blocks, which reduces code duplication and improves maintainability.
2. **Virtual DOM & Performance** — Instead of directly manipulating the browser's DOM (which is slow), React updates a lightweight virtual copy first, calculates the minimal set of real changes needed (a process called *reconciliation*/*diffing*), and only then updates the actual DOM.
3. **Unidirectional Data Flow** — Data flows in a single, predictable direction (parent → child), which makes applications easier to debug and reason about.
4. **Strong Ecosystem & Community** — A vast collection of tools, libraries (React Router, Redux, etc.), and community support.
5. **Reusability Across Platforms** — The same underlying concepts (JSX, components, hooks) can be used to build web, mobile, and even desktop applications.
6. **Industry Demand** — Widely used by companies like Meta, Netflix, Airbnb, and Uber, making it a valuable skill for employability.

### 1.3 Single Page Applications (SPA) vs Traditional Web Applications

| Aspect | Traditional (Multi-Page) Application | Single Page Application (SPA) |
|---|---|---|
| Page Load | Every navigation triggers a **full page reload** from the server | Only the **initial page load** is full; subsequent navigation updates content dynamically without a reload |
| Server Role | Server renders complete HTML for every request | Server typically sends data (via APIs, e.g., JSON); the client renders the UI |
| Speed/UX | Slower transitions between pages, visible "flicker" | Faster, smoother, app-like experience |
| Examples | Older PHP/JSP based websites | Gmail, Facebook, Twitter, Netflix |
| Bandwidth Usage | Higher, due to repeated full-page downloads | Lower after initial load, since only data is exchanged |

**How SPAs Work:**
- The browser loads a single HTML shell once.
- JavaScript (React) dynamically renders different "views" as the user interacts, using client-side routing.
- Data is fetched asynchronously from APIs, and only the required DOM sections are updated.

> **Note:** SPAs shift the rendering responsibility from the server to the client (browser), which is why JavaScript libraries like React have become essential.

### 1.4 React Ecosystem

React by itself only handles the view layer, so real-world applications rely on a surrounding ecosystem of tools:

- **Build Tools:** Vite, Webpack (bundle and optimize code for the browser)
- **Routing:** React Router (handles navigation without full page reloads)
- **State Management:** Context API, Redux, Zustand (manage data shared across components)
- **Styling:** CSS Modules, Tailwind CSS, styled-components
- **HTTP/Data Fetching:** Axios, Fetch API, React Query
- **Testing:** Jest, React Testing Library
- **Meta-Frameworks:** Next.js (adds server-side rendering, file-based routing, and more on top of React)

Understanding that React is the *core*, and these tools form the *surrounding ecosystem*, is essential for students before they start building full applications.

---

## Class 2: Setting Up the Development Environment

### 2.1 Setting Up the Development Environment using Vite

**Vite** (French for "fast") is a modern front-end build tool that provides an extremely fast development server and optimized production builds. It has largely replaced older tools like Create React App (CRA) due to its speed, which comes from using native ES Modules during development instead of bundling everything upfront.

**Steps to create a new React project using Vite:**

```bash
# Step 1: Create a new project
npm create vite@latest my-react-app -- --template react

# Step 2: Move into the project folder
cd my-react-app

# Step 3: Install dependencies
npm install

# Step 4: Start the development server
npm run dev
```

After running these commands, the development server typically starts at `http://localhost:5173/`, and any code changes are reflected instantly in the browser through **Hot Module Replacement (HMR)** — without a full page reload.

**Why Vite over CRA?**

| Criterion | Vite | Create React App (CRA) |
|---|---|---|
| Dev server startup | Near-instant | Slower (bundles whole app first) |
| HMR speed | Very fast | Comparatively slower |
| Build tool | Uses esbuild + Rollup | Uses Webpack |
| Maintenance status | Actively developed, modern default | Largely deprecated by the React team |

### 2.2 Understanding Project Structure

A typical Vite + React project has the following structure:

```
my-react-app/
├── node_modules/        # Installed dependencies (auto-generated)
├── public/               # Static assets served as-is (favicon, robots.txt, etc.)
├── src/                  # Application source code
│   ├── assets/           # Images, fonts, and other static assets used in code
│   ├── App.jsx           # Root/top-level component
│   ├── App.css           # Styles for App component
│   ├── main.jsx          # Entry point — mounts React app into the DOM
│   └── index.css         # Global styles
├── index.html            # Single HTML page (the "shell" of the SPA)
├── package.json          # Project metadata and dependency list
├── package-lock.json     # Exact dependency version lock file
└── vite.config.js        # Vite configuration file
```

**Key files explained:**

- **`index.html`** — Contains a single `<div id="root"></div>` element; this is the mount point where the entire React application is injected.
- **`main.jsx`** — The entry point of the application. It imports the root component (`App`) and renders it into the DOM using `ReactDOM.createRoot()`.

```jsx
// main.jsx
import { createRoot } from 'react-dom/client';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(<App />);
```

- **`App.jsx`** — The top-level component that typically contains (or imports) all other components of the application.

Understanding this structure is essential before students start creating and organizing their own components.

---

## Class 3: JSX Fundamentals and Rendering

### 3.1 JSX Fundamentals

**JSX (JavaScript XML)** is a syntax extension for JavaScript that allows developers to write HTML-like code directly within JavaScript files. It is **not** valid JavaScript by itself — it is compiled (transpiled) into regular `React.createElement()` calls by tools like Babel/Vite before the browser executes it.

```jsx
const element = <h1>Hello, World!</h1>;

// The above is compiled roughly into:
const element = React.createElement('h1', null, 'Hello, World!');
```

**Rules of JSX:**

1. A JSX expression **must return a single root element** (or use a Fragment `<>...</>` to group multiple elements without adding an extra DOM node).
2. All tags must be **properly closed**, including self-closing tags: `<img />`, `<br />`.
3. JSX uses **camelCase** for attribute names (`className` instead of `class`, `onClick` instead of `onclick`), since these become JavaScript object properties.

```jsx
function App() {
  return (
    <>
      <h1 className="title">Welcome</h1>
      <img src="logo.png" alt="Logo" />
    </>
  );
}
```

### 3.2 Expressions in JSX

Any valid JavaScript expression can be embedded inside JSX using **curly braces `{}`**. This allows dynamic values, variables, function calls, and calculations to be rendered directly within markup.

```jsx
function Greeting() {
  const name = "Rohit";
  const currentYear = new Date().getFullYear();

  return (
    <div>
      <h2>Hello, {name}!</h2>
      <p>Current Year: {currentYear}</p>
      <p>Sum: {5 + 10}</p>
    </div>
  );
}
```

> **Important distinction for students:** `{}` in JSX is used for **JavaScript expressions** (things that produce a value), not statements. For example, `if` statements cannot be used directly inside `{}`, but ternary operators (`condition ? a : b`) can.

### 3.3 Rendering Elements

React elements are the smallest building blocks of a React application — plain, immutable JavaScript objects describing what should appear on the screen.

```jsx
const element = <h1>Hello, React</h1>;
```

Unlike the traditional DOM, React elements are cheap to create. When data changes, React does **not** destroy and recreate the entire DOM — instead:

1. React creates a new Virtual DOM tree reflecting the updated UI.
2. It compares (**diffs**) this new tree against the previous Virtual DOM tree.
3. It calculates the minimal number of changes required.
4. It updates only those specific parts of the real DOM (**reconciliation**).

This process is what makes React applications performant even with frequent UI updates.

---

### 4.1 Component-Based Architecture

React applications are built using a **tree of components**, where each component is responsible for rendering a piece of the UI. This architectural approach offers several benefits:

- **Separation of Concerns** — Each component manages its own logic, structure, and (optionally) styling.
- **Reusability** — A component (e.g., a `Button` or `Card`) can be reused across multiple parts of an application.
- **Maintainability** — Smaller, focused components are easier to test, debug, and update than a single large file.
- **Composability** — Complex UIs are built by composing simple components together, similar to assembling building blocks.

```
App
 ├── Header
 ├── Sidebar
 ├── MainContent
 │    ├── PostList
 │    │    ├── PostCard
 │    │    └── PostCard
 │    └── Pagination
 └── Footer
```

### 4.2 Functional Components

A **functional component** is simply a JavaScript function that accepts an optional input (called `props`) and returns JSX describing the UI. Since the introduction of Hooks (React 16.8), functional components are the **recommended standard** for writing React applications (replacing the older class-component pattern).

```jsx
function Profile() {
  return (
    <div>
      <h2>Rohit Sharma</h2>
      <p>Software Engineer</p>
    </div>
  );
}

export default Profile;
```

**Characteristics of functional components:**
- Written as plain JavaScript functions (or arrow functions).
- Must start with a **capital letter** (React uses this convention to distinguish components from regular HTML tags).
- Return a single JSX element (or Fragment).
- Can use **React Hooks** (`useState`, `useEffect`, etc.) to manage state and side effects.

### 4.3 Reusable Components

One of React's core strengths is the ability to build a component once and reuse it multiple times with different data, avoiding repetitive code.

```jsx
function Button({ label }) {
  return <button>{label}</button>;
}

function App() {
  return (
    <div>
      <Button label="Save" />
      <Button label="Cancel" />
      <Button label="Delete" />
    </div>
  );
}
```

Here, the same `Button` component is reused three times, each rendering different text. This is achieved through **props**, which will be covered in detail in the next class.

---

### 5.1 Component Composition

**Composition** refers to the practice of building complex UIs by combining smaller, simpler components — similar to how HTML elements are nested. React strongly favors composition over inheritance for code reuse.

```jsx
function Card({ children }) {
  return <div className="card">{children}</div>;
}

function App() {
  return (
    <Card>
      <h2>Card Title</h2>
      <p>This content is passed as children.</p>
    </Card>
  );
}
```

In the example above, `Card` doesn't need to know what content it will contain in advance — it simply renders whatever is passed to it via the special `children` prop. This makes components generic, flexible, and reusable across many different contexts.

### 5.2 Props and Data Passing between Components

**Props (short for "properties")** are the mechanism through which data is passed from a **parent component to a child component**. Props are:

- **Read-only** — a child component must never modify the props it receives (this preserves React's unidirectional data flow).
- Passed similar to HTML attributes.
- Accessed inside the child component as a single object argument (or destructured directly).

```jsx
// Child component
function UserCard({ name, age, role }) {
  return (
    <div className="user-card">
      <h3>{name}</h3>
      <p>Age: {age}</p>
      <p>Role: {role}</p>
    </div>
  );
}

// Parent component
function App() {
  return (
    <UserCard name="Anjali" age={21} role="Student" />
  );
}
```

**Key points for exams and interviews:**

| Concept | Explanation |
|---|---|
| Direction of Flow | Data flows **top-down**: parent → child only (this is called "unidirectional data flow") |
| Mutability | Props are **immutable** from the child's perspective |
| Default Props | Default values can be assigned using default parameters: `function Button({ label = "Click Me" })` |
| `props.children` | A special prop that contains whatever is nested between a component's opening and closing tags |


### 6.1 Event Handling in React

React allows developers to respond to user interactions (clicks, typing, form submission, etc.) using event handlers, similar to standard HTML/JavaScript, but with a few key syntactic differences:

```jsx
function ClickButton() {
  function handleClick() {
    alert("Button was clicked!");
  }

  return <button onClick={handleClick}>Click Me</button>;
}
```

**Differences from traditional HTML event handling:**

| HTML (Vanilla JS) | React (JSX) |
|---|---|
| `onclick="handleClick()"` (lowercase, string) | `onClick={handleClick}` (camelCase, function reference) |
| Returning `false` prevents default behavior | Must explicitly call `event.preventDefault()` |

> **Common student mistake:** Writing `onClick={handleClick()}` (with parentheses) instead of `onClick={handleClick}`. The former **calls the function immediately during render**, instead of passing a reference to be called later on click.

### 6.2 Synthetic Events

React does not attach event handlers directly to individual DOM elements. Instead, it implements a cross-browser wrapper called **SyntheticEvent**, which normalizes events so they behave consistently across all browsers.

```jsx
function InputField() {
  function handleChange(event) {
    console.log(event.target.value); // works consistently across browsers
  }

  return <input type="text" onChange={handleChange} />;
}
```

**Why Synthetic Events matter:**
- They provide a **consistent API** regardless of the browser's native event implementation.
- Historically, React used **event delegation** (attaching a single listener at a root level) for performance; from React 17 onward, this root has moved from `document` to the app's root DOM container.
- SyntheticEvent objects are pooled/reused internally in older React versions for performance (a detail worth mentioning for advanced discussion, though this pooling behavior was removed starting React 17).

### 6.3 Event Binding

When using functional components, event binding is generally simpler than it was in class components (which required manually binding `this` in the constructor). However, students should understand a few patterns:

```jsx
function Counter() {
  let count = 0;

  // Passing a function reference directly
  function increment() {
    count++;
    console.log(count);
  }

  // Passing an inline arrow function (useful when passing arguments)
  function incrementBy(amount) {
    count += amount;
    console.log(count);
  }

  return (
    <div>
      <button onClick={increment}>+1</button>
      <button onClick={() => incrementBy(5)}>+5</button>
    </div>
  );
}
```

**Two common patterns:**
1. **Direct reference:** `onClick={increment}` — used when no arguments need to be passed.
2. **Inline arrow function:** `onClick={() => incrementBy(5)}` — used when the handler needs custom arguments.

---

### 7.1 Conditional Rendering Techniques

Conditional rendering allows a component to display different UI depending on a condition (e.g., showing a "Login" button vs. a "Logout" button based on authentication status). React does not have special conditional syntax — instead, it leverages standard JavaScript operators within JSX.

**1. `if / else` (outside JSX, before the `return` statement):**

```jsx
function Greeting({ isLoggedIn }) {
  if (isLoggedIn) {
    return <h2>Welcome back!</h2>;
  }
  return <h2>Please log in.</h2>;
}
```

**2. Ternary Operator (`condition ? a : b`) — used inline within JSX:**

```jsx
function Greeting({ isLoggedIn }) {
  return (
    <h2>{isLoggedIn ? "Welcome back!" : "Please log in."}</h2>
  );
}
```

**3. Logical `&&` Operator — used when there is no "else" case (render something or nothing):**

```jsx
function Notification({ hasMessage }) {
  return (
    <div>
      {hasMessage && <p>You have a new message!</p>}
    </div>
  );
}
```

**4. Element Variables — assigning JSX to a variable before returning:**

```jsx
function StatusMessage({ status }) {
  let message;

  if (status === "loading") {
    message = <p>Loading...</p>;
  } else if (status === "error") {
    message = <p>Something went wrong.</p>;
  } else {
    message = <p>Data loaded successfully.</p>;
  }

  return <div>{message}</div>;
}
```

**Comparison table:**

| Technique | Best Used When |
|---|---|
| `if / else` | Logic is complex or returns entirely different component trees |
| Ternary (`? :`) | Simple two-way choice, used directly inside JSX |
| `&&` | Rendering something conditionally, with no alternative ("render or nothing") |
| Element Variables | Multiple conditions (more than two outcomes) |




