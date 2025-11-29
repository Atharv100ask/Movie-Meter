import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Header() {
  const { user, login, logout, loading } = useAuth();
  const navigate = useNavigate();

  const handleFavoritesClick = () => {
    if (!user) {
      login();
    } else {
      navigate('/favorites');
    }
  };

  return (
    <header className="bg-[#202225] text-white shadow-lg border-b border-[#2f3136]">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <img src="/image-placeholder.png" alt="Movie Meter Logo" className="w-10 h-10" />
            <div>
              <h1 className="text-4xl font-bold">Movie Meter</h1>
              <p className="text-sm text-gray-400">Find your perfect movie</p>
            </div>
          </Link>

          <div className="flex items-center gap-4">
            <button
              onClick={handleFavoritesClick}
              className="px-4 py-2 bg-[#5865f2] hover:bg-[#4752c4] rounded-md transition-colors font-medium"
            >
              ⭐ Favorites
            </button>

            {!loading && (
              <>
                {user ? (
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      {user.picture && (
                        <img
                          src={user.picture}
                          alt={user.name}
                          className="w-8 h-8 rounded-full"
                        />
                      )}
                      <span className="text-sm text-gray-300">{user.name}</span>
                    </div>
                    <button
                      onClick={logout}
                      className="px-4 py-2 bg-[#ed4245] hover:bg-[#c03537] rounded-md transition-colors font-medium"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={login}
                    className="px-4 py-2 bg-white text-gray-800 hover:bg-gray-100 rounded-md transition-colors font-medium flex items-center gap-2"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="currentColor"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    Sign in with Google
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
