import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useMemberContext } from "../../hooks/useMemberContext";

const SessionDetail = () => {
  const { id } = useParams();
  const [session, setSession] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useMemberContext();

  useEffect(() => {
    const fetchSessionDetail = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/masukin/sessions/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch session details');
        }

        const data = await response.json();
        setSession(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching session details:', err);
      } finally {
        setIsLoading(false);
      }
    };

    if (token && id) {
      fetchSessionDetail();
    }
  }, [token, id]);

  // Format date to human-readable format
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', options);
  };

  return (
    <div className="w-full min-h-screen py-8 px-4 md:px-8">
      {isLoading && (
        <div className="flex justify-center items-center h-64">
          <p>Memuat detail sesi...</p>
        </div>
      )}
      
      {error && (
        <div className="flex justify-center items-center h-64">
          <p className="text-red-500">Error: {error}</p>
        </div>
      )}
      
      {!isLoading && !error && !session && (
        <div className="flex justify-center items-center h-64">
          <p>Sesi tidak ditemukan</p>
        </div>
      )}
      
      {!isLoading && !error && session && (
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
          <div className="bg-gray-900 p-6 text-white">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center space-x-2">
                <div className="bg-gray-800 rounded-full px-3 py-1 text-sm flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="20px"
                    viewBox="0 -960 960 960"
                    width="20px"
                    fill="#EFEFEF"
                    className="mr-1"
                  >
                    <path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Z" />
                  </svg>
                  <span>Kuota: {session.session_quota}</span>
                </div>
                <div className="bg-green-600 rounded-full w-4 h-4"></div>
              </div>
              <Link to="/home" className="text-white hover:underline">
                Kembali
              </Link>
            </div>
            <h1 className="text-3xl font-bold mb-2">{session.session_name}</h1>
          </div>
          
          <div className="p-6">
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2">Detail Sesi</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600">Tanggal</p>
                  <p className="font-medium">{formatDate(session.session_date)}</p>
                </div>
                <div>
                  <p className="text-gray-600">Waktu</p>
                  <p className="font-medium">{session.session_begin} - {session.session_end} WIB</p>
                </div>
                <div>
                  <p className="text-gray-600">Dibuat oleh</p>
                  <p className="font-medium bg-green-100 inline-block px-2 py-1 rounded-full text-sm">
                    {session.session_creator?.username || "Unknown"}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-8 flex justify-center">
              <a 
                href={session.session_link} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-md font-medium transition-colors"
              >
                Masuk Ruang
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SessionDetail;
