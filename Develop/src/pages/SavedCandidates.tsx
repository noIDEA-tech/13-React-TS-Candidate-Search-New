import { useState, useEffect } from 'react';
import { Candidate } from '../interfaces/Candidate.interface';

const SavedCandidates = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [sortField, setSortField] = useState<keyof Candidate>('login');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const savedCandidates = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
    setCandidates(savedCandidates);
  }, []);

  const handleRemove = (id: number) => {
    const updatedCandidates = candidates.filter(candidate => candidate.id !== id);
    localStorage.setItem('savedCandidates', JSON.stringify(updatedCandidates));
    setCandidates(updatedCandidates);
  };

  const handleSort = (field: keyof Candidate) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const filteredAndSortedCandidates = candidates
    .filter(candidate => {
      const searchTerm = filter.toLowerCase();
      const login = (candidate.login || '').toLowerCase();
      const name = (candidate.name || '').toLowerCase();
      const location = (candidate.location || '').toLowerCase();
      const company = (candidate.company || '').toLowerCase();
      const bio = (candidate.bio || '').toLowerCase();
      
      return login.includes(searchTerm) ||
             name.includes(searchTerm) ||
             location.includes(searchTerm) ||
             company.includes(searchTerm) ||
             bio.includes(searchTerm);
    })
    .sort((a, b) => {
      const aValue = String(a[sortField] || '').toLowerCase();
      const bValue = String(b[sortField] || '').toLowerCase();
      
  if (sortDirection === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  if (candidates.length === 0) {
      return (
    <div className="text-center p-8">
      <h1 className="text-3xl mb-4">Potential Candidates</h1>
      <p>No candidates have been accepted yet.</p>
    </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl mb-4">Potential Candidates</h1>
      
    <div className="mb-4">
        <input
          type="text"
          placeholder="Filter candidates..."
          className="w-full max-w-md px-4 py-2 rounded bg-gray-700 text-white"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
  </div>

  <div className="overflow-x-auto">
    <table className="table w-full">
     <thead>
  <tr>
    <th className="text-left">Image</th>
    <th 
      onClick={() => handleSort('name')} 
      className="text-left cursor-pointer"
    >
      Name {sortField === 'name' && (sortDirection === 'asc' ? '↑' : '↓')}
    </th>
    <th 
      onClick={() => handleSort('login')} 
      className="text-left cursor-pointer"
    >
      Username {sortField === 'login' && (sortDirection === 'asc' ? '↑' : '↓')}
    </th>
    <th 
      onClick={() => handleSort('location')} 
      className="text-left cursor-pointer"
    >
      Location {sortField === 'location' && (sortDirection === 'asc' ? '↑' : '↓')}
    </th>
    <th 
      onClick={() => handleSort('company')} 
      className="text-left cursor-pointer"
    >
      Company {sortField === 'company' && (sortDirection === 'asc' ? '↑' : '↓')}
    </th>
    <th 
      onClick={() => handleSort('bio')} 
      className="text-left cursor-pointer"
    >
      Bio {sortField === 'bio' && (sortDirection === 'asc' ? '↑' : '↓')}
    </th>
    <th className="text-left">Actions</th>
  </tr>
</thead>

      <tbody>
        {filteredAndSortedCandidates.map((candidate) => (
        <tr key={candidate.id}>
          <td>
            <img
              src={candidate.avatar_url}
              alt={`${candidate.login}'s avatar`}
              className="w-12 h-12 rounded-full"
            />
          </td>
         
          <td>{candidate.name || '-'}</td>
          
          <td>
            <a
              href={candidate.html_url ?? ''}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300"
            >
              {candidate.login}
            </a>
          </td>
          
          <td>{candidate.location || '-'}</td>
          <td>{candidate.company || '-'}</td>
          <td>{candidate.bio || '-'}</td>
          <td>
            <button
              onClick={() => handleRemove(candidate.id)}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
            >
              Remove
            </button>
          </td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  </div>
  );
};

export default SavedCandidates;