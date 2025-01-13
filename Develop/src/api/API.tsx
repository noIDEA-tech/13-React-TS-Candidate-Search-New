const searchGithub = async () => {
  try {
    const start = Math.floor(Math.random() * 100000000) + 1;

    console.log('Token exists:', !!import.meta.env.VITE_GITHUB_TOKEN);
    console.log('Token starts with:', import.meta.env.VITE_GITHUB_TOKEN?.substring(0, 4));
    // console.log('Environment:', import.meta.env); // Uncomment this to debug
    const response = await fetch(
      `https://api.github.com/users?since=${start}`,
      {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'Authorization': `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`
        }
      }
    );
    console.log('Response:', response); 
    const data = await response.json();
    if (!response.ok) {
      throw new Error('invalid API response, check the network tab');
    }
    console.log('Data:', data); // Uncomment this to debug
    return data;
  } catch (err) {
    console.log('an error occurred', err); // Uncomment this to debug
    return [];
  }
};

const searchGithubUser = async (username: string) => {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'Authorization': `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`
      }
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error('invalid API response, check the network tab');
    }
    return data;
  } catch (err) {
    console.log('an error occurred', err); // Uncomment this to debug
    return {};
  }
};

export { searchGithub, searchGithubUser };
