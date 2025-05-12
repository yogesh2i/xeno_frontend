import React, { useEffect, useContext } from "react";
import "../App.scss";
import CampaignHistory from "./CampaignHistory";
import { CampaignContext } from "../Context/CampaignContext";
import RuleBuilder from "./RuleBuilder";
import { fetchData } from "../utils/fetchFunction";

const mockAudienceSize = async (rules) => {
  let result = await fetchData("/customers/filter", {
    method: "POST",
    body: JSON.stringify(rules),
  });
  return result.audienceSize;
};

const styles = {
  title: {
    color: "#45e5e9",
  },
  campaignBox: {
    backgroundColor: "rgb(82 10 134 / 60%)",
    color: "#fff",
  },
  btn: {
    background:
      "linear-gradient(to bottom, rgba(106, 13, 173, 0.3), rgba(75, 0, 130, 0.4))",
    backdropFilter: "blur(12px)",
  },
};

const CampaignHome = () => {
  const {
    audienceName,
    setAudienceName,
    rules,
    setRules,
    audienceSize,
    setAudienceSize,
    campaignName,
    setCampaignName,
    showHistory,
    setShowHistory,
    isCreatingCampaign,
    setIsCreatingCampaign,
  } = useContext(CampaignContext);


  useEffect(() => {
    const fetchAudienceSize = async () => {
      const size = await mockAudienceSize(rules);
      setAudienceSize(size);
    };
    fetchAudienceSize();
  }, [rules]);




  const createCampaign = async () => {
    if (!audienceName.trim() || rules.length === 0 || !campaignName.trim()) {
      alert("Please fill in all fields and add at least one rule.");
      return;
    }

    setIsCreatingCampaign(true);

    const newCampaign = {
      name: campaignName,
      segmentName: audienceName,
      rules: rules,
    };
    try {
      await fetchData("/campaign", {
        method: "POST",
        body: JSON.stringify(newCampaign),
      });
      setAudienceName("");
      setRules([{ field: "spend", operator: ">", value: "", logic: "AND" }]);
      setCampaignName("");
      setIsCreatingCampaign(false);
      setShowHistory(true);
    } catch (error) {
      alert("Failed to create campaign. Please try again.");
      setIsCreatingCampaign(false);
    }
  };

  return (
    <div className="app-container">
      <div className="content">
        <h1 className="title" style={{ ...styles.title }}>
          Campaign Creation
        </h1>

        {!showHistory ? (
          <div className="card" style={{ ...styles.campaignBox }}>
            <div className="card-header" style={{ ...styles.btn }}>
              <h5>Define Audience Segment</h5>
            </div>
            <div className="card-body">
              <input
                type="text"
                className="input"
                placeholder="Audience Segment Name"
                value={audienceName}
                onChange={(e) => setAudienceName(e.target.value)}
              />

                <RuleBuilder  />
              

              <div className="audience-size">
                Estimated Audience Size: <strong>{audienceSize}</strong>
              </div>

              <input
                type="text"
                className="input"
                placeholder="Campaign Name"
                value={campaignName}
                onChange={(e) => setCampaignName(e.target.value)}
              />

              <button
                className="create-btn"
                onClick={createCampaign}
                disabled={isCreatingCampaign}
                style={{ ...styles.btn }}
              >
                {isCreatingCampaign
                  ? "Creating Campaign..."
                  : "Create Campaign"}
              </button>

              <button
                className="history-btn"
                onClick={() => setShowHistory(true)}
                style={{ ...styles.btn }}
              >
                View Campaign History
              </button>
            </div>
          </div>
        ) : (
          <CampaignHistory />
        )}
      </div>
    </div>
  );
};

export default CampaignHome;
