import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AlbumCard from '../component/AlbumCard';
import Navbar from '../component/Navbar';
import { useUser } from '../context/Users.context';

export default function MusicApp() {
    const { setAccessToken, handleSearch, albums } = useUser();
    const [audioRef, setAudioRef] = useState(null);
    const [loading, setLoading] = useState(true);

    const CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
    const CLIENT_SECRET = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;

    useEffect(() => {
        const base64Credentials = btoa(CLIENT_ID + ':' + CLIENT_SECRET);

        const authParameters = {
            method: 'post',
            url: 'https://accounts.spotify.com/api/token',
            headers: {
                'Authorization': `Basic ${base64Credentials}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            data: 'grant_type=client_credentials',
        };

        axios(authParameters)
            .then(response => {
                const { access_token } = response.data;
                setAccessToken(access_token);
                handleSearch(access_token);
            })
            .catch(error => {
                console.error('Error fetching access token:', error);
            })
            .finally(() => {
                // Set loading to false when the API request is completed
                setLoading(false);
            });
    }, []);

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

            {loading ? (
                <div className="flex items-center justify-center h-screen">
                    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            ) : (
                <div>
                    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4 pt-24 pb-40">
                        {albums?.map(album => (
                            <AlbumCard key={album.id} album={album} playTrack={playTrack} />
                        ))}
                    </div>

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
            )}
        </div>
    )
}
