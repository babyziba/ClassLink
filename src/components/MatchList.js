import React from 'react'; 

//creates a component called MatchList takes profiles passed into it 
function MatchList({ profiles }) {
    //everything in the reutn is shown on the screen
    return (
        <div>
            {/* header */}
            <h2>Your Matches</h2>
            <ul>
                {/* profiles is a "map", 
                aka list of people with p being 
                the current person at index i */}
                {profiles.map((p, i) => (
                    <li key = {i}>
                        {/* for index i, shows person's name 
                        and joins each course with a , same with interests*/}
                        <strong>{p.name}</strong><br />
                        courses: {p.courses.join(',')}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default MatchList; 