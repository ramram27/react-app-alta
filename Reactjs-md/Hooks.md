### Hooks
Hooks are built-in React APIs that let functional components use state, lifecycle behavior, context, and other React features without classes. They improve code reusability, readability, and maintainability. In modern React applications, Hooks are the standard way to manage component logic and side effects.

### useState
useState is a React Hook used to manage local state in functional components. It returns the current state value and a setter function. Whenever the setter updates the state, React schedules a re-render so the UI stays synchronized with the latest data. In production applications, useState is commonly used for form inputs, loading states, modal visibility, search filters, and other component-specific state.

# Ex=>
const [cartCount, setCartCount] = useState(0);
setCount(count + 1);
setCount((prev) => prev + 1);

### useEffect
useEffect is a React Hook used to handle side effects in functional components, such as API calls, subscriptions, timers, and event listeners. It runs after the component renders and supports a cleanup function to prevent memory leaks. The dependency array controls when the effect executes, making side effects predictable and efficient.


Dependency Array
// Runs only once (on mount)
useEffect(() => {}, []);


// Runs whenever `count` changes
useEffect(() => {}, [count]);


// Runs after every render
useEffect(() => {});