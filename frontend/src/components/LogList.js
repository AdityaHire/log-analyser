import React, { useEffect, useState } from "react";
import API from "../services/api";
import "./LogList.css";

function LogList() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const res = await API.get("logs/");
      setLogs(res.data);
    } catch (error) {
      console.error("Error fetching logs:", error);
    } finally {
      setLoading(false);
    }
  };

  const getLevelClass = (level) => {
    return `level-badge level-${level.toLowerCase()}`;
  };

  return (
    <div className="log-list-card">
      <div className="card-header">
        <h2 className="card-title">Recent Logs</h2>
        <button onClick={fetchLogs} className="btn-refresh">
          Refresh
        </button>
      </div>

      {loading ? (
        <div className="loading">Loading logs...</div>
      ) : logs.length === 0 ? (
        <div className="empty-state">No logs found. Add your first log above!</div>
      ) : (
        <div className="log-table-container">
          <table className="log-table">
            <thead>
              <tr>
                <th>Service</th>
                <th>Level</th>
                <th>Response Time</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tr key={log.id} className="log-row">
                  <td className="service-cell">{log.service_name}</td>
                  <td>
                    <span className={getLevelClass(log.log_level)}>
                      {log.log_level}
                    </span>
                  </td>
                  <td className="time-cell">{log.response_time} ms</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default LogList;
