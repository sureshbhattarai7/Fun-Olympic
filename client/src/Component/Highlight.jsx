import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Col, Row } from "antd";
// import "./Styling.scss";
import ReactPlayer from "react-player";

const { Meta } = Card;

const Highlight = () => {
  const [highlightsApi, sethighlightsApi] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  const highlightsFunction = async () => {
    const response = await axios.get(
      "http://localhost:3000/sports/highlights"
    );
    return response;
  };

  useEffect(() => {
    highlightsFunction().then((res) => {
      sethighlightsApi(res.data);
    });
  }, []);
  console.log(highlightsApi);

  const playerConfig = {
    youtube: {
      playerVars: {
        disablekb: 1, // Disables keyboard controls
        iv_load_policy: 3, // Removes annotations
        iv_load_policy: 3,
        modestbranding: 1, // Removes YouTube logo
        showinfo: 0,
      },
    },
  };

  const handlePlayerClick = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <h2 style={{ textAlign: "center", margin: "1rem" }}>
        Trending Highlights
      </h2>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {highlightsApi.data?.map((cl) => {
          return (
            <div key={cl.id} st>
              <Card
                style={{
                  width: 450,
                  height: 550,
                  margin: " 1rem 1rem 1rem 1rem",
                  paddingLeft: "1rem",
                  textAlign: "justify",
                }}
                hoverable
              >
                <ReactPlayer
                  url={cl.videoUrl}
                  config={playerConfig}
                  width={"400px"}
                  controls={true}
                  onClick={handlePlayerClick}
                />
                <Meta title={cl.title} description={cl.description} />
              </Card>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Highlight;
