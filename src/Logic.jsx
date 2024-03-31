import './App.css';
import React, { useState } from 'react';

const Logic = () => {
    const [videos, setVideos] = useState([]);
    const [bookmarkedList, setBookmarkedList] = useState([]);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [showBookmarked, setShowBookmarked] = useState(false);
  
    const handleAddVideo = (event) => {
      const file = event.target.files[0];
      if (!file || !file.type.startsWith('video/')) {
        alert('Please select a valid video file.');
        return;
      }
  
      const newVideo = {
        name: file.name,
        url: URL.createObjectURL(file)
      };
  
      setVideos([...videos, newVideo]);
    };
  
    const handleVideoClick = (video) => {
      setSelectedVideo(video);
    };
  
    const handleBookmarkToggle = (video) => {
      const isBookmarked = bookmarkedList.some((v) => v.name === video.name);
  
      if (isBookmarked) {
        const updatedList = bookmarkedList.filter((v) => v.name !== video.name);
        setBookmarkedList(updatedList);
      } else {
        setBookmarkedList([...bookmarkedList, video]);
      }
    };
  
    const handleFilterToggle = () => {
      setShowBookmarked(!showBookmarked);
    };
  
    const handleCloseVideo = () => {
      setSelectedVideo(null);
    };
  
    return (
      <div className="container">
        <h1>{showBookmarked ? 'Bookmarked Videos' : 'Video Library'}</h1>
        {!showBookmarked && (
          <div>
            <input type="file" onChange={handleAddVideo} id="uploadInput" style={{ display: 'none' }} accept="video/*" />
            <label htmlFor="uploadInput" className="upload-btn">Upload Video</label>
          </div>
        )}
        <div style={{ marginTop: '20px' }}>
          <button className='btn-1' onClick={handleFilterToggle}>
            {showBookmarked ? 'Show Less' : 'Show Bookmarked'}
          </button>
        </div>
        
        <div className="video-list" style={{ display: 'flex', flexWrap: 'wrap' }}>
          {(showBookmarked ? bookmarkedList : videos).map((video, index) => (
            <div className="video-item" key={index} style={{ marginRight: '20px', marginBottom: '20px' }}>
              <p>{video.name}</p>
              <button onClick={() => handleVideoClick(video)}>Play</button>
              <button
                className={bookmarkedList.some((v) => v.name === video.name) ? "bookmark-btn bookmarked" : "bookmark-btn"}
                onClick={() => handleBookmarkToggle(video)}
              >
                {bookmarkedList.some((v) => v.name === video.name)
                  ? 'Unbookmark'
                  : 'Bookmark'}
              </button>
            </div>
          ))}
        </div>
        {selectedVideo && (
          <div className="video-popup">
            <div className="video-player">
              <video src={selectedVideo.url} controls autoPlay />
              <button className="close-btn" onClick={handleCloseVideo}>X</button>
            </div>
          </div>
        )}
      </div>
    );
}

export default Logic;
