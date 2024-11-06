import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './ViewTask.scss';

const ViewTask = () => {
    const { id } = useParams();
    const [task, setTask] = useState(null);
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTaskDetails = async () => {
            try {
                const response = await fetch(`/api/v1/tasks/task/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch task details');
                }
                const data = await response.json();
                setTask(data);
            } catch (err) {
                setError(err)
            } finally {
                setLoading(false);
            }
        };

        fetchTaskDetails();
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
        <div className="card text-center mb-3 card-container">
            <div className="card-body">
                <h5 className="card-title">{task.title}</h5>
                <p className="card-text"><strong>Assignee:</strong> {task.assigned}</p>
                <div className="d-flex flex-row card-margin">
                    <p className="card-text"><strong>Status:</strong> <span>{task.status}</span></p>
                    <p className="card-text priority-margin"><strong>Priority:</strong> {task.priority}</p>
                </div>
                <div className="d-flex flex-row card-margin">
                    <p className="card-text"><strong>Start Date:</strong> {task.startDate}</p>
                    <p className="card-text endDate-margin"><strong>End Date:</strong> {task.endDate}</p>
                </div>
                <a href="/" className="btn btn-primary">Back to Task List</a>
            </div>
        </div>
        </div>
    )
}

export default ViewTask