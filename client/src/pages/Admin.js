import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Admin() {
  const [applicants, setApplicants] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/applicants')
      .then(res => setApplicants(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div>
      <h2>Admin View: All Applicants</h2>
      <ul>
        {applicants.map((a, i) => (
          <li key={i}>
            {a.name} | {a.email} | {a.phone} | {a.role}
          </li>
        ))}
      </ul>
    </div>
  );
}
