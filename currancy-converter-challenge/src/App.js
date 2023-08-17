import { useState } from "react";
import { useEffect } from "react";
// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

export default function App() {
  const [amount, setAmount] = useState("100");
  const [fromCurrancy, setFromCurrancy] = useState("EUR");
  const [toCurrancy, setToCurrancy] = useState("USD");
  const [rates, setRates] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(
    function () {
      setIsLoading(true);
      async function fetchExchangeRate() {
        try {
          const res = await fetch(
            `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrancy}&to=${toCurrancy}`
          );
          if (!res.ok)
            throw new Error("Something went wrong with fetching currancy");

          const data = await res.json();
          if (data.Response === "False") {
            throw new Error("Currancy not found");
          }
          console.log(data.rates[toCurrancy]);
          setRates(data.rates[toCurrancy]);
          setIsLoading(false);
        } catch (err) {
          console.log(err);
        } finally {
          console.log("finally!");
        }
      }
      if (fromCurrancy === toCurrancy) return setRates(amount);
      fetchExchangeRate();
    },
    [amount, fromCurrancy, toCurrancy]
  );
  return (
    <div>
      <input
        type="text"
        onChange={(e) => setAmount(e.target.value)}
        disabled={isLoading}
      />
      <select
        value={fromCurrancy}
        onChange={(e) => setFromCurrancy(e.target.value)}
        disabled={isLoading}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select
        value={toCurrancy}
        onChange={(e) => setToCurrancy(e.target.value)}
        disabled={isLoading}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>{rates}</p>
    </div>
  );
}
