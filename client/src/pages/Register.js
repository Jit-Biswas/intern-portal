import { useState } from 'react';
import axios from 'axios';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', role: 'Intern' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/apply', form);
      alert('Application submitted!');
      setForm({ name: '', email: '', phone: '', role: 'Intern' });
    } catch (err) {
      alert('Failed to submit. Try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register as Intern or Volunteer</h2>
      <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
      <br />
      <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
      <br />
      <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} required />
      <br />
      <select name="role" value={form.role} onChange={handleChange}>
        <option value="Intern">Intern</option>
        <option value="Volunteer">Volunteer</option>
      </select>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
}
