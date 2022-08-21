import SignupForm from "./components/SignupForm";

function App() {
  return (
    <div className="App flex flex-col pt-2 justify-center items-center ">
      <div className="flex justify-center items-center text-xl font-bold mt-4 mb-4">
        Signup Form
      </div>
      <SignupForm />
    </div>
  );
}

export default App;
