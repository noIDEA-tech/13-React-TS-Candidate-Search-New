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
    <div className="flex flex-col items-center p-8 max-w-2x1 mx-auto">
      <h1 className="text-3x1 mb-8">Candidate Search</h1>

      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full">
        <div className="flex flex-col items-center">
          <img 
            src={currentCandidate.avatar_url} 
            alt={`${currentCandidate.login}'s avatar`}
            className="w-32 h-32 rounded-full mb-4"
          />
          <h2 className="text-xl font-bold mb-2">
            {currentCandidate.name || currentCandidate.login}
          </h2>
      
          <div className="w-full space-y-2 mb-6">
            <p>Username: {currentCandidate.login}</p>
            {currentCandidate.location && <p>Location: {currentCandidate.location}</p>}
            {currentCandidate.email && <p>Email: {currentCandidate.email}</p>}
            {currentCandidate.company && <p>Company: {currentCandidate.company}</p>}
            {currentCandidate.bio && <p>Bio: {currentCandidate.bio}</p>}
            <p>
              <a 
                href={currentCandidate.html_url ?? ''}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300"
              >
                GitHub Profile
              </a>
            </p>
          </div>

          <div className="flex space-x-4">
            <button
              onClick={() => fetchNextCandidate()}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded"
            >
              Reject
            </button>
            <button
              onClick={handleAccept}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded"
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateSearch;
