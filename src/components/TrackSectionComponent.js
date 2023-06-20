import React, { useState } from 'react';
import Spinner from '../spinner/spinner'
import '../style/TrackSectionComponent.css';

function TrackSectionComponent() {
  const [ril100, setRil100] = useState('');
  const [trainNumber, setTrainNumber] = useState('');
  const [waggonNumber, setWaggonNumber] = useState('');
  const [trackSections, setTrackSections] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'ril100') {
      setRil100(value);
    } else if (name === 'trainNumber') {
      setTrainNumber(value);
    } else if (name === 'waggonNumber') {
      setWaggonNumber(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!ril100 || !trainNumber || !waggonNumber) {
      setError('Please fill in all fields.');
      setTrackSections('');
      return;
    }

    if (ril100.length < 2 || ril100.length > 5) {
      setError('Station shortcode must be between 2 and 5 characters.');
      setTrackSections('');
      return;
    }

    if (trainNumber.length < 2 || trainNumber.length > 4) {
      setError('Train number must be between 2 and 4 digits.');
      setTrackSections('');
      return;
    }

    if (waggonNumber.length < 1 || waggonNumber.length > 2) {
      setError('Waggon number must be between 1 and 2 digits.');
      setTrackSections('');
      return;
    }

    
    setIsLoading(true); // Set loading state to true before making the request

    // Make API request to retrieve track sections
    fetch(`http://localhost:8080/station/${ril100}/train/${trainNumber}/waggon/${waggonNumber}`)
    .then((response) => response.json())
    .then((data) => {
      setIsLoading(false);
      console.log(data.sections);

      if (data.error) {
        setError(data.error);
        setTrackSections([]);
      } else if (data.sections.length === 0) {
        setError('Sections that you are looking for are not found.');
        setTrackSections([]);
      } else {
        setTrackSections(data.sections);
        setError('');
      }
    })
      .catch((error) => {
        console.error('Error:', error);
        setIsLoading(false); // Set loading state to false if an error occurs
        setError('An error occurred while retrieving track section(s).');
        setTrackSections('');
      });
  };

  return (
    <div className="container">
      <h1>Track Section Finder</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Station:</label>
          <input type="text" name="ril100" value={ril100} placeholder='Enter the station shortcode' onChange={handleInputChange} />
        </div>
        <div>
          <label>Train Number:</label>
          <input type="number" name="trainNumber" value={trainNumber} placeholder='Enter the train number' onChange={handleInputChange} />
        </div>
        <div>
          <label>Waggon Number:</label>
          <input type="number" name="waggonNumber" value={waggonNumber} placeholder='Enter the waggon number' onChange={handleInputChange} />
        </div>
        <button type="submit">Get Track Section(s)</button>
      </form>
      {error && (
        <div className="error-box">
          <p className="error">Error: {error}</p>
        </div>
      )}
      {isLoading ? <Spinner /> : (
        trackSections.length > 0 && (
          <div className="track-section-box">
            <h2>Track Section(s):</h2>
            <p className="track-section-names">{trackSections.join(', ')}</p>
          </div>
        )
      )}
    </div>
  );
}

export default TrackSectionComponent;
