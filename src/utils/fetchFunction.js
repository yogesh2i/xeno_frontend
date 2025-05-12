export async function fetchData(url, options = {}) {
    options = {...options, 
         headers: {
            'Content-Type': 'application/json',
             'authorization': `Bearer ${localStorage.getItem('token')}`,
         }
        };
    try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}${url}`, options);
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}