import React from "react";
import Table from "./components/Table/Table";
import "./App.css"; // Import global styles or layout-specific styles here

const App: React.FC = () => {
  return (
    <div className="App">
      <main>
        <Table />
      </main>
    </div>
  );
};

export default App;
