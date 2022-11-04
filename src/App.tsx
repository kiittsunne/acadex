import { useState, FormEvent, Dispatch, SetStateAction } from "react";
import { Submission_Information as data } from "./assets/Accepted-Papers-20221027.json";
import "./App.css";
import Card from "./components/Card";
import Modal from "./components/Modal";

const styles = {
  wrapper: {
    display: "flex",
    flexDirection: "row",
  },
  searchbar: {
    margin: "auto",
    width: "40vw",
    height: "40px",
    justifyContent: "center",
    alignItems: "center",
  },
  controls: {
    width: "80vw",
    justifyContent: "space-between",
    margin: "1.5em auto 0 auto",
  },
} as const;

export type dataProps = {
  ID: number;
  Title: string;
  Authors: string;
  Track?: string;
  Submission_Type?: string;
  Acceptance_Status?: string;
  Abstract?: string;
  ARRLink?: string;
  cursor?: string;
  setModal?: Dispatch<SetStateAction<number>>;
};

function App() {
  const [query, setQuery] = useState<string>("");
  const [modal, setModal] = useState<number>(0);
  const [showSaved, setShowSaved] = useState<boolean>(false);
  let localStorage = JSON.parse(window.localStorage.getItem("saved") || "{}");

  return (
    <div className="App">
      <h1>Acadex</h1>
      <div style={{ ...styles.wrapper, ...styles.searchbar }}>
        <input
          type="text"
          value={query}
          style={{ alignSelf: "stretch", width: "300px" }}
          onChange={(e: FormEvent<HTMLInputElement>) => {
            setQuery(e.currentTarget.value);
          }}
        />
        <button style={{ marginLeft: "0.5em" }}>Search</button>
      </div>
      <div style={{ ...styles.wrapper, ...styles.controls }}>
        <p>{data.length} Submissions</p>
        <div>
          <button style={{ marginRight: "0.5em", padding: ".5em" }}>
            Sort
          </button>
          <button style={{ marginRight: "0.5em", padding: ".5em" }}>
            Filter
          </button>
          <button
            onClick={() => {
              setShowSaved((prev) => !prev);
            }}
            style={
              showSaved
                ? { backgroundColor: "red", color: "#f9f9f9", padding: ".5em" }
                : { backgroundColor: "#f9f9f9", color: "red", padding: ".5em" }
            }
          >
            <i className="fa">&#xf097; {localStorage.length}</i>
          </button>
        </div>
      </div>
      <div>
        {modal > 0 &&
          data
            .filter((entry: dataProps) => {
              return entry.ID === modal;
            })
            .map((sub: dataProps) => {
              let props = { ...sub, cursor: "default", setModal: setModal };
              return (
                <div>
                  <Modal key={sub.ID} {...props} />
                  <div
                    style={{
                      backgroundColor: "var(--night)",
                      opacity: "0.45",
                      height: "500%",
                      width: "100%",
                      position: "fixed",
                      top: "0",
                      left: "0",
                      zIndex: "500",
                    }}
                    onClick={() => {
                      setModal(0);
                    }}
                  ></div>
                </div>
              );
            })}
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          width: "80vw",
          margin: "1em auto 0 auto",
          justifyContent: "space-around",
        }}
      >
        {!showSaved &&
          data &&
          data.map((sub: dataProps) => {
            let props = { ...sub, cursor: "pointer", setModal: setModal };
            return <Card key={sub.ID} {...props} />;
          })}
        {showSaved && localStorage.length !== 0 ? (
          localStorage.map((sub: dataProps) => {
            let props = { ...sub, cursor: "pointer", setModal: setModal };
            return <Card key={sub.ID} {...props} />;
          })
        ) : (
          <p>No Saved Items</p>
        )}
      </div>
    </div>
  );
}

export default App;
