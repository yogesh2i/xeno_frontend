import React, { createContext, useState } from "react";

// Create the context
export const CampaignContext = createContext();

// Create the provider
export const CampaignContextProvider = ({ children }) => {
  // Shared states
  const [audienceName, setAudienceName] = useState("");
  const [rules, setRules] = useState([
    { id: 1, field: "spentAmount", operator: ">", value: "0", logic: "AND" },
  ]);
  const [audienceSize, setAudienceSize] = useState(0);
  const [campaignName, setCampaignName] = useState("");
  const [campaigns, setCampaigns] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [isCreatingCampaign, setIsCreatingCampaign] = useState(false);


  const contextValue = {
    audienceName,
    setAudienceName,
    rules,
    setRules,
    audienceSize,
    setAudienceSize,
    campaignName,
    setCampaignName,
    campaigns,
    setCampaigns,
    showHistory,
    setShowHistory,
    isCreatingCampaign,
    setIsCreatingCampaign,
  };

  return <CampaignContext.Provider value={contextValue}>{children}</CampaignContext.Provider>;
};