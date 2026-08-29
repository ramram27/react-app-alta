# Module 2: State Management & Forms

---

### 1.1 State Management using the useState Hook

**State** refers to data that belongs to a component and can change over time — typically as a result of user interaction, network responses, or timers. Unlike **props** (which are passed *into* a component from outside), state is **owned and managed internally** by the component itself.

React provides the **`useState`** Hook to add state to functional components. It was introduced in React 16.8, and is one of the most frequently used Hooks in day-to-day development.

**Syntax:**

```jsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Current Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

**Breaking down `useState`:**

| Part | Meaning |
|---|---|
| `useState(0)` | Initializes state with a default value of `0` |
| `count` | The **current value** of the state |
| `setCount` | The **updater function**, used to change the state and trigger a re-render |
| Array Destructuring | `useState` always returns an array of exactly two elements: `[currentValue, updaterFunction]` |

> **Important:** State variables should **never** be modified directly (e.g., `count = count + 1` is incorrect). State must always be updated using its corresponding setter function, so that React knows to re-render the component.

### 1.2 Updating State

When the setter function (e.g., `setCount`) is called, React schedules a **re-render** of the component with the new state value. There are two common ways to update state:

**1. Direct value update:**

```jsx
setCount(count + 1);
```

**2. Functional update (recommended when the new state depends on the previous state):**

```jsx
setCount(prevCount => prevCount + 1);
```

The functional form is safer in situations involving multiple rapid updates (e.g., inside loops or asynchronous code), because it guarantees React uses the most recent state value rather than a potentially "stale" one captured at render time.

```jsx
function handleTripleIncrement() {
  setCount(prev => prev + 1);
  setCount(prev => prev + 1);
  setCount(prev => prev + 1);
  // Correctly increments by 3 in total
}
```

> **State updates are asynchronous** — calling `setCount()` does not immediately change `count`; it schedules an update, and the component re-renders with the new value on the next render cycle.

### 1.3 State vs Props

This is one of the most important conceptual distinctions in React and a common exam/interview question.

| Aspect | Props | State |
|---|---|---|
| Ownership | Passed **into** a component from its **parent** | **Owned and managed internally** by the component |
| Mutability | **Read-only** (immutable) — a component cannot change its own props | **Mutable** via the setter function (`setState`/`useState` updater) |
| Data Flow | Flows **top-down** (parent → child) | Local to the component (can be lifted up if needed by multiple components) |
| Who can change it | Only the **parent** component | The component **itself** (through its state updater) |
| Purpose | Configures/customizes a component from outside | Tracks data that changes over the component's lifetime (e.g., form inputs, toggles, counters) |

```jsx
// props example
function Greeting({ name }) {   // 'name' is a prop — comes from parent
  return <h2>Hello, {name}</h2>;
}

// state example
function Counter() {
  const [count, setCount] = useState(0); // 'count' is state — owned internally
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

### 1.4 State-driven UI Updates

React follows a **declarative** programming model: instead of manually telling the browser *how* to update the DOM step-by-step, developers describe *what* the UI should look like for any given state, and React automatically re-renders the UI whenever that state changes.

```jsx
function ToggleButton() {
  const [isOn, setIsOn] = useState(false);

  return (
    <button onClick={() => setIsOn(!isOn)}>
      {isOn ? "ON" : "OFF"}
    </button>
  );
}
```

**How it works internally (simplified flow):**

1. Initial render: `isOn` is `false` → button displays "OFF".
2. User clicks the button → `setIsOn(!isOn)` is called.
3. React updates the internal state value to `true`.
4. React **re-renders** the component function, producing new JSX based on the updated state.
5. React compares the new Virtual DOM with the previous one (diffing) and updates only the changed part of the real DOM — in this case, just the button's text.

This "state → UI" relationship is the foundation of how interactive React applications work.

---

### 2.1 Lists and Keys

Applications frequently need to render a **collection of items** — for example, a list of products, students, or messages. React handles this using standard JavaScript array methods (typically `.map()`) combined with JSX.

```jsx
const fruits = ["Apple", "Banana", "Mango"];

function FruitList() {
  return (
    <ul>
      {fruits.map((fruit, index) => (
        <li key={index}>{fruit}</li>
      ))}
    </ul>
  );
}
```

**Why `key` is required:**

The `key` prop is a special attribute React uses **internally** to identify which items in a list have changed, been added, or been removed. Keys must be:

- **Unique** among siblings (not necessarily globally unique).
- **Stable** across re-renders (the same item should keep the same key each time).

```jsx
const students = [
  { id: "s1", name: "Aarav" },
  { id: "s2", name: "Priya" },
];

function StudentList() {
  return (
    <ul>
      {students.map(student => (
        <li key={student.id}>{student.name}</li>
      ))}
    </ul>
  );
}
```

> **Best practice:** Prefer a **stable unique ID** (like a database ID) over the array `index` as a key. Using `index` can cause subtle bugs when items are reordered, inserted, or removed — because React may match the wrong DOM node to the wrong data item.

### 2.2 Rendering Dynamic Data

"Dynamic data" refers to data that is not hardcoded but instead comes from a variable, an API response, or user input, and can change over the component's lifetime. Rendering it typically combines **state** with **list rendering**.

```jsx
function ProductList() {
  const [products, setProducts] = useState([
    { id: 1, name: "Laptop", price: 55000 },
    { id: 2, name: "Mouse", price: 500 },
  ]);

  return (
    <div>
      {products.map(product => (
        <div key={product.id}>
          <h4>{product.name}</h4>
          <p>₹{product.price}</p>
        </div>
      ))}
    </div>
  );
}
```

Because `products` is stored in state, the UI automatically re-renders whenever the underlying array changes (e.g., after adding, removing, or updating a product).

### 2.3 Array Methods in React Applications

Beyond `.map()`, several other JavaScript array methods are commonly used to transform and manage data before or during rendering:

| Method | Purpose | Example |
|---|---|---|
| `.map()` | Transform each item into a JSX element | `items.map(item => <li>{item}</li>)` |
| `.filter()` | Render only items matching a condition | `products.filter(p => p.price > 1000)` |
| `.reduce()` | Aggregate values (e.g., total price) | `products.reduce((sum, p) => sum + p.price, 0)` |
| `.find()` | Locate a single matching item | `students.find(s => s.id === "s1")` |
| `.sort()` | Order items before rendering | `products.sort((a, b) => a.price - b.price)` |

**Combined example — filtering and mapping together:**

```jsx
function ExpensiveProducts({ products }) {
  return (
    <ul>
      {products
        .filter(product => product.price > 1000)
        .map(product => (
          <li key={product.id}>{product.name} — ₹{product.price}</li>
        ))}
    </ul>
  );
}
```

> **Important:** Since state must never be mutated directly, when updating an array in state, always use **non-mutating** methods (`.map()`, `.filter()`, spread `[...array]`) instead of mutating methods like `.push()`, `.splice()`, or `.sort()` directly on the state array.

---

## Class 3: Forms and Controlled Components

### 3.1 Forms in React

Forms are one of the most common ways users interact with a web application — for login, registration, search, and data entry. In React, handling forms requires a slightly different approach compared to plain HTML, because React needs to keep the form's data in sync with the component's state.

**Basic uncontrolled reference (for comparison):**

```html
<!-- Plain HTML — the browser manages input state internally -->
<input type="text" id="username" />
```

In React, the recommended approach is to make form inputs **controlled**, meaning React (via state) becomes the "single source of truth" for the input's value — not the DOM.

### 3.2 Controlled Components

A **controlled component** is a form element (like `<input>`, `<textarea>`, or `<select>`) whose value is driven entirely by React state, rather than by the DOM's own internal state.

```jsx
function NameInput() {
  const [name, setName] = useState("");

  function handleChange(event) {
    setName(event.target.value);
  }

  return (
    <div>
      <input type="text" value={name} onChange={handleChange} />
      <p>You typed: {name}</p>
    </div>
  );
}
```

**How a controlled component works, step by step:**

1. The input's `value` is bound to a state variable (`name`).
2. Every keystroke triggers the `onChange` event.
3. `handleChange` reads the new value from `event.target.value` and updates state via `setName`.
4. React re-renders the component, and the input displays the updated state value.

This creates a predictable, single loop: **state → input value → user types → event → state update → re-render.**

| Aspect | Controlled Component | Uncontrolled Component |
|---|---|---|
| Source of truth | React state | The DOM itself |
| Value access | Read directly from state | Read using a `ref` (e.g., `inputRef.current.value`) |
| Validation | Easier — value available on every keystroke | Harder — value only available when explicitly accessed |
| Recommended for | Most standard React forms | File inputs, or simple forms with minimal logic |

---

### 4.1 Form State Management

As forms grow beyond a single field, it becomes inefficient to create a separate `useState` variable for every input. Instead, a common and scalable pattern is to store **all form fields in a single state object**.

```jsx
function RegistrationForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  return (
    <form>
      <input name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Full Name" />
      <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
      <input name="password" type="password" value={formData.password} onChange={handleChange} placeholder="Password" />
    </form>
  );
}
```

**Key concepts in the above pattern:**

- **Spread Operator (`...formData`)** — creates a **new object** by copying all existing fields, satisfying React's requirement that state should never be mutated directly.
- **Computed Property Name (`[name]: value`)** — dynamically updates only the field whose `name` attribute matches the input that triggered the event, while leaving all other fields untouched.
- **`name` attribute on inputs** — must exactly match the corresponding key in the state object, so that `event.target.name` correctly maps to the right property.

### 4.2 Handling Multiple Form Inputs

Building on the single-handler pattern above, this technique becomes especially powerful because **one single `handleChange` function can manage an unlimited number of form fields**, as long as each input's `name` attribute is correctly set.

```jsx
function ProfileForm() {
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
  });

  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    setProfile(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  return (
    <form>
      <input name="firstName" value={profile.firstName} onChange={handleChange} />
      <input name="lastName" value={profile.lastName} onChange={handleChange} />
      <input name="age" type="number" value={profile.age} onChange={handleChange} />
      <select name="gender" value={profile.gender} onChange={handleChange}>
        <option value="">Select</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
    </form>
  );
}
```

**Points to note for students:**

- Using the **functional update form** (`prev => ({...})`) is safer here too, especially if multiple state updates could occur in quick succession.
- Different input types (`checkbox`, `radio`, `select`, `text`, `number`) may require slightly different handling logic (e.g., reading `checked` instead of `value` for checkboxes), as shown above.
- This single-handler approach significantly reduces code duplication compared to writing a separate `onChange` handler for every field.

---

### 5.1 Form Validation Techniques

Validation ensures that the data entered by a user meets the expected format and constraints (e.g., a required field is not empty, an email is properly formatted, a password meets a minimum length) before the form is submitted.

**Common validation approaches in React:**

**1. Inline validation (on every change / on blur):**

```jsx
function EmailInput() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  function handleChange(event) {
    const value = event.target.value;
    setEmail(value);

    if (!value.includes("@")) {
      setError("Please enter a valid email address.");
    } else {
      setError("");
    }
  }

  return (
    <div>
      <input value={email} onChange={handleChange} placeholder="Email" />
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
```

**2. Validation on form submission:**

```jsx
function LoginForm() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({});

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  function validate() {
    const newErrors = {};
    if (!formData.username.trim()) newErrors.username = "Username is required";
    if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";
    return newErrors;
  }

  function handleSubmit(event) {
    event.preventDefault();          // prevents default full-page form submission/reload
    const validationErrors = validate();

    if (Object.keys(validationErrors).length === 0) {
      console.log("Form submitted successfully:", formData);
    } else {
      setErrors(validationErrors);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="username" value={formData.username} onChange={handleChange} placeholder="Username" />
      {errors.username && <p style={{ color: "red" }}>{errors.username}</p>}

      <input name="password" type="password" value={formData.password} onChange={handleChange} placeholder="Password" />
      {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}

      <button type="submit">Login</button>
    </form>
  );
}
```

**Key validation concepts:**

| Concept | Explanation |
|---|---|
| `event.preventDefault()` | Stops the browser's default behavior of reloading the page on form submission |
| Validation timing | Can occur **on change** (immediate feedback), **on blur** (after leaving a field), or **on submit** (all at once) |
| Error state | Typically stored as a separate state object, mapping field names to error messages |
| Third-party libraries | For larger applications, libraries like **Formik** or **React Hook Form** (often paired with **Yup** for schema validation) are commonly used to simplify validation logic |


