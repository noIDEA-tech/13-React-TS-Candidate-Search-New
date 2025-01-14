import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import { Candidate } from '../interfaces/Candidate.interface';

const CandidateSearch = () => {
  const [currentCandidate, setCurrentCandidate] = useState<Candidate | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const fetchNextCandidate = async () => {
    try {
      setLoading(true);
      const users = await searchGithub();
      if (users.length > 0) {
        const detailedUser = await searchGithubUser(users[0].login);
        setCurrentCandidate(detailedUser);
      } else {
        setError('No more candidates available');
      }
    } catch (err) {
      setError('Error fetching candidate data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNextCandidate();
  }, []);

  const handleAccept = () => {
    if (currentCandidate) {
      const savedCandidates = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
      localStorage.setItem(
        'savedCandidates',
        JSON.stringify([...savedCandidates, currentCandidate])
      );
      fetchNextCandidate();
    }
  };

  if (loading) {
    return <div className="text-center p-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-center p-4 text-red-500">{error}</div>;
  }

  if (!currentCandidate) {
    return <div className="text-center p-4">No candidates available</div>;
  }

  return  (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-5xl font-bold mb-12 text-white">Candidate Search</h1>

      <div className="bg-black rounded-lg shadow-xl w-full max-w-md p-8">
        <img 
          src={currentCandidate.avatar_url} 
          alt={`${currentCandidate.login}'s avatar`}
          className="w-48 h-48 rounded-lg mx-auto mb-8"
        />
        
        <h2 className="text-2xl font-bold mb-4 text-white">
          {currentCandidate.name || currentCandidate.login}
        </h2>
        
        <div className="space-y-2 mb-6">
        {currentCandidate.location && (
          <p>Location: {currentCandidate.location}</p>
        )}
        {currentCandidate.email && (
          <p>Email: {currentCandidate.email}</p>
        )}
        {currentCandidate.company && (
          <p>Company: {currentCandidate.company}</p>
        )}
        {currentCandidate.bio && (
          <p>Bio: {currentCandidate.bio}</p>
        )}
      </div>

      <div className="flex justify-center space-x-6 mt-8">
        <button
          onClick={() => fetchNextCandidate()}
          className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg text-lg font-semibold"
        >
          Reject
        </button>
        <button
          onClick={handleAccept}
          className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg text-lg font-semibold"
        >
          Accept
        </button>
      </div>
    </div>
  </div>
);
};
export default CandidateSearch;
