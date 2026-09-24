import { useState } from "react";

function Expense() {
  const [addAmount, setAmount] = useState("");
  const [balance, setBalance] = useState(0);

  const [inputVal, setInputVal] = useState({
    product: "",
    amount: ""
  });

  const [expenseData, setExpenseData] = useState([]);
  const [message, setMessage] = useState("");

  const addAmountFun = () => {
    if (!addAmount || Number(addAmount) <= 0) {
      setMessage("Please enter a valid amount.");
      return;
    }

    setBalance((prev) => prev + Number(addAmount));
    setAmount("");
    setMessage(`₹${addAmount} has been added to your balance.`);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setInputVal({
      ...inputVal,
      [name]: value
    });

    setMessage("");
  };

  const expenseManage = () => {
    const expenseAmount = Number(inputVal.amount);

    if (!inputVal.product.trim()) {
      setMessage("Please enter a product name.");
      return;
    }

    if (!inputVal.amount || expenseAmount <= 0) {
      setMessage("Please enter a valid expense amount.");
      return;
    }

    if (expenseAmount > balance) {
      setMessage("Insufficient balance. Please add more money.");
      return;
    }

    setExpenseData([
      ...expenseData,
      {
        product: inputVal.product,
        amount: expenseAmount
      }
    ]);

    setBalance((prev) => prev - expenseAmount);

    setInputVal({
      product: "",
      amount: ""
    });

    setMessage(
      `${inputVal.product} purchased successfully for ₹${expenseAmount}.`
    );
  };

  return (
    <div>
      <h1>Expense Tracker</h1>

      <div>
        <h2>Balance: ₹{balance}</h2>

        <input
          type="number"
          value={addAmount}
          placeholder="Enter amount"
          onChange={(e) => setAmount(e.target.value)}
        />

        <button onClick={addAmountFun}>Add Amount</button>
      </div>

      <hr />

      <div>
        <h2>Add Expense</h2>

        <input
          type="text"
          name="product"
          placeholder="Enter product name"
          value={inputVal.product}
          onChange={handleChange}
        />

        <input
          type="number"
          name="amount"
          placeholder="Enter expense amount"
          value={inputVal.amount}
          onChange={handleChange}
        />

        <button onClick={expenseManage}>Buy</button>
      </div>

      {message && <p>{message}</p>}

      <hr />

      <div>
        <h2>Expense History</h2>

        {expenseData.length === 0 ? (
          <p>No expenses yet.</p>
        ) : (
          expenseData.map((val, idx) => (
            <div key={idx}>
              <p>
                <strong>Product Name:</strong> {val.product}
              </p>

              <p>
                <strong>Amount:</strong> ₹{val.amount}
              </p>

              <hr />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Expense;
