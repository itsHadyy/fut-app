import React, { useEffect, useRef } from 'react';

function Clients() {
    const scrollRef = useRef(null);

    useEffect(() => {
        const scrollContainer = scrollRef.current;
        if (!scrollContainer) return;

        let scrollAmount = 0;
        const scrollSpeed = 0.5; // Adjust scroll speed as needed
        const intervalTime = 10; // milliseconds for update

        const scroll = () => {
            if (scrollContainer.scrollWidth > scrollContainer.clientWidth) {
                scrollAmount += scrollSpeed;
                if (scrollAmount >= scrollContainer.scrollWidth - scrollContainer.clientWidth) {
                    scrollAmount = 0; // Reset scroll to beginning
                }
                scrollContainer.scrollLeft = scrollAmount;
            } else {
                scrollAmount = 0; // No need to scroll if content fits
            }
        };

        const interval = setInterval(scroll, intervalTime);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="clients">
            <div className="clients-scroll-container" ref={scrollRef}>
                <img src="media/clients/logo01.png" alt="Client Logo 1" />
                <img src="media/clients/logo02.png" alt="Client Logo 2" />
                <img src="media/clients/logo03.png" alt="Client Logo 3" />
                <img src="media/clients/logo04.png" alt="Client Logo 4" />
                <img src="media/clients/logo05.svg" alt="Client Logo 5" />
                <img src="media/clients/logo06.png" alt="Client Logo 6" />
                <img src="media/clients/logo07.png" alt="Client Logo 7" />
                {/* Duplicate images for seamless looping */}
                <img src="media/clients/logo01.png" alt="Client Logo 1" />
                <img src="media/clients/logo02.png" alt="Client Logo 2" />
                <img src="media/clients/logo03.png" alt="Client Logo 3" />
                <img src="media/clients/logo04.png" alt="Client Logo 4" />
                <img src="media/clients/logo05.svg" alt="Client Logo 5" />
                <img src="media/clients/logo06.png" alt="Client Logo 6" />
                <img src="media/clients/logo07.png" alt="Client Logo 7" />
            </div>
        </div>
    );
}

export default Clients;