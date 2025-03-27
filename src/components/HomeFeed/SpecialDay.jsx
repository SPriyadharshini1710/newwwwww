import { useState, useEffect } from "react";
import axios from "axios";

function SpecialDay() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchSpecialDay = async () => {
        setLoading(true);
        try {
            const response = await axios.get("/api/on-this-day");
            setEvents(response.data.data || []);
        } catch (error) {
            console.error("Failed to fetch special day data:", error);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchSpecialDay();
    }, []);

    return (
        <div className="special-day-container">
            <h2>Today in History</h2>
            {loading ? (
                <p>Loading events...</p>
            ) : (
                <div className="event-grid">
                    {events.map((event, index) => (
                        <div key={index} className="event-card">
                            {event.image_url ? (
                                <img 
                                    src={event.image_url} 
                                    alt="Event Image" 
                                    className="event-image" 
                                />
                            ) : (
                                <div className="placeholder-image">No Image</div>
                            )}
                            <div className="event-info">
                                <h3>{event.year}</h3>
                                <p>{event.text}</p>
                                {event.pages && event.pages.length > 0 && (
                                    <a 
                                        href={`https://en.wikipedia.org/wiki/${event.pages[0].titles.normalized}`} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                    >
                                        Learn More
                                    </a>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <button onClick={fetchSpecialDay}>Refresh Events</button>
        </div>
    );
}

export default SpecialDay;
