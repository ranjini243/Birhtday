import React, { useEffect, useState } from 'react';
import './Card.css';
import ThankYou from './Thankyou';

const Card = ({onAudioEnd}) => {
    const wishesInterval = 3000;
    const [index, setIndex] = useState(0);
    const [currentWish, setCurrentWish] = useState(null);
    const [allWishesCompleted, setAllWishesCompleted] = useState(false);
    const [wishes, setWishes] = useState([]);
    const [audioEnded, setAudioEnded] = useState(false);
    const audio = new Audio('/hbd.mp3'); // Initialize audio outside the component

    useEffect(() => {
        const handleAudioEnd = () => {
            setAudioEnded(true);
            onAudioEnd(); 
        };

        audio.addEventListener('ended', handleAudioEnd);

        return () => {
            audio.removeEventListener('ended', handleAudioEnd);
            audio.pause();
            audio.currentTime = 0;
        };
    }, [onAudioEnd]);

    useEffect(() => {
        fetch('https://mocki.io/v1/77815eb5-1633-4e1d-90c8-96bb6ac5149a')
            .then(response => response.json())
            .then(data => {
                setWishes(data.wishes);
            })
            .catch(error => {
                console.error('Error fetching wishes:', error);
            });
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            if (index < wishes.length) {
                setCurrentWish(wishes[index]);
                setIndex(prevIndex => prevIndex + 1);
            } else {
                setAllWishesCompleted(true);
                clearInterval(interval);
            }
        }, wishesInterval);

        return () => clearInterval(interval);
    }, [index, wishes, wishesInterval]);

    return (
        <div className='animated-text-container'>
            <img src='/holi.jpg' alt='hi' className='fill-space' />
            <div className="text-overlay">
                <audio src = '/hbd.mp3'/>
                <div className="text-box">
                    <p>{currentWish && currentWish.message}</p>
                </div>
            </div>
            {allWishesCompleted && <ThankYou />}
        </div>
    );
};

export default Card;
