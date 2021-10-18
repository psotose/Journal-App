import React from 'react';

export const JournalEntry = () => {
  return (
    <div className="journal__entry pointer">
      <div 
        className="journal__entry-picture"
        style={{
          backgroundSize: 'cover',
          backgroundImage: 'url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSF3E_u8c-NaedJD8CFmYEFS73G8eFF4l5uaQ&usqp=CAU)'
        }}
      >
      </div>

      <div className="journal__entry-body">
        <p className="journal__entry-title"> Todo pasando</p>
        <p className="journal__entry-content"> Lorem ipsum dolor sit amet, consectetur adip</p>
      </div>

      <div className="journal__entry-date-box">
        <span>Monday</span>
        <h4>28</h4>
      </div>
    </div>
  )
}
