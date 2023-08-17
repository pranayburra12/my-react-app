import React from "react";
import CreditMantri from "../../assets/cibil_score/CreditMantri.png";
import BajajFinserv from "../../assets/cibil_score/BajajFinserv.png";
import BB from "../../assets/cibil_score/pp.png";
import CibilScoreArrow from "../../assets/cibil_score/CibilScore-arrow.svg";
import "./CibilScore.css";

const CibilScore = () => {
  return (
    <div className="cibil_score_container component">
      {/* Sidebar */}
      {/* <div className="cibil_score_main">
        <h3>Check your</h3>
        <h1>CIBIL Score</h1>
        <div className="cibilScore_box"></div>
      </div>
      <div className="cibil_score_partners">
        <div className="cibil_score_partners_heading">
          <h4>Our Partners</h4>
          <h6>Select Below</h6>
        </div>
        <div className="cibil_score_partners_name">
          <div className="parnters__name-cibil partners_credit_mantri">
            <img src={CreditMantri} alt="Credit-Mantri" />
            <img src={CibilScoreArrow} alt="arrow" />
          </div>
          <div className="parnters__name-cibil partners_bajaj_finserv">
            <img src={BajajFinserv} alt="bajaj-finserv" />
            <img src={CibilScoreArrow} alt="arrow" />
          </div>
          <div className="parnters__name-cibil partners_pppppp_pppppp">
            <img src={BB} alt="bb" />
            <img src={CibilScoreArrow} alt="arrow" />
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default CibilScore;
