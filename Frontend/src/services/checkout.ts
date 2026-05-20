import axios from "axios";

const API_URL = "http://localhost:8000/api";

export const checkout = async (data: any) => {
  // Get token from localStorage (saved by authStore)
  const token = localStorage.getItem('user_token');
  
  const response = await axios.post(
    `${API_URL}/checkout`,
    data,
    {
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
        'Content-Type': 'application/json'
      }
    }
  );

  return response.data;
};
