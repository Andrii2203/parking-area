import React, { useState, useEffect } from "react";
import { getDefaultCurrency } from "../utils/currencySymbol";
import { returnNumberAfterComa } from "../utils/utils";
import "../style/parking-rates-modal.css";


const ParkingRatesModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [weekdayRate, setWeekdayRate] = useState<number | null>(null);
    const [weekendRate, setWeekendRate] = useState<number | null>(null);

    useEffect(() => {
        setIsOpen(true);

        fetch('/api/rates')
            .then(response => response.json())
            .then(data => {
                setWeekdayRate(data.weekdayRate);
                setWeekendRate(data.weekendRate);
            })
            .catch(error => console.error('Error fetching weekday rate:', error));
    }, []);

    const closeModal = () => setIsOpen(false);

    const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target instanceof HTMLDivElement && e.target.className === "modal-overlay") {
            closeModal();
        }
    };
    
    const getTwoHoursDay = () : string => {
        return weekdayRate ? returnNumberAfterComa((weekdayRate * 2), 2) : "N/A";
    }
    const getTwoHoursWeek = () : string => {
        return weekendRate ? returnNumberAfterComa((weekendRate * 2), 2) : "N/A";
    }

    return isOpen ? (
        <div className="modal-overlay" onClick={handleOutsideClick}>
            <div className="modal-content">
                <button className="close-btn" onClick={closeModal}>X</button>
                <h2>Parking Rates</h2>
                <table>
                    <thead>
                        <tr>
                            <td>Time</td>
                            <td>Price</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td>First 10 minutes</td><td>Free</td></tr>
                        {weekdayRate !== null ? (
                            <tr><td>Up to 1 hour</td><td>{returnNumberAfterComa(weekdayRate, 2)} {getDefaultCurrency()}</td></tr>
                        ) : (
                            <tr><td>Up to 1 hour</td><td>Loading...</td></tr>
                        )}
                        {weekendRate !== null ? (
                            <tr><td>Weekend rate</td><td>{returnNumberAfterComa(weekendRate, 2)} {getDefaultCurrency()}</td></tr>
                        ) : (
                            <tr><td>Weekend rate</td><td>Loading...</td></tr>
                        )}
                        <tr><td>Up to 2 hours on weekdays</td><td>{getTwoHoursDay()} {getDefaultCurrency()}</td></tr>
                        <tr><td>Up to 2 hours on the weekend</td><td>{getTwoHoursWeek()} {getDefaultCurrency()}</td></tr>
                    </tbody>
                </table>
            </div>
        </div>
    ) : null;
};

export default ParkingRatesModal;
