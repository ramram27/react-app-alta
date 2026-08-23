## 1. Introduction to State in React
In React, state is used to store data that can change over time.

For example:

* Counter value
* User name
* Login status
* Form input
* Product quantity
* Todo list

When state changes, React automatically updates the UI.

### Example
User clicks button
        ↓
State changes
        ↓
React detects change
        ↓
Component re-renders
        ↓
Updated UI appears


## 2. State Management Using the `useState` Hook

React provides a Hook called `useState` for managing state in functional components.

### Syntax

const [state, setState] = useState(initialValue);


Example:

const [count, setCount] = useState(0);

Here:

* `count` → current state value
* `setCount` → function used to update the state
* `0` → initial value

---

### Example: Counter

```jsx
import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>Count: {count}</h1>

      <button onClick={() => setCount(count + 1)}>
        Increase
      </button>
    </div>
  );
}

export default App;
```

### Flow

Initial State
count = 0
     ↓
User clicks Increase
     ↓
setCount(count + 1)
     ↓
count = 1
     ↓
React updates UI

## 3. Updating State

State should not be directly modified.

### Incorrect
count = count + 1;

React may not know that the state has changed.

### Correct

setCount(count + 1);

Always use the state update function.

### Increase and Decrease Example

```jsx
import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  const increase = () => {
    setCount(count + 1);
  };

  const decrease = () => {
    setCount(count - 1);
  };

  return (
    <div>
      <h1>{count}</h1>

      <button onClick={increase}>
        Increase
      </button>

      <button onClick={decrease}>
        Decrease
      </button>
    </div>
  );
}

export default App;
```


## 4. Functional State Updates

Sometimes the new state depends on the previous state.

In this case, use a callback function.

setCount((previousCount) => previousCount + 1);

### Example

```jsx
import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  const increase = () => {
    setCount((previousCount) => previousCount + 1);
  };

  return (
    <div>
      <h1>{count}</h1>

      <button onClick={increase}>
        Increase
      </button>
    </div>
  );
}

export default App;
```

This is especially useful when the next state depends on the previous value.


## 5. State with Different Data Types

### String State

```jsx
const [name, setName] = useState("Rohit");
```

Update:

```jsx
setName("Amit");
```

---

### Boolean State

```jsx
const [isLoggedIn, setIsLoggedIn] = useState(false);
```

Update:

```jsx
setIsLoggedIn(true);
```

---

### Array State

```jsx
const [students, setStudents] = useState([
  "Rohit",
  "Amit",
  "Priya"
]);
```

---

### Object State

```jsx
const [student, setStudent] = useState({
  name: "Rohit",
  age: 25
});
```

---

## 6. Updating Object State

Suppose we have:

```jsx
const [student, setStudent] = useState({
  name: "Rohit",
  age: 25
});
```

To update only the name:

```jsx
setStudent({
  ...student,
  name: "Amit"
});
```

The spread operator copies the existing object values.

### Before

```text
{
  name: "Rohit",
  age: 25
}
```

### After

```text
{
  name: "Amit",
  age: 25
}
```

---

## 7. State vs Props

Both **state** and **props** are used to work with data in React.

However, they are different.

| State                      | Props                                         |
| -------------------------- | ---------------------------------------------- |
| Managed inside a component | Passed from parent to child                   |
| Can be updated             | Read-only for the receiving child             |
| Uses `useState`            | Passed as attributes                          |
| Changes can update the UI  | New props from parent can update the child UI |

---

### Props Example

#### Parent Component

```jsx
function App() {
  return <Student name="Rohit" />;
}
```

#### Child Component

```jsx
function Student(props) {
  return <h1>{props.name}</h1>;
}
```

The parent sends data to the child.

Parent
  │
  │ props
  ↓
Child


### State Example

```jsx
function Student() {
  const [name, setName] = useState("Rohit");

  return (
    <div>
      <h1>{name}</h1>

      <button onClick={() => setName("Amit")}>
        Change Name
      </button>
    </div>
  );
}
```

Here, the component manages its own data.

---

## 8. State-Driven UI Updates

React UI is driven by state.

For example:

```jsx
const [isLoggedIn, setIsLoggedIn] = useState(false);
```

We can display different UI depending on the state.

```jsx
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div>
      {isLoggedIn ? (
        <h1>Welcome User</h1>
      ) : (
        <h1>Please Login</h1>
      )}

      <button onClick={() => setIsLoggedIn(!isLoggedIn)}>
        Login / Logout
      </button>
    </div>
  );
}
```

### Flow

```text
isLoggedIn = false
        ↓
Please Login

User clicks button
        ↓
State changes
        ↓
isLoggedIn = true
        ↓
Welcome User
```

---

## 9. Lists in React

In React, lists are commonly rendered using JavaScript array methods.

The most commonly used method is:

```text
map()
```

Example data:

```jsx
const students = ["Rohit", "Amit", "Priya"];
```

Render the list:

```jsx
function App() {
  const students = ["Rohit", "Amit", "Priya"];

  return (
    <div>
      {students.map((student) => (
        <h2>{student}</h2>
      ))}
    </div>
  );
}
```

Output:

```text
Rohit
Amit
Priya
```

---

## 10. Understanding Keys

When rendering lists, React needs a `key`.

Example:

```jsx
{students.map((student, index) => (
  <h2 key={index}>{student}</h2>
))}
```

The `key` helps React identify each item between renders.

A better option is to use a stable unique ID when available.

Example:

```jsx
const students = [
  { id: 1, name: "Rohit" },
  { id: 2, name: "Amit" },
  { id: 3, name: "Priya" }
];
```

Render:

```jsx
{students.map((student) => (
  <h2 key={student.id}>
    {student.name}
  </h2>
))}
```

### Important

Prefer:

```jsx
key={student.id}
```

over an array index when the list can be added, removed, reordered, or filtered.


## 11. Rendering Dynamic Data

Dynamic data means data that can come from:

* State
* Props
* API
* Database
* User input

Example:

```jsx
function App() {
  const products = [
    {
      id: 1,
      name: "Laptop",
      price: 50000
    },
    {
      id: 2,
      name: "Mobile",
      price: 20000
    },
    {
      id: 3,
      name: "Headphones",
      price: 3000
    }
  ];

  return (
    <div>
      {products.map((product) => (
        <div key={product.id}>
          <h2>{product.name}</h2>
          <p>Price: ₹{product.price}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
```

---

## 12. Array Methods in React Applications

React applications frequently use JavaScript array methods.

Important methods include:

* `map()`
* `filter()`
* `find()`
* `reduce()`

---

### `map()`

Used to transform or render every item.

```jsx
const numbers = [1, 2, 3];

const result = numbers.map((number) => number * 2);

console.log(result);
```

Output:

```text
[2, 4, 6]
```

React example:

```jsx
{students.map((student) => (
  <p key={student.id}>
    {student.name}
  </p>
))}
```

---

### `filter()`

Used to create a new array containing only matching items.

```jsx
const students = [
  { id: 1, name: "Rohit", active: true },
  { id: 2, name: "Amit", active: false },
  { id: 3, name: "Priya", active: true }
];

const activeStudents = students.filter(
  (student) => student.active
);
```

Result:

```text
Rohit
Priya
```

---

### `find()`

Returns the first matching item.

```jsx
const student = students.find(
  (student) => student.id === 2
);
```

---

### `reduce()`

Used to calculate a single value from an array.

Example:

```jsx
const prices = [100, 200, 300];

const total = prices.reduce(
  (sum, price) => sum + price,
  0
);

console.log(total);
```

Output:

```text
600
```

---

## 13. Forms in React

Forms allow users to enter data.

Examples:

* Login form
* Registration form
* Contact form
* Product form
* Student form

In React, form data is usually managed using state.

---

## 14. Controlled Components

A **controlled component** is a form element whose value is controlled by React state.

Example:

```jsx
import { useState } from "react";

function App() {
  const [name, setName] = useState("");

  return (
    <div>
      <input
        type="text"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />

      <h2>Name: {name}</h2>
    </div>
  );
}

export default App;
```

### Flow

```text
User types input
        ↓
onChange event
        ↓
setName()
        ↓
State updates
        ↓
Input value updates
        ↓
UI updates
```

---

## 15. Multiple Form Fields

We can manage multiple fields using multiple state variables.

```jsx
import { useState } from "react";

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  return (
    <div>
      <input
        type="text"
        placeholder="Enter Name"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />

      <br />

      <input
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />

      <h3>Name: {name}</h3>
      <h3>Email: {email}</h3>
    </div>
  );
}

export default App;
```

---

## 16. Form State Management Using an Object

For larger forms, using one object can be useful.

```jsx
import { useState } from "react";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value
    });
  };

  return (
    <div>
      <input
        type="text"
        name="name"
        placeholder="Enter Name"
        value={formData.name}
        onChange={handleChange}
      />

      <br />

      <input
        type="email"
        name="email"
        placeholder="Enter Email"
        value={formData.email}
        onChange={handleChange}
      />

      <br />

      <input
        type="password"
        name="password"
        placeholder="Enter Password"
        value={formData.password}
        onChange={handleChange}
      />
    </div>
  );
}

export default App;
```

---

## 17. Form Submission

To handle form submission, use:

```jsx
onSubmit
```

Example:

```jsx
import { useState } from "react";

function App() {
  const [name, setName] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log(name);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />

      <button type="submit">
        Submit
      </button>
    </form>
  );
}

export default App;
```

---

## 18. Why Use `preventDefault()`?

Normally, when a form is submitted, the browser may perform its default submission behavior, which can cause a page navigation or reload.

In a React form, we often prevent that behavior:

```jsx
event.preventDefault();
```

This allows React code to control what happens after submission.

---

## 19. Form Validation Techniques

Form validation checks whether user input is correct.

Examples:

* Name should not be empty
* Email should be valid
* Password should have enough characters
* Required fields must be completed

---

## 20. Basic Validation Example

```jsx
import { useState } from "react";

function App() {
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (name.trim() === "") {
      setError("Name is required");
      return;
    }

    setError("");

    alert("Form Submitted Successfully");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />

        {error && <p>{error}</p>}

        <button type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default App;
```

---

## 21. Email Validation Example

```jsx
const validateEmail = (email) => {
  if (!email.includes("@")) {
    return "Please enter a valid email";
  }

  return "";
};
```

A simple form example:

```jsx
import { useState } from "react";

function App() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (email.trim() === "") {
      setError("Email is required");
      return;
    }

    if (!email.includes("@")) {
      setError("Enter a valid email");
      return;
    }

    setError("");

    alert("Form submitted successfully");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter Email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />

      {error && <p>{error}</p>}

      <button type="submit">
        Submit
      </button>
    </form>
  );
}

export default App;
```

---

## 22. Complete Mini Project: Student Registration Form

This project demonstrates:

* `useState`
* Controlled components
* Form state management
* Form submission
* Validation
* State-driven UI

```jsx
import { useState } from "react";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    course: ""
  });

  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      formData.name.trim() === "" ||
      formData.email.trim() === "" ||
      formData.course.trim() === ""
    ) {
      setMessage("Please fill all fields");
      return;
    }

    if (!formData.email.includes("@")) {
      setMessage("Please enter a valid email");
      return;
    }

    setMessage("Student registered successfully");

    console.log(formData);
  };

  return (
    <div>
      <h1>Student Registration Form</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          value={formData.name}
          onChange={handleChange}
        />

        <br />
        <br />

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={formData.email}
          onChange={handleChange}
        />

        <br />
        <br />

        <select
          name="course"
          value={formData.course}
          onChange={handleChange}
        >
          <option value="">
            Select Course
          </option>

          <option value="React">
            React
          </option>

          <option value="Node.js">
            Node.js
          </option>

          <option value="MongoDB">
            MongoDB
          </option>
        </select>

        <br />
        <br />

        <button type="submit">
          Register
        </button>
      </form>

      <h3>{message}</h3>
    </div>
  );
}

export default App;
```

---

## 23. Adding Items to an Array Using State

Suppose we want to add students dynamically.

```jsx
import { useState } from "react";

function App() {
  const [name, setName] = useState("");

  const [students, setStudents] = useState([
    "Rohit",
    "Amit"
  ]);

  const addStudent = () => {
    if (name.trim() === "") {
      return;
    }

    setStudents([
      ...students,
      name
    ]);

    setName("");
  };

  return (
    <div>
      <input
        type="text"
        value={name}
        onChange={(event) => setName(event.target.value)}
        placeholder="Enter Student Name"
      />

      <button onClick={addStudent}>
        Add Student
      </button>

      {students.map((student, index) => (
        <p key={index}>
          {student}
        </p>
      ))}
    </div>
  );
}

export default App;
```

---

## 24. Important Concept: Do Not Mutate State Directly

Incorrect:

```jsx
students.push("Rahul");

setStudents(students);
```

A safer approach is to create a new array:

```jsx
setStudents([
  ...students,
  "Rahul"
]);
```

The same principle applies to objects.

Incorrect:

```jsx
student.name = "Amit";
```

Better:

```jsx
setStudent({
  ...student,
  name: "Amit"
});
```

---

## 25. Complete Topic Summary

After completing this topic, students should understand:

1. What state is in React
2. How to use the `useState` Hook
3. How to update state
4. Functional state updates
5. State with strings, booleans, arrays, and objects
6. State vs props
7. State-driven UI updates
8. Rendering lists with `map()`
9. Why keys are important
10. Rendering dynamic data
11. Using `filter()`
12. Using `find()`
13. Using `reduce()`
14. Creating forms in React
15. Controlled components
16. Managing multiple form fields
17. Handling form submission
18. Using `preventDefault()`
19. Form validation
20. Managing arrays with state

---

## 26. Practice Tasks for Students

### Task 1: Counter Application

Create a counter with:

* Increase button
* Decrease button
* Reset button

Use:

```jsx
useState
```

---

### Task 2: Show and Hide Password

Create a password input with a button.

Requirements:

* Initially hide the password
* Click the button to show the password
* Click again to hide it

Use boolean state.

---

### Task 3: Student List

Create an array of students:

```jsx
const students = [
  {
    id: 1,
    name: "Rohit",
    course: "React"
  },
  {
    id: 2,
    name: "Amit",
    course: "Node.js"
  }
];
```

Use `map()` to display all students.

Use:

```jsx
key={student.id}
```

---

### Task 4: Search Student

Create a search input.

Requirements:

1. Store the search value in state.
2. Filter the student array.
3. Display only matching students.

Use:

```jsx
filter()
```

---

### Task 5: Login Form

Create a form containing:

* Email
* Password
* Submit button

Requirements:

* Use controlled components.
* Use `useState`.
* Prevent the default form submission.
* Validate empty fields.
* Display an error message if validation fails.

---

### Task 6: Add Student

Create an input field.

The user enters a student name.

When the **Add Student** button is clicked:

1. Add the student to an array.
2. Update the state.
3. Render the updated student list using `map()`.

---

## Final Teaching Flow

A good order for teaching students is:

```text
1. What is State?
        ↓
2. useState Hook
        ↓
3. Updating State
        ↓
4. State-Driven UI
        ↓
5. State vs Props
        ↓
6. Arrays and Lists
        ↓
7. map() and Keys
        ↓
8. Dynamic Data
        ↓
9. Forms
        ↓
10. Controlled Components
        ↓
11. Form State
        ↓
12. Form Submission
        ↓
13. Form Validation
        ↓
14. Mini Projects and Practice
```

This sequence helps students first understand **how React stores changing data**, then **how React renders dynamic data**, and finally **how user input and forms are managed using state**.