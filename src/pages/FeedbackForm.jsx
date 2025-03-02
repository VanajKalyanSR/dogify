import React, { useState } from 'react';
import './FeedbackForm.css';

const FeedbackForm = () => {
  const [feedback, setFeedback] = useState({
    accuracy: '',
    easeOfUse: '',
    overallExperience: '',
    comments: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFeedback({ ...feedback, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Feedback submitted:', feedback);
    setSubmitted(true);
    // Add logic to handle feedback submission (e.g., send to server)
  };

  return (
    <div className="feedback-form">
      <h1>Feedback Form</h1>
      {submitted ? (
        <p>Thank you for your response!</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>How accurate was the breed classification?</label>
            <div>
              <label>
                <input type="radio" name="accuracy" value="Very Accurate" onChange={handleChange} />
                Very Accurate
              </label>
              <label>
                <input type="radio" name="accuracy" value="Somewhat Accurate" onChange={handleChange} />
                Somewhat Accurate
              </label>
              <label>
                <input type="radio" name="accuracy" value="Not Accurate" onChange={handleChange} />
                Not Accurate
              </label>
            </div>
          </div>
          <div className="form-group">
            <label>How easy was it to use the classifier?</label>
            <div>
              <label>
                <input type="radio" name="easeOfUse" value="Very Easy" onChange={handleChange} />
                Very Easy
              </label>
              <label>
                <input type="radio" name="easeOfUse" value="Somewhat Easy" onChange={handleChange} />
                Somewhat Easy
              </label>
              <label>
                <input type="radio" name="easeOfUse" value="Not Easy" onChange={handleChange} />
                Not Easy
              </label>
            </div>
          </div>
          <div className="form-group">
            <label>Overall experience with the classifier</label>
            <div>
              <label>
                <input type="radio" name="overallExperience" value="Excellent" onChange={handleChange} />
                Excellent
              </label>
              <label>
                <input type="radio" name="overallExperience" value="Good" onChange={handleChange} />
                Good
              </label>
              <label>
                <input type="radio" name="overallExperience" value="Poor" onChange={handleChange} />
                Poor
              </label>
            </div>
          </div>
          <div className="form-group">
            <label>Additional comments</label>
            <textarea name="comments" value={feedback.comments} onChange={handleChange}></textarea>
          </div>
          <button type="submit">Submit Feedback</button>
        </form>
      )}
    </div>
  );
};

export default FeedbackForm;
