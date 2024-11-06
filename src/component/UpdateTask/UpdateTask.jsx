import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import { editTask } from "../../redux/actions";
import { useNavigate, useParams } from "react-router-dom";
import './UpdateTask.scss';

const UpdateTask = () => {

    const [taskTitle, setTaskTitle] = useState('')
    const [assigned, setAssigned] = useState('');
    const [status, setStatus] = useState('');
    const [priority, setPriority] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

    const apiUrl = process.env.REACT_APP_API_URL || '';

    useEffect(() => {
        const fetchTaskDetails = async () => {
            try {
                const response = await fetch(apiUrl + `/api/v1/tasks/task/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch task details');
                }
                const task = await response.json();
                setTaskTitle(task.title);
                setAssigned(task.assigned);
                setStatus(task.status);
                setPriority(task.priority);
                setStartDate(task.startDate);
                setEndDate(task.endDate);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchTaskDetails();
    }, [id]);

    const update = (e) => {
        e.preventDefault();
        dispatch(editTask(id, { title: taskTitle, assigned: assigned, status: status, priority: priority, startDate: startDate, endDate: endDate }));
        navigate('/');
    };

    const handleStatus = (e) => {
        if (status === 'Done' && endDate) {
            alert("Status Value Cannot be Changed because endDate has been mentioned");
        }
        else {
            setStatus(e.target.value)
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="d-flex justify-content-center align-items-center my-10 mx-10">
            <div className="w-50 border bg-light text-white p-5">
                <h1 className="text-align-center heading">Update Task</h1>
                <form onSubmit={update}>
                    <div className="mb-3 mt-3">
                        <label className="form-label heading">Title</label>
                        <input type="text" name={taskTitle} className="form-control" id="exampleFormControlInput1" placeholder="Enter Task Name" value={taskTitle} onChange={e => setTaskTitle(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label heading">Assign To</label>
                        <input type="email" name={assigned} className="form-control" id="exampleFormControlInput1" placeholder="Enter Asignee mail" value={assigned} onChange={e => setAssigned(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label heading">Status</label>
                        <select className="form-select" aria-label="Default select example" value={status} onChange={handleStatus}>
                            <option defaultValue={'Open'} value="open">Open</option>
                            <option value="In-Progress">In-Progress</option>
                            <option value="Under-review">Under-Review</option>
                            <option value="Done">Done</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label className="form-label heading">Priority</label>
                        <select className="form-select" aria-label="Default select example" value={priority} onChange={e => setPriority(e.target.value)}>
                            <option defaultValue={'Low'} value="low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label className="form-label heading">Start Date</label>
                        <input type="date" name={startDate} className="form-control" id="exampleFormControlInput1" placeholder="enter title of book" value={startDate} onChange={e => setStartDate(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label heading">End Date</label>
                        <input type="date" name={endDate} className="form-control" id="exampleFormControlInput1" placeholder="enter title of book" value={endDate}
                            onChange={e => {
                                setEndDate(e.target.value);
                                setStatus('Done');
                            }} />
                    </div>
                    <br />
                    <button type="submit" className="btn btn-info">Update</button>
                </form>
            </div>
        </div>
    )
}

export default UpdateTask