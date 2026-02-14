import React from "react";
import AddLog from "./components/AddLog";
import LogList from "./components/LogList";
import Analytics from "./components/Analytics";
import "./App.css";

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">Log Analyzer</h1>
        <p className="app-subtitle">Monitor and analyze your service logs</p>
      </header>

      <main className="app-main">
        <AddLog />
        <Analytics />
        <LogList />
      </main>
    </div>
  );
}

export default App;
