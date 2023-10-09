import { useState } from 'react';
import { useUser } from '../context/Users.context';

export default function AlbumCard({ album, playTrack }) {
    const [selectedTrack, setSelectedTrack] = useState('');
    const { favorites, handleSelectFavorite } = useUser();

    const handlePlayTrack = () => {
        if (selectedTrack) {
            playTrack(selectedTrack);
        }
    };

    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg mx-auto">
            <img src={album.images[0].url} alt={album.name} className="w-full h-64 object-cover" />
            <div className="px-6 py-4">
                <div className="font-semibold text-xl mb-2">{album.name}</div>
                <div className="mb-2">
                    <label htmlFor={`trackSelect-${album.id}`} className="block text-gray-600 text-sm">
                        Select a track:
                    </label>
                    <select
                        id={`trackSelect-${album.id}`}
                        onChange={(e) => setSelectedTrack(e.target.value)}
                        value={selectedTrack}
                        className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-blue-500 focus:outline-none"
                    >
                        <option value="">Select a track</option>
                        {album.tracks.map((track) => (
                            <option key={track.uri} value={track.uri}>
                                {track.name}
                            </option>
                        ))}
                    </select>
                </div>
                <button
                    onClick={handlePlayTrack}
                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full focus:outline-none"
                >
                    Play
                </button>
                <button
                    onClick={(e) => handleSelectFavorite(album, e)}
                    className={`${favorites.some((favorite) => favorite.id === album.id)
                        ? 'bg-green-500 text-white'
                        : 'bg-green-300 text-gray-700'
                        } px-4 py-2 rounded-full ml-2 focus:outline-none`}
                >
                    {favorites.some((favorite) => favorite.id === album.id)
                        ? 'Remove Album' : 'Add Album'}
                </button>
            </div>
        </div>
    );
}
