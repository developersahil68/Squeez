import React, { useEffect, useState, useRef } from 'react';
import '../App.css';
import DeleteConfirmation from './DeleteConfirmation';

function Records({ inputValue, formData, fetchData, correctAnswer, totalPoints, totalTime, gameDate, handlePreferences, handleDeleteRecords, setShowDeleteComponent, showDeleteComponent, recordsDeleted }) {
    const [storedRecords, setStoredRecords] = useState([]);
    const hasStoredRecord = useRef(false); // Use a ref to track if the data has been stored


    useEffect(() => {
        if (!recordsDeleted && !hasStoredRecord.current) {
            const newRecord = {
                inputValue,
                formData,
                fetchData,
                correctAnswer,
                totalPoints,
                totalTime,
                gameDate,
            };

            // Get the existing records from local storage
            const existingRecords = JSON.parse(localStorage.getItem('recordsData')) || [];

            // Add the new record to the existing records
            const updatedRecords = [...existingRecords, newRecord];

            // Store the updated records in local storage
            localStorage.setItem('recordsData', JSON.stringify(updatedRecords));

            // Set the ref to true to indicate the data has been stored
            hasStoredRecord.current = true;

            // Update the stored records state
            setStoredRecords(updatedRecords);
        }
    }, [inputValue, formData, fetchData, correctAnswer, totalPoints, totalTime, gameDate, recordsDeleted]);

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('recordsData')) || [];
        setStoredRecords(storedData);
    }, []);

    const handleDeleteButtonClick = () => {
        setShowDeleteComponent(true);
    };

    const handleCloseDeleteBtn = () => {
        setShowDeleteComponent(false);
    };

    const handleDeleteRecordsWrapper = () => {
        // Clear local storage
        localStorage.removeItem('recordsData');
        setStoredRecords([]);
        handleDeleteRecords();
    };

    if (showDeleteComponent) {
        return <DeleteConfirmation handleCloseDeleteBtn={handleCloseDeleteBtn} handleDeleteRecords={handleDeleteRecordsWrapper} />;
    }

    return (
        <div className='result-window'>
            <div className="records-container">
                <div className="delete-records--overlay opacity-zero"></div>
                <table aria-labelledby="table-label" id="records-table">
                    <caption id="table-label">Records</caption>
                    <thead>
                        <tr>
                            <th scope="col">Username</th>
                            <th scope="col">Lvl</th>
                            <th scope="col">Categories</th>
                            <th scope="col">Match</th>
                            <th scope="col" className="score-header">Score&#9652;</th>
                            <th scope="col" className="time-header">Time&#9652;</th>
                            <th scope="col" className="date-header">Date&#9652;</th>
                        </tr>
                    </thead>
                    <tbody>
                        {storedRecords.map((record, index) => (
                            <tr key={index}>
                                <td>{record.inputValue}</td>
                                <td>{record.formData.difficulty}</td>
                                <td>{record.formData.categories}</td>
                                <td>{`${record.correctAnswer}/${record.fetchData.length}`}</td>
                                <td>{record.totalPoints}</td>
                                <td>{record.totalTime}</td>
                                <td>{record.gameDate}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="record--btns-container">
                    <button className="btn-nav-deleteResult" onClick={handleDeleteButtonClick}><span className="clr-accent">Delete</span> all records</button>
                    <button className="btn-nav-restartQuiz" onClick={handlePreferences}><span className="clr-accent">Squeez</span> me again!</button>
                </div>
            </div>
        </div>
    );
}

export default Records;




