import React, { useState } from 'react'
import FavoriteAlbum from '../component/FavoriteAlbum'
import { useUser } from '../context/Users.context';
import Navbar from '../component/Navbar';

export default function FavoriteMusic() {
    const { favorites } = useUser();
    const [audioRef, setAudioRef] = useState(null);
    const playTrack = (trackUri) => {
        if (audioRef) {
            audioRef.src = `https://open.spotify.com/embed/track/${trackUri.split(':')[2]}`;
        }
        else {
            audioRef.src = '';
        }
    };
    return (
        <div className='w-screen h-auto'>
            <Navbar />
            <div>
                <h1 className="text-3xl font-bold pt-20 pb-4 text-center">Favorite Music</h1>
                {favorites.length === 0 ? (
                    <div className="text-center text-gray-500">Add some music to your favorites!</div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4 pt-6 pb-40">
                        {favorites?.map((album) => (
                            <FavoriteAlbum key={album.id} album={album} playTrack={playTrack} />
                        ))}
                    </div>
                )}

                <div className="fixed bottom-0 w-full bg-white shadow-lg z-50 p-0">
                    <iframe
                        ref={(ref) => setAudioRef(ref)}
                        title="audio"
                        className="w-full"
                        height="100"
                        frameBorder="0"
                        allowtransparency="true"
                        allow="encrypted-media"
                        src="https://open.spotify.com/embed/track/6aQIGqAo9PxRKjUkhYtR6R?utm_source=generator"
                    />
                </div>
            </div>
        </div>
    )
}
