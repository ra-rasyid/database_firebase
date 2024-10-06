import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, query, orderBy, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';
import './App.css';

function App() {
  const [name, setName] = useState('');
  const [npm, setNpm] = useState('');
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true); // State untuk loading

  // Fungsi untuk menambah data ke Firestore dengan timestamp
  const addStudent = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "students"), {
        name,
        npm,
        timestamp: serverTimestamp() // Menyimpan timestamp
      });
      setName(''); // Reset input
      setNpm('');
      fetchStudents(); // Fetch ulang setelah menambah data
    } catch (err) {
      console.error("Error adding document: ", err);
    }
  };

  // Fungsi untuk mengambil data dari Firestore dan mengurutkan berdasarkan timestamp terbaru
  const fetchStudents = async () => {
    setLoading(true); // Set loading true sebelum fetch
    const q = query(collection(db, "students"), orderBy("timestamp", "desc"));
    const querySnapshot = await getDocs(q);
    const studentsData = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })); // Simpan ID untuk keperluan lainnya
    setStudents(studentsData);
    setLoading(false); // Set loading false setelah fetch selesai
  };

  // Panggil fetchStudents ketika komponen dimuat
  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div className="container">
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
      {loading ? ( // Tampilkan spinner jika loading
        <div className="spinner">
          <div className="loading">Loading...</div> {/* Spinner sederhana */}
        </div>
      ) : (
        <ul>
          {students.map((student) => (
            <li key={student.id}>
              {student.name} - {student.npm}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
