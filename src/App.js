// src/App.js
import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from './firebase';

function App() {
  const [name, setName] = useState('');
  const [npm, setNpm] = useState('');
  const [students, setStudents] = useState([]);

  // Fungsi untuk menambah data ke Firestore
  const addStudent = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "students"), {
        name,
        npm
      });
      setName(''); // reset input
      setNpm('');
      fetchStudents(); // fetch ulang setelah menambah data
    } catch (err) {
      console.error("Error adding document: ", err);
    }
  };

  // Fungsi untuk mengambil data dari Firestore
  const fetchStudents = async () => {
    const querySnapshot = await getDocs(collection(db, "students"));
    const studentsData = querySnapshot.docs.map(doc => doc.data());
    setStudents(studentsData);
  };

  // Panggil fetchStudents ketika komponen dimuat
  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div>
      <h1>Tambah Data Mahasiswa</h1>
      <form onSubmit={addStudent}>
        <input 
          type="text" 
          placeholder="Nama" 
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input 
          type="text" 
          placeholder="NPM" 
          value={npm}
          onChange={(e) => setNpm(e.target.value)}
          required
        />
        <button type="submit">Simpan</button>
      </form>

      <h2>Daftar Mahasiswa</h2>
      <ul>
        {students.map((student, index) => (
          <li key={index}>
            {student.name} - {student.npm}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
