import React, { useContext} from 'react'
import { CampaignContext } from '../Context/CampaignContext';

const availableFields = [
  { label: "Spent Amount", value: "spentAmount" },
  { label: "Inctive Days", value: "inactiveDays" },
  { label: "Age", value: "age" },
  { label: "Location", value: "location" },
];

const operators = [
  { label: ">", value: ">" },
  { label: "<", value: "<" },
  { label: "=", value: "=" },
  { label: ">=", value: ">=" },
  { label: "<=", value: "<=" },
];

function RuleBuilder() {
  const {setRules,rules} = useContext(CampaignContext);
  
  const addRule = () => {
    setRules([...rules, { id: rules.length + 1, field: "spentAmount", operator: ">", value: "0", logic: "AND" }]);
  };

  // Remove a rule
  const removeRule = (id) => {
    setRules(rules.filter((rule) => rule.id !== id));
  };

  // Handle rule updates
  const updateRule = (id, key, value) => {
    setRules(rules.map((rule) => (rule.id === id ? { ...rule, [key]: value } : rule)));
  };

  return (
    <div className="container-fluid mt-4">

      {/* Dynamic Rules */}
      {rules.map((rule, index) => (
        <div key={rule.id} className="card p-3 mb-3">
          {/* Logical Operator (Only shown after the first rule) */}

          <div className="row">
           
            <div className="col-md-3">
              <select
                className="form-select"
                value={rule.field}
                onChange={(e) => updateRule(rule.id, "field", e.target.value)}
              >
                {availableFields.map((field) => {
                  return <option value={field.value} key={field.value}>{field.label}</option>
                })}
             
              </select>
            </div>

            <div className="col-md-2">
              <select
                className="form-select"
                value={rule.operator}
                onChange={(e) => updateRule(rule.id, "operator", e.target.value)}
              >
                {operators.map((op)=>{
                  return <option value={op.value} key={op.value}>{op.label}</option>
                })}
               
              </select>
            </div>

            <div className="col-md-3">
              <input
                type="number"
                className="form-control"
                value={rule.value}
                onChange={(e) => updateRule(rule.id, "value", e.target.value)}
              />
            </div>
            <div className="col-md-2">
          {index > 0 && (
            <select
              className="form-select mb-2"
              value={rule.logic}
              onChange={(e) => updateRule(rule.id, "logic", e.target.value)}
            >
              <option value="AND">AND</option>
              <option value="OR">OR</option>
            </select>
          )}
            </div>
            <div className="col-md-2">
              <button className="btn btn-danger" onClick={() => removeRule(rule.id)}>❌ Remove</button>
            </div>
          </div>
        </div>
      ))}

      <button className="btn btn-primary" onClick={addRule}>➕ Add Rule</button>

      {/* Display rule logic */}
      <div className="mt-4">
        <h3>Generated Rule:</h3>
        <p className="border p-3 bg-dark">
          {rules.map((rule, index) => (
            <span key={rule.id}>
              {index > 0 && ` ${rule.logic} `}
              {rule.field} {rule.operator} {rule.value}
            </span>
          ))}
        </p>
      </div>
    </div>

  )
}

export default RuleBuilder
