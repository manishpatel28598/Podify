import React from 'react'
import Button from '../components/Button'
import "../index.css"

function EpisodeDetails({ index, title, description, audioFile, onClick }) {
  return (
    <>
    <div style={{ width: "100%" }}>
    <h1 style={{ textAlign: "left", marginBottom: 0 }}>
      {index}. {title}
    </h1>
    <p style={{ marginLeft: "1.5rem" }} className="podcast-description ">
      {description}
    </p>
  </div>
  <div style={{ width: "10%" }}>
    <Button className="play-btn"
      text={"Play"}
      onClick={() => onClick(audioFile)}
      width = "100px"
    />

  </div>
    </>
  )
}

export default EpisodeDetails
