import React, { useState } from "react";
import API from "../services/api";
import "./AddLog.css";

function AddLog() {
  const [service_name, setService] = useState("");
  const [log_level, setLevel] = useState("INFO");
  const [response_time, setTime] = useState("");
  const [loading, setLoading] = useState(false);

  const submitLog = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await API.post("logs/", {
        service_name,
        log_level,
        response_time,
      });

      setService("");
      setTime("");
      
      // Show success feedback
      const btn = e.target.querySelector('button');
      btn.textContent = "✓ Added!";
      setTimeout(() => {
        btn.textContent = "Add Log";
      }, 2000);
    } catch (error) {
      alert("Error adding log");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-log-card">
      <h2 className="card-title">Add New Log</h2>

      <form onSubmit={submitLog} className="log-form">
        <div className="form-group">
          <label>Service Name</label>
          <input
            type="text"
            placeholder="e.g., authentication-service"
            value={service_name}
            onChange={(e) => setService(e.target.value)}
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label>Log Level</label>
          <select 
            value={log_level} 
            onChange={(e) => setLevel(e.target.value)}
            className="form-select"
          >
            <option value="INFO">INFO</option>
            <option value="WARNING">WARNING</option>
            <option value="ERROR">ERROR</option>
          </select>
        </div>

        <div className="form-group">
          <label>Response Time (ms)</label>
          <input
            type="number"
            placeholder="e.g., 250"
            value={response_time}
            onChange={(e) => setTime(e.target.value)}
            required
            className="form-input"
          />
        </div>

        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? "Adding..." : "Add Log"}
        </button>
      </form>
    </div>
  );
}

export default AddLog;
