import React, { useContext, useEffect, useState } from "react";
import { CampaignContext } from "../Context/CampaignContext";
import { fetchData } from "../utils/fetchFunction";

const styles = {
  historyContainer: {
    backgroundColor: "#6a0dad",
    color: "#fff",
  },
  badge: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    backgroundColor: 'rgba(255, 215, 0, 0.8)',
    color: '#000',
    padding: '6px 12px',
    borderRadius: '8px',
    boxShadow: '0px 3px 5px rgba(0,0,0,0.2)',
  },
  listBox: {
    backgroundColor: "#8a2be2",
    color: "#fff",
    background:
      "linear-gradient(to bottom, rgba(106, 13, 173, 0.3), rgba(75, 0, 130, 0.4))",
    backdropFilter: "blur(12px)",
  },
  statDiv: {
    display: "flex",
    justifyContent: "space-between",
    gap: "5rem",
  },
  statBox: {
    width: "100%", 
    height: "4rem", 
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "8px",
    backdropFilter: "blur(10px)",
  },
  sent: {
    background: "rgb(118 180 118 / 34%)",
    border: "1px solid green",
    color: "#00ff00",
  },
  failed: {
    background: "rgb(133 128 128 / 30%)",
    border: "1px solid red",
    color: "#ff0505",
  }, 
  reach: {
    background: "rgb(141 141 213 / 40%)",
    border: "1px solid blue",
    color: "#8f8ffc",
  }, 
};

const CampaignHistory = () => {
  const [campaigns, setCampaigns] = useState([]);
  const { setShowHistory } = useContext(CampaignContext);
  useEffect(() => {
    fetchData("/campaign").then((result) => {
      setCampaigns(result);
    });
  }, []);

  const formatDate = (date) => {
    let newDate = new Date(date);
    return newDate.toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="card mt-4" style={styles.historyContainer}>
      <div className="card-body">
        <h5 className="card-title">Campaign History</h5>
        <p className="card-text">List of past campaigns and delivery stats.</p>
        {campaigns.length === 0 ? (
          <h2>No campaign added</h2>
        ) : (
          campaigns.map((campaign) => (
            <div className="card mt-3" style={styles.listBox}>
              {campaign.tag && <div style={styles.badge}>{campaign.tag}</div>}

              <div className="card-body">
                <h5 className="card-title">
                
                  <strong>{campaign.name}</strong>
                </h5>
                <p className="card-text">
                  Segment: <strong>{campaign.segmentName}</strong>
                </p>
                <p className="card-text">
                  Audience Size: <strong>{campaign.audienceSize}</strong>
                </p>

                <div style={styles.statDiv}>
                  <div style={{ ...styles.statBox, ...styles.sent }}>
                    Sent: {campaign.sent} ✅
                  </div>
                  <div style={{ ...styles.statBox, ...styles.failed }}>
                    Failed: {campaign.failed} ❌
                  </div>
                  <div style={{ ...styles.statBox, ...styles.reach }}>
                    Reach:{" "}
                    {(
                      (campaign.sent / (campaign.sent + campaign.failed)) *
                      100
                    ).toFixed(2)}
                    % 👥
                  </div>
                </div>

                <p className="card-text mt-3">
                  Created: <strong>
                    {formatDate(campaign.createdAt)}
                  </strong>{" "}
                </p>
              </div>
            </div>
          ))
        )}
        <div className="text-center mt-3">
          <button
            className="btn btn-secondary"
            onClick={() => setShowHistory(false)}
          >
            ← Back to Creation
          </button>
        </div>
      </div>
    </div>
  );
};

export default CampaignHistory;
