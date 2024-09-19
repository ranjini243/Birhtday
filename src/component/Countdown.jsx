import React, { useState } from 'react';
import Card from './Card';

const Countdown = ({ onAudioEnd, onButtonClick }) => {
    const [showButton, setShowButton] = useState(false);
    const audio = new Audio('/song.mp3');

    const handleAudioEnd = () => {
        setShowButton(true);
        onAudioEnd();
    };

    audio.addEventListener('ended', handleAudioEnd);

    const handleAudioPlayback = () => {
        audio.play();
    };

    const handleButtonClick = () => {
        onButtonClick();
    };

    console.log("Show button:", showButton);

    return (
        <div className="h-screen w-screen flex justify-center items-center relative">
            <img
                src="/clock.jpg"
                alt="hi"
                className="absolute inset-0 object-cover w-full h-full"
                onClick={handleAudioPlayback}
            />
            <audio src="/song.mp3" loop />
            {showButton && <button onClick={handleButtonClick}>Click Me</button>}
        </div>
    );
};

const ParentComponent = () => {
    const [showCard, setShowCard] = useState(false);

    const handleAudioEnd = () => {
        console.log("Audio ended");
    };

    const handleButtonClick = () => {
        setShowCard(true);
    };

    return (
        <div>
            <Countdown onAudioEnd={handleAudioEnd} onButtonClick={handleButtonClick} />
            {showCard && <Card />}
        </div>
    );
};

export default ParentComponent;