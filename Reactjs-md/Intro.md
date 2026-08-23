### Props

Props are read-only inputs used to pass data from a parent component to a child component. They make components reusable and configurable while maintaining React's one-way data flow. Since props are immutable, any changes must be made by the parent component, ensuring predictable state management.

### State
State is mutable data owned by a component that controls its behavior and rendering. Whenever the state changes, React re-renders the component to keep the UI synchronized with the latest data. For application-wide state, we typically use solutions like Context API or Redux Toolkit.

### Keys
Keys are unique identifiers assigned to elements in a list. They help React identify which items have been added, removed, updated, or reordered during the reconciliation process.

### Controlled Component
A Controlled Component is a form element whose value is controlled by React state. React is the single source of truth, and every change is handled through state.

### Uncontrolled Component
An Uncontrolled Component stores its value in the DOM, not in React state. React accesses the value using a ref when needed.