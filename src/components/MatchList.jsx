import React, { useEffect, useState } from 'react';
import Classmate from '../models/Classmates';

function MatchList({ currentUser }) {
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    // Replace with your Flask backend URL if using API
    // For now, simulate with mock data
    const data = [
      new Classmate("Jordan A.", ["CS310", "CS482"], ["Gaming"]),
      new Classmate("Taylor B.", ["CS310", "MATH110"], ["Music", "Gaming"]),
      new Classmate("Sam C.", ["CS101"], ["Photography"]),
    ];
    setProfiles(data);
  }, []);

  return (
    <div>
      <h2>MatchList Component Loaded</h2>
      <ul>
        {profiles.map((p, i) => (
          <li key={i}>
            <strong>{p.name}</strong><br />
            {currentUser && (
              <p>
                Shared Courses with YOU: {p.getSharedCourses(currentUser).join(', ')}
              </p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MatchList;
