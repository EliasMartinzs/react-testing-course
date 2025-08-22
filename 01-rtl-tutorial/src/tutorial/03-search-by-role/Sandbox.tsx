import { useEffect, useState } from "react";

const Sandbox = () => {
  const [showAsyncButton, setShowAsyncButton] = useState(false);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAsyncButton(true);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      <nav>
        <a href="/">Home</a>
        <a href="/about">About</a>
      </nav>
      {/* heading */}
      <h1>Main Heading</h1>
      <h2>Subheading</h2>
      <img src="example.jpg" alt="example" />
      {/* regular buttons */}
      <button>Click me</button>
      <button>Submit</button>
      <button>Cancel</button>
      {/* condicional error button to demonstrate queryByRole */}
      {showError && <button>Error</button>}
      {/* Async button to demonstrate findByRole */}
      {showAsyncButton && <button>Async button</button>}
    </div>
  );
};
export default Sandbox;
