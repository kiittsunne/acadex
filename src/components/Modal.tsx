import React, { useState, useEffect } from "react";
import { dataProps } from "../App";
import Card from "./Card";

const Modal = (props: dataProps) => {
  const [saved, setSaved] = useState("black");
  useEffect(() => {
    let storage = window.localStorage.getItem("saved");
    let data;
    storage ? (data = JSON.parse(storage)) : (data = []);
    let exist = data.filter((item: dataProps) => {
      return item.ID === props.ID;
    });
    exist.length !== 0 && setSaved("red");
  }, []);
  return (
    <div
      style={{
        width: "600px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        margin: "auto",
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%)",
        zIndex: "1000",
        backgroundColor: "white",
        borderRadius: "4pt",
        boxSizing: "border-box",
        padding: ".5em 2em 1.5em 2em",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          boxSizing: "border-box",
          padding: "0 1em",
        }}
      >
        <p>
          #{props.ID}
          {props.ARRLink && (
            <a href={props.ARRLink}>
              <i
                className="fa fa-external-link"
                aria-hidden="true"
                style={{
                  marginLeft: "0.25em",
                  color: "var(--nude)",
                  cursor: "pointer",
                }}
              ></i>
            </a>
          )}
        </p>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          {/* <p style={{ marginRight: "1em", cursor: "pointer" }}>
            <i className="fa fa-share" aria-hidden="true"></i>
          </p> */}
          <p
            style={{ marginRight: "1em", cursor: "pointer" }}
            onClick={() => {
              let storage = window.localStorage.getItem("saved");
              let data;
              storage ? (data = JSON.parse(storage)) : (data = []);

              if (saved === "black") {
                data.push(props);
                window.localStorage.setItem("saved", JSON.stringify(data));
                setSaved("red");
              } else if (saved === "red") {
                let newData = data.filter((item: dataProps) => {
                  return item.ID !== props.ID;
                });
                window.localStorage.setItem("saved", JSON.stringify(newData));
                setSaved("black");
              }
            }}
          >
            <i className="fa" style={{ color: `${saved}` }}>
              &#xf097;
            </i>
          </p>
          <p
            style={{ fontSize: "18pt", cursor: "pointer" }}
            onClick={() => {
              props.setModal && props.setModal(0);
            }}
          >
            &times;
          </p>
        </div>
      </div>
      <Card {...props} />
      <div style={{ textAlign: "start" }}>
        {props.Abstract ? <p>{props.Abstract}</p> : <p>No Abstract</p>}
      </div>
    </div>
  );
};

export default Modal;
