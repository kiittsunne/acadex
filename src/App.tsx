import {
  useState,
  FormEvent,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import { Submission_Information } from "./assets/Accepted-Papers-20221027.json";
// import { Author_Names as authorOptions } from "./assets/author_names.json";
import { Tracks, SubType, AccStatus } from "./assets/filter_options.json";
import "./App.css";
import Card from "./components/Card";
import Modal from "./components/Modal";
import { MultiSelect } from "react-multi-select-component";

const styles = {
  wrapper: {
    display: "flex",
    flexDirection: "row",
  },
  searchbar: {
    display: "flex",
    flexDirection: "column",
    margin: "auto",
    width: "40vw",
    height: "100px",
    justifyContent: "space-between",
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
  Track: string;
  Submission_Type?: string;
  Acceptance_Status?: string;
  Abstract?: string;
  ARRLink?: string;
  cursor?: string;
  setModal?: Dispatch<SetStateAction<number>>;
};

// type authorDataProps = {
//   name: string;
//   papers: number;
//   subs: dataProps[];
// };

function App() {
  const [data, setData] = useState<dataProps[]>(Submission_Information);
  const [query, setQuery] = useState<string>("");
  const [filter, showFilter] = useState<boolean>(false);
  // const [selectedAuthors, setSelectedAuthors] = useState([]);
  const [selectedSubType, setSelectedSubType] = useState<any>([]);
  const [selectedAccStatus, setSelectedAccStatus] = useState<any>([]);
  const [selectedTrack, setSelectedTrack] = useState<any>([]);
  const [modal, setModal] = useState<number>(0);
  const [showSaved, setShowSaved] = useState<boolean>(false);
  let localStorage = JSON.parse(window.localStorage.getItem("saved") || "{}");

  function handleFilter() {
    let tracks: string[] = [];
    let types: string[] = [];
    let status: string[] = [];
    if (selectedTrack.length) {
      tracks = selectedTrack.map((el: { label: string; value: string }) => {
        return el.value;
      });
    }
    if (selectedSubType.length) {
      types = selectedSubType.map((el: { label: string; value: string }) => {
        return el.value;
      });
    }
    if (selectedAccStatus.length) {
      status = selectedAccStatus.map((el: { label: string; value: string }) => {
        return el.value;
      });
    }

    setData((prev) => {
      return prev.filter((el: dataProps) => {
        let hasTracks =
          el.Track && tracks.length ? tracks.includes(el.Track) : true;
        let hasTypes =
          el.Submission_Type && types.length
            ? types.includes(el.Submission_Type)
            : true;
        let hasStatus =
          el.Acceptance_Status && status.length
            ? status.includes(el.Acceptance_Status)
            : true;
        let result = hasTracks && hasTypes && hasStatus;
        return result;
      });
    });
  }

  useEffect(() => {
    setData(Submission_Information);
    handleFilter();
  }, [selectedTrack, selectedSubType, selectedAccStatus]);

  return (
    <div className="App">
      {/* Title/ home button */}
      <h1
        onClick={() => {
          setQuery("");
          setModal(0);
          setShowSaved(false);
          setData(Submission_Information);
          showFilter(false);
          setSelectedTrack([]);
          setSelectedSubType([]);
          setSelectedAccStatus([]);
        }}
        style={{ cursor: "pointer" }}
      >
        Acadex
      </h1>

      {/* Search input and button */}
      <div style={styles.searchbar}>
        <input
          type="text"
          value={query}
          style={{ alignSelf: "stretch", height: "35%", marginBottom: ".5em" }}
          onChange={(e: FormEvent<HTMLInputElement>) => {
            setQuery(e.currentTarget.value);
          }}
        />
        <div>
          <button
            style={{ margin: ".25em .5em", padding: ".5em" }}
            onClick={() => {
              query !== "" &&
                setData((prev) =>
                  prev.filter((sub: dataProps) => {
                    return sub.Title.toLowerCase().includes(
                      query.toLowerCase()
                    );
                  })
                );
            }}
          >
            Search Titles
          </button>
          <button
            style={{ margin: ".25em .5em", padding: ".5em" }}
            onClick={() => {
              query !== "" &&
                setData((prev) =>
                  prev.filter((sub: dataProps) => {
                    return sub.Authors.toLowerCase().includes(
                      query.toLowerCase()
                    );
                  })
                );
            }}
          >
            Search Authors
          </button>
        </div>
      </div>

      {/* Submissions printout, filter & saved button */}
      <div style={{ ...styles.wrapper, ...styles.controls }}>
        <p>{data.length} Submissions</p>
        <div>
          <button
            style={{ marginRight: "0.5em", padding: ".5em" }}
            onClick={() => {
              showFilter((prev) => !prev);
            }}
          >
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
            <i className="fa">&#xf097;</i>
            <span> {localStorage.length}</span>
          </button>
        </div>
      </div>

      {filter && (
        <div
          style={{
            width: "100%",
            margin: "auto",
            padding: "0 0 1em 0",
            border: "1px solid var(--dusk)",
            borderRadius: "4pt",
            textAlign: "left",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <div style={{ width: "300px", margin: ".75em" }}>
              <p style={{ margin: "0 0 0 0.5em" }}>Tracks:</p>
              <MultiSelect
                options={Tracks}
                value={selectedTrack}
                onChange={setSelectedTrack}
                labelledBy="Tracks"
              />
            </div>
            <div style={{ width: "150px", margin: ".75em" }}>
              <p style={{ margin: "0 0 0 0.5em" }}>Type:</p>
              <MultiSelect
                options={SubType}
                value={selectedSubType}
                onChange={setSelectedSubType}
                labelledBy="Submission Type"
              />
            </div>
            <div style={{ width: "150px", margin: ".75em" }}>
              <p style={{ margin: "0 0 0 0.5em" }}>Status:</p>
              <MultiSelect
                options={AccStatus}
                value={selectedAccStatus}
                onChange={setSelectedAccStatus}
                labelledBy="Acceptance Status"
              />
            </div>
          </div>
          <button
            style={{ width: "200px", margin: "auto" }}
            onClick={() => {
              handleFilter();
            }}
          >
            Filter
          </button>
        </div>
      )}

      {/* Modal  */}
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

      {/* Submission cards */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          width: "80vw",
          margin: "1em auto 0 auto",
          paddingBottom: "8em",
          justifyContent: "space-around",
        }}
      >
        {/* Show all cards */}
        {!showSaved &&
          data.map((sub: dataProps) => {
            let props = { ...sub, cursor: "pointer", setModal: setModal };
            return <Card key={sub.ID} {...props} />;
          })}

        {/* Show only saved cards */}
        {showSaved && localStorage.length !== 0 ? (
          localStorage.map((sub: dataProps) => {
            let props = { ...sub, cursor: "pointer", setModal: setModal };
            return <Card key={sub.ID} {...props} />;
          })
        ) : (
          <>{showSaved && query === "" && <p>No Saved Items</p>}</>
        )}
      </div>
    </div>
  );
}

export default App;
