import React, { useEffect, useState } from "react";
import API from "../services/api";
import "./Analytics.css";

function Analytics() {
  const [avg, setAvg] = useState(0);
  const [slowest, setSlowest] = useState([]);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const avgRes = await API.get("logs/average-response/");
      setAvg(avgRes.data.avg_time || 0);

      const slowRes = await API.get("logs/slowest/");
      setSlowest(slowRes.data);

      const errRes = await API.get("logs/error-count/");
      setErrors(errRes.data);
    } catch (error) {
      console.error("Error fetching analytics:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="analytics-container">
      <h2 className="card-title">Analytics</h2>
      
      {loading ? (
        <div className="loading">Loading analytics...</div>
      ) : (
        <div className="analytics-grid">
          <div className="stat-card">
            <div className="stat-content">
              <h3 className="stat-label">Avg Response Time</h3>
              <p className="stat-value">{avg ? avg.toFixed(2) : '0'} <span className="stat-unit">ms</span></p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-content">
              <h3 className="stat-label">Slowest Requests</h3>
              {slowest.length === 0 ? (
                <p className="stat-empty">No data</p>
              ) : (
                <ul className="stat-list">
                  {slowest.slice(0, 5).map((log, i) => (
                    <li key={i} className="stat-item">
                      <span className="item-name">{log.service_name}</span>
                      <span className="item-value">{log.response_time} ms</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-content">
              <h3 className="stat-label">Error Count</h3>
              {errors.length === 0 ? (
                <p className="stat-empty">No errors</p>
              ) : (
                <ul className="stat-list">
                  {errors.map((e, i) => (
                    <li key={i} className="stat-item">
                      <span className="item-name">{e.service_name}</span>
                      <span className="item-value error-count">{e.error_count}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Analytics;
