# Module 3: React Hooks & API Integration
---

## Introduction to Hooks and useEffect

### 1.1 Introduction to Hooks

**Hooks** are special functions introduced in **React 16.8** that allow functional components to use features that were previously only available in class components — most notably, **state** and **lifecycle-related behavior**. Before Hooks, developers had to write class components (using `this.state`, `componentDidMount`, etc.) whenever a component needed to manage state or perform side effects.

**Why Hooks were introduced:**

| Problem with Class Components | How Hooks Solve It |
|---|---|
| Logic reuse required complex patterns (Higher-Order Components, Render Props) | Custom Hooks allow simple, direct logic reuse |
| Related logic was split across multiple lifecycle methods (`componentDidMount`, `componentDidUpdate`, `componentWillUnmount`) | `useEffect` lets related logic live together in one place |
| `this` keyword caused frequent binding confusion | Hooks avoid `this` entirely — functional components use plain variables and functions |
| Classes result in more boilerplate code | Hooks are more concise and easier to read |

**Rules of Hooks (must be followed strictly):**

1. **Only call Hooks at the top level** — never inside loops, conditions, or nested functions. This ensures Hooks are called in the same order on every render.
2. **Only call Hooks from React function components** (or from other custom Hooks) — never from regular JavaScript functions.

```jsx
// ❌ Incorrect — Hook called conditionally
if (isLoggedIn) {
  const [user, setUser] = useState(null);
}

// ✅ Correct — Hook always called at the top level
const [user, setUser] = useState(null);
```

**Commonly used built-in Hooks (overview covered across this module):**

| Hook | Purpose |
|---|---|
| `useState` | Manage local component state (covered in Module 2) |
| `useEffect` | Perform side effects (data fetching, subscriptions, timers) |
| `useRef` | Access DOM elements directly / persist values without re-rendering |
| `useMemo` | Memoize expensive computed values |
| `useCallback` | Memoize function references |

### 1.2 useEffect Hook

The **`useEffect`** Hook allows functional components to perform **side effects** — operations that reach outside the normal render process, such as fetching data, manually manipulating the DOM, setting up subscriptions, or starting timers.

**Basic syntax:**

```jsx
import { useState, useEffect } from 'react';

function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    console.log("Component rendered or updated");
  });

  return <p>Seconds: {seconds}</p>;
}
```

`useEffect` accepts two arguments:

```jsx
useEffect(() => {
  // effect logic
}, [dependencies]);
```

1. A **callback function** containing the side-effect logic.
2. An optional **dependency array**, which controls *when* the effect runs.

| Dependency Array | Behavior |
|---|---|
| Omitted entirely | Effect runs after **every** render |
| `[]` (empty array) | Effect runs **only once**, after the initial render (similar to `componentDidMount`) |
| `[value1, value2]` | Effect runs after the initial render **and** whenever any listed value changes |

```jsx
useEffect(() => {
  console.log("Runs once, on mount");
}, []);

useEffect(() => {
  console.log("Runs whenever 'count' changes");
}, [count]);
```

---

## Side Effects and Lifecycle Concepts

### 2.1 Managing Side Effects

A **side effect** is any operation that affects something outside the scope of the current function being executed — i.e., anything beyond simply calculating and returning JSX. Common examples include:

- Fetching data from an API
- Directly manipulating the DOM (e.g., changing `document.title`)
- Setting up event listeners or subscriptions
- Starting/clearing timers (`setInterval`, `setTimeout`)

```jsx
function DocumentTitleUpdater({ title }) {
  useEffect(() => {
    document.title = title;   // side effect: modifies something outside React's render output
  }, [title]);

  return <h2>{title}</h2>;
}
```

**Cleanup functions:**

Some side effects (like subscriptions or timers) need to be **cleaned up** to avoid memory leaks or unexpected behavior when a component unmounts or re-runs the effect. This is done by **returning a function** from within `useEffect`.

```jsx
function LiveClock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    // Cleanup function — runs before the component unmounts,
    // or before the effect re-runs
    return () => clearInterval(intervalId);
  }, []);

  return <p>{time.toLocaleTimeString()}</p>;
}
```

Without this cleanup, the interval would continue running even after the component is removed from the screen, silently consuming memory and CPU — a common bug in real-world applications.

### 2.2 Lifecycle Concepts in Functional Components

In **class components**, React exposed distinct **lifecycle methods** representing different phases of a component's existence. Functional components achieve the same behavior using `useEffect`, but through a unified, more flexible model.

| Class Component Lifecycle Method | Equivalent using `useEffect` in Functional Components |
|---|---|
| `componentDidMount` | `useEffect(() => { ... }, [])` |
| `componentDidUpdate` | `useEffect(() => { ... }, [dependency])` |
| `componentWillUnmount` | The **cleanup function** returned from `useEffect` |

**The three conceptual phases of a component's lifecycle:**

1. **Mounting** — the component is created and inserted into the DOM for the first time.
2. **Updating** — the component re-renders due to changes in state or props.
3. **Unmounting** — the component is removed from the DOM.

```jsx
function LifecycleDemo({ userId }) {
  useEffect(() => {
    console.log("Mounted or userId changed:", userId);

    return () => {
      console.log("Cleanup before next effect or unmount");
    };
  }, [userId]);

  return <p>Watching user: {userId}</p>;
}
```

> **Exam tip:** Students should be able to clearly map each class-component lifecycle method to its `useEffect`-based equivalent, and explain **why** functional components with Hooks are now the preferred approach in modern React development.

---

## Working with APIs and the Fetch API

### 3.1 Working with APIs

Modern web applications rarely operate in isolation — they typically communicate with a **backend server** to retrieve or send data, using **APIs (Application Programming Interfaces)**, most commonly **REST APIs** that exchange data in **JSON** format.

**Typical data flow in a React application:**

```
React Component  --(HTTP Request)-->  Backend Server / API
React Component  <--(JSON Response)--  Backend Server / API
```

Because API calls are asynchronous and happen outside the normal render flow, they are a classic example of a **side effect**, and are therefore almost always performed inside `useEffect`.

### 3.2 Fetch API

The **Fetch API** is a built-in browser API for making HTTP requests, requiring no external library installation.

```jsx
import { useState, useEffect } from 'react';

function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error("Error fetching users:", error));
  }, []);

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

**Using `fetch` with `async/await` (a cleaner, more readable alternative):**

```jsx
useEffect(() => {
  async function fetchUsers() {
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/users");
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }

  fetchUsers();
}, []);
```

> **Important:** The `useEffect` callback itself **cannot be declared `async` directly** (`useEffect(async () => {...}, [])` is invalid), because `useEffect` expects its callback to return either `undefined` or a cleanup function — not a Promise. The correct pattern is to define an `async` function *inside* the effect and call it immediately, as shown above.

**Key characteristics of Fetch:**
- Does **not** automatically reject the promise on HTTP error statuses (e.g., 404 or 500) — only network failures cause a rejection. Developers must manually check `response.ok`.
- Requires an extra `.json()` call to parse the response body.

---

## Axios and Consuming REST APIs

### 4.1 Axios Library

**Axios** is a popular third-party, promise-based HTTP client library, widely preferred over the native Fetch API in real-world React projects due to its more convenient features.

**Installation:**

```bash
npm install axios
```

**Basic usage:**

```jsx
import axios from 'axios';
import { useState, useEffect } from 'react';

function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/users")
      .then(response => setUsers(response.data))
      .catch(error => console.error("Error fetching users:", error));
  }, []);

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

**Fetch vs Axios — comparison table:**

| Feature | Fetch API | Axios |
|---|---|---|
| Installation | Built into browsers (no install needed) | Requires `npm install axios` |
| JSON Parsing | Manual (`response.json()`) | Automatic (`response.data`) |
| Error Handling on HTTP errors (4xx/5xx) | Does **not** reject automatically | **Automatically rejects** the promise |
| Request Cancellation | More complex (`AbortController`) | Simpler, built-in support |
| Request/Response Interceptors | Not available natively | Available — useful for adding auth tokens globally |
| Browser Support | Modern browsers only | Wider compatibility (with polyfills) |

### 4.2 Consuming REST APIs

**REST (Representational State Transfer)** is an architectural style for designing APIs around standard HTTP methods, each corresponding to a specific type of operation (commonly summarized as **CRUD**: Create, Read, Update, Delete).

| HTTP Method | Purpose | Axios Method |
|---|---|---|
| `GET` | Retrieve data | `axios.get(url)` |
| `POST` | Create new data | `axios.post(url, data)` |
| `PUT` / `PATCH` | Update existing data | `axios.put(url, data)` |
| `DELETE` | Remove data | `axios.delete(url)` |

**Example — full CRUD interaction using Axios:**

```jsx
// Create a new post
axios.post("https://api.example.com/posts", { title: "New Post", body: "Content here" });

// Read/fetch all posts
axios.get("https://api.example.com/posts");

// Update an existing post
axios.put("https://api.example.com/posts/1", { title: "Updated Title" });

// Delete a post
axios.delete("https://api.example.com/posts/1");
```

Understanding this mapping between HTTP methods and CRUD operations is essential, as it forms the foundation for full-stack application development covered later in Module 4.

---

## Loading States, Error Handling & Data Fetching Strategies

### 5.1 Loading States

Network requests take time to complete, and a well-designed application must inform the user about this in-progress state — otherwise, the UI can appear frozen or broken. This is managed using a dedicated boolean state variable.

```jsx
function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/users")
      .then(response => setUsers(response.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading users...</p>;

  return (
    <ul>
      {users.map(user => <li key={user.id}>{user.name}</li>)}
    </ul>
  );
}
```

`.finally()` ensures `setLoading(false)` runs regardless of whether the request succeeded or failed.

### 5.2 Error Handling

Network requests can fail for many reasons — server errors, no internet connection, invalid endpoints, or unexpected data formats. Applications must handle these failures gracefully rather than crashing or showing a blank screen.

```jsx
function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/users")
      .then(response => setUsers(response.data))
      .catch(err => setError("Failed to load users. Please try again."))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <ul>
      {users.map(user => <li key={user.id}>{user.name}</li>)}
    </ul>
  );
}
```

**The three UI states every data-fetching component should typically handle:**

1. **Loading** — request is in progress.
2. **Error** — request failed.
3. **Success** — data has been fetched and is ready to display.

### 5.3 Data Fetching Strategies

There are multiple approaches to fetching data in a React application, each suited to different situations:

| Strategy | Description | When to Use |
|---|---|---|
| Fetch on Mount | Data is fetched once inside `useEffect` with `[]` dependency | Static data that doesn't depend on user input (e.g., a fixed list) |
| Fetch on Dependency Change | Effect re-runs when a specific value (e.g., a search term or ID) changes | Data tied to a changing parameter, like a product detail page |
| Fetch on Event (e.g., button click) | Data fetched inside an event handler, not `useEffect` | Search-on-submit, "Load More" buttons |
| Polling | Repeated fetching at fixed intervals using `setInterval` inside `useEffect` | Live dashboards, chat applications |

```jsx
// Fetch on dependency change (e.g., fetching details for a specific product)
useEffect(() => {
  axios.get(`https://api.example.com/products/${productId}`)
    .then(res => setProduct(res.data));
}, [productId]);
```

### 5.4 User Experience Considerations

Beyond simply showing/hiding a spinner, thoughtful data-fetching design significantly improves perceived application quality:

- **Skeleton Screens** — showing placeholder shapes instead of a blank screen or plain "Loading..." text, giving users a sense of the content structure before it arrives.
- **Avoiding Layout Shift** — reserving space for content before it loads, so the page doesn't visually "jump" once data arrives.
- **Debouncing** — delaying API calls triggered by rapid user input (like typing in a search box) to avoid excessive requests.
- **Retry Mechanisms** — allowing users to retry a failed request with a button, rather than forcing a full page reload.
- **Empty States** — explicitly handling the case where a request succeeds but returns no data (e.g., "No results found"), rather than showing a blank list.

---

## useRef and useMemo Hooks

### 6.1 useRef Hook

The **`useRef`** Hook serves two main purposes:

1. Accessing a **DOM element directly** (similar to `document.getElementById` in vanilla JS).
2. Persisting a **mutable value** across renders **without** causing a re-render when it changes (unlike state).

**1. Accessing DOM elements:**

```jsx
import { useRef } from 'react';

function FocusInput() {
  const inputRef = useRef(null);

  function handleFocusClick() {
    inputRef.current.focus();   // directly calls the DOM's focus() method
  }

  return (
    <div>
      <input ref={inputRef} type="text" />
      <button onClick={handleFocusClick}>Focus Input</button>
    </div>
  );
}
```

**2. Persisting values without triggering re-renders:**

```jsx
function RenderCounter() {
  const renderCount = useRef(0);

  useEffect(() => {
    renderCount.current += 1;
    console.log(`Component rendered ${renderCount.current} times`);
  });

  return <p>Check the console for render count</p>;
}
```

**Key distinction — `useRef` vs `useState`:**

| Aspect | `useState` | `useRef` |
|---|---|---|
| Triggers re-render on change? | **Yes** | **No** |
| Typical use case | Data that affects what's rendered on screen | DOM access, storing values that shouldn't trigger re-renders (e.g., timer IDs, previous values) |
| Value access | Directly (`count`) | Through `.current` property (`ref.current`) |

### 6.2 useMemo Hook

The **`useMemo`** Hook is used to **memoize** (cache) the result of an expensive computation, so that it is only recalculated when its dependencies actually change — rather than on every single render.

```jsx
import { useMemo } from 'react';

function ExpensiveList({ items, filterText }) {
  const filteredItems = useMemo(() => {
    console.log("Filtering items...");   // only logs when items or filterText change
    return items.filter(item =>
      item.toLowerCase().includes(filterText.toLowerCase())
    );
  }, [items, filterText]);

  return (
    <ul>
      {filteredItems.map((item, index) => <li key={index}>{item}</li>)}
    </ul>
  );
}
```

**When to use `useMemo`:**

- The computation is genuinely **expensive** (e.g., filtering/sorting large datasets, complex calculations).
- The component **re-renders frequently** for reasons unrelated to that specific computation (e.g., due to unrelated state elsewhere in the component).

> **Caution for students:** `useMemo` itself has a small performance cost. It should **not** be applied to every calculation by default — overusing it can make code harder to read without providing any real benefit for cheap computations.

---

## useCallback and Custom Hooks

### 7.1 useCallback Hook

The **`useCallback`** Hook is closely related to `useMemo`, but instead of memoizing a computed **value**, it memoizes a **function reference** itself — ensuring the same function instance is reused across renders unless its dependencies change.

**Why this matters:** In JavaScript, functions are recreated on every render by default. This becomes a problem when a function is passed as a prop to a **memoized child component** (wrapped in `React.memo`), because a "new" function reference on every render would cause that child to re-render unnecessarily, even if nothing meaningful actually changed.

```jsx
import { useCallback, useState } from 'react';

function ParentComponent() {
  const [count, setCount] = useState(0);

  const handleClick = useCallback(() => {
    console.log("Button clicked");
  }, []);   // same function reference across renders

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <ChildButton onClick={handleClick} />
    </div>
  );
}

const ChildButton = React.memo(({ onClick }) => {
  console.log("ChildButton rendered");
  return <button onClick={onClick}>Click Me</button>;
});
```

Without `useCallback`, `ChildButton` would re-render every time `ParentComponent` re-renders (e.g., when `count` changes), even though the click behavior itself never changes.

**`useMemo` vs `useCallback` — quick comparison:**

| Hook | Memoizes | Common Use Case |
|---|---|---|
| `useMemo` | A **computed value** | Expensive calculations, derived data |
| `useCallback` | A **function reference** | Passing stable callbacks to memoized child components |

### 7.2 Creating and Using Custom Hooks

A **Custom Hook** is simply a regular JavaScript function whose name starts with `use`, and which can call other Hooks internally. Custom Hooks allow developers to **extract and reuse stateful logic** across multiple components, without duplicating code.

**Example — a custom Hook for fetching data:**

```jsx
import { useState, useEffect } from 'react';

function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios.get(url)
      .then(response => setData(response.data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [url]);

  return { data, loading, error };
}
```

**Using the custom Hook inside multiple components:**

```jsx
function UserList() {
  const { data: users, loading, error } = useFetch("https://jsonplaceholder.typicode.com/users");

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <ul>
      {users.map(user => <li key={user.id}>{user.name}</li>)}
    </ul>
  );
}

function PostList() {
  const { data: posts, loading, error } = useFetch("https://jsonplaceholder.typicode.com/posts");

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <ul>
      {posts.map(post => <li key={post.id}>{post.title}</li>)}
    </ul>
  );
}
```

Notice how both `UserList` and `PostList` reuse the **exact same data-fetching logic** — including loading state, error handling, and cleanup — without duplicating any code. This is the core benefit of custom Hooks.

**Rules for custom Hooks:**

1. The function name **must start with `use`** (e.g., `useFetch`, `useLocalStorage`) — this is a naming convention React relies on to correctly apply the Rules of Hooks.
2. Custom Hooks follow the **same Rules of Hooks** as built-in ones (called at the top level only, never conditionally).
3. Custom Hooks can call other Hooks internally (`useState`, `useEffect`, `useRef`, or even other custom Hooks), enabling layered logic composition.

**Practice suggestion:** Students should try building a second custom Hook — `useLocalStorage(key, initialValue)` — that syncs a piece of state with the browser's `localStorage`, further reinforcing how custom Hooks encapsulate reusable stateful behavior.

---
