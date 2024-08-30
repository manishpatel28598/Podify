import React from 'react'
import Header from '../components/Header'
import CreatePodcastForm from '../components/StartAPodcast/CreatePodcastForm'

function CreateAPodcastPage() {
  return (
      <div>
        <Header/>
        <div className="input-wrapper">
            <h3>Create A Podcast</h3>
            <CreatePodcastForm/>

        </div>
    </div>
  )
}

export default CreateAPodcastPage
