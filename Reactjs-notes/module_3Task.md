## 1. Focus Input using useRef
Create a React form with Name, Email, and Password fields.
Requirements:

Use useRef for the Name input.
Add a Focus Name button.
When clicked, automatically focus the Name input.
Do not use document.getElementById().

## 2. Previous Value using useRef
Create a counter application.
Requirements:

Add Increment and Decrement buttons.
Display the current count.
Use useRef to store the previous count.
Display both Current Count and Previous Count.
The previous value should update when the count changes.

## 3. Stopwatch using useRef
Create a stopwatch application using useRef.
Requirements:

Add Start, Stop, and Reset buttons.
Display elapsed time in seconds.
Store the interval ID using useRef.
Make sure multiple intervals are not created when Start is clicked repeatedly.

## 4. Expensive Calculation using useMemo
Create a student marks application.
Requirements:

Store a list of students and their marks.
Calculate the average marks.
Display students who scored above 75.
Use useMemo for the calculations.
Add an unrelated counter and verify that the calculation does not run unnecessarily.

## 5. Product Filtering using useMemo
Create a product filtering application.
Requirements:

Create a list of products with name, category, and price.
Add a category filter.
Add a price filter.
Use useMemo to calculate the filtered products.
Display the filtered product list.

## 6. Child Component Optimization using useCallback
Create a Parent and Child component.
Requirements:

Parent component contains a counter.
Child component contains an Add Item button.
Pass the event handler from Parent to Child.
Use useCallback to memoize the handler.
Use React.memo() for the Child component.
Display the number of items added.

## 7. Todo Application using useCallback
Create a Todo application.
Requirements:

Add a new todo.
Delete a todo.
Mark a todo as completed.
Create separate TodoItem components.
Use React.memo() for TodoItem.
Use useCallback for Add, Delete, and Complete functions.

## 8. Create a Custom useToggle Hook
Create a reusable custom hook called useToggle.
Requirements:

Create useToggle(initialValue).
Return the current boolean value and a function to toggle it.
Use the hook to create:
Show/Hide password
Show/Hide menu
The same custom hook should be reusable in both cases.
## 9. Create a Custom useInput Hook

Create a reusable form using a custom useInput hook.

Requirements:

Create useInput(initialValue).
The hook should manage input value and onChange.
Create Name, Email, and Password fields.
Use the custom hook for all three fields.
Add a Submit button.
Display the submitted form data.

## 10. Build a Product Explorer app using 
https://fakestoreapi.com/products.

Requirements:
1. Fetch products with Axios inside useEffect on mount; handle loading and error states.
2. Display each product's image, title, category, price, and rating in a reusable ProductCard component.
3. Add a search input (auto-focused on load using useRef) and a category filter dropdown.
4. Use useMemo to optimize: filtered results (search + category) and product statistics (total products, average price, highest-priced product).
6. Add an "Add to Favorites" button per product — maintain favorites in state, plus a "Clear Favorites" button.
7. Wrap ProductCard in React.memo, and use useCallback for any handlers (like addToFavorite) passed to it — prove unrelated re-renders don't affect cards.

## 11. Create a reusable useFetch(url) custom hook that returns { data, loading, error }, uses Axios internally, and refetches via useEffect whenever url changes.

Requirements:
Use the hook to build a Posts Page (jsonplaceholder.typicode.com/posts) showing Post ID, Title, and Body — with a button to show only the first 10 posts.
Reuse the same hook for a Users Page (jsonplaceholder.typicode.com/users) showing name and email.
Show "Loading..." while fetching and "Something went wrong. Please try again." on error, with a Retry button (wrapped in useCallback) to refetch.
Use useRef to auto-focus a search input on page load.