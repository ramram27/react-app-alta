### 1. Create a React component with a counter. Use useEffect to update the browser tab title whenever the counter changes.



### 2. Create a React component that fetches users from an API when the component loads. Display the users' names on the screen.

https://jsonplaceholder.typicode.com/users


### 3. Create a digital clock using React. The clock should display the current time and update every second using useEffect.

Clock.jsx
new Date()

### 4. Create a search box using React. When the user enters a name, use useEffect to filter the users and display matching users.

component=>>>  SearchBox.jsx


5. Student Registration Form with Validation
Create a React form containing:
Name
Email
Course
Submit button
Requirements:
Use useState for form data.
Create controlled components.
Use onChange to update state.
Use preventDefault() on form submission.
Validate that no field is empty.
Display an error message if validation fails.
Display a success message when the form is submitted successfully.

const [formData, setFormData] =useSatate({
    name:'',
    email:'',
    course:''
})



6. Create a React component that generates a random number between 1 and 100. Use useEffect to display a message based on the generated number:

1–30 → Low
31–70 → Medium
71–100 → High


Header.jsx
LeftSidebar.jsx
RightSidebar.jsx
Footer.jsx
MainBody.jsx