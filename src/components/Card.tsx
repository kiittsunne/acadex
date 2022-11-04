import React, { useState } from "react";
import { dataProps } from "../App";

const metaTags = {
  fontSize: "9pt",
  fontWeight: "bold",
  border: "1px solid white",
  borderRadius: "10pt",
  boxSizing: "border-box",
  padding: "0.25em 0.5em",
  margin: "0.5em 0.5em 0 0",
} as const;

const subTypes: any = {
  "Regular Long Paper": { backgroundColor: "var(--dusk)", color: "white" },
  "Regular Short Paper": { backgroundColor: "var(--night)", color: "white" },
  "ARR - Long Paper": { backgroundColor: "var(--tissue)", color: "black" },
  "ARR - Short Paper": { backgroundColor: "var(--mushroom)", color: "black" },
};

const accType: any = {
  "Accept-Conditional-Findings": { backgroundColor: "var(--orange)" },
  "Accept-Conditional-Oral": { backgroundColor: "var(--mint)" },
  "Accept-Conditional-Poster": { backgroundColor: "var(--rose)" },
  "Accept-Findings": { backgroundColor: "var(--light-orange)" },
  "Accept-Oral": { backgroundColor: "var(--light-mint)" },
  "Accept-Poster": { backgroundColor: "var(--light-rose)" },
};

const Card = ({
  ID,
  Title,
  Authors,
  Track,
  Submission_Type,
  Acceptance_Status,
  Abstract,
  ARRLink,
  cursor,
  setModal,
}: dataProps) => {
  const [borderColor, setBorderColor] = useState("--pale-grey");
  return (
    <div
      style={{
        minWidth: "500px",
        width: "35vw",
        maxWidth: "650px",
        marginBottom: "0.75em",
        border: `1px solid var(${borderColor})`,
        boxSizing: "border-box",
        padding: ".75em",
        borderRadius: "4pt",
        cursor: `${cursor}`,
      }}
      onMouseEnter={() => {
        cursor === "pointer" && setBorderColor("--night");
      }}
      onMouseLeave={() => {
        cursor === "pointer" && setBorderColor("--pale-grey");
      }}
      onClick={() => {
        setModal && setModal(ID);
      }}
    >
      <div>
        <h2 style={{ fontSize: "12pt", margin: ".5em 0", textAlign: "left" }}>
          {Title}
        </h2>
        <h3
          style={{
            fontSize: "12pt",
            fontWeight: "lighter",
            margin: "0",
            textAlign: "left",
          }}
        >
          {Authors}
        </h3>
      </div>
      <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
        <div
          style={{
            ...metaTags,
            backgroundColor: "var(--dusky)",
            color: "white",
          }}
        >
          {Track}
        </div>
        <div style={{ ...metaTags, ...subTypes[`${Submission_Type}`] }}>
          {Submission_Type}
        </div>
        <div style={{ ...metaTags, ...accType[`${Acceptance_Status}`] }}>
          {Acceptance_Status}
        </div>
      </div>
    </div>
  );
};

export default Card;

/**
 * notes for styling
 * 4 submission types (regular long, regular short, arr long, arr short)
 * 6 acceptance status (accept-conditional-findings, accept-conditional-oral, accept-conditional-poster, accept-findings, accept-oral, accept-poster)
 * 177 have arr link
 * not all have abstract
 */
