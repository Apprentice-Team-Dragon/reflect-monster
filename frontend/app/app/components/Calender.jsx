"use client"
import React, { useState, useEffect } from 'react';

export default function Calendar() {
  const [currentDate] = useState(new Date());


  return (
    <div className="calendar-container">
      <div className="calendar-contents">
        <img src="img/Calendar.png" alt="カレンダー" />
        <div className="calendar-date">{currentDate.toISOString().split('T')[0]}</div>
      </div>
    </div>
  );
}