import React, { useState } from "react"
import { useDispatch } from "react-redux";
import { postData } from "../../redux/actions";
import { useNavigate } from "react-router-dom";
import './AddTask.scss';


const AddTask = () => {
    const [title, setTitle] = useState('')
    const [assigned, setAssigned] = useState('');
    const [status, setStatus] = useState('Open');
    const [priority, setPriority] = useState('Low');
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const data = { title, assigned, status, priority, startDate, endDate };

    const handleSubmit = (e) => {
        e.preventDefault();
        const url = '/api/v1/tasks/create';
        dispatch(postData(url, data));
        navigate('/');
    };

    return (
        <div className="d-flex justify-content-center align-items-center my-10 mx-10">
            <div className="w-50 border bg-light text-white p-5">
                <h1 className="text-align-center heading">Add Task</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3 mt-3">
                        <label className="form-label heading">Title</label>
                        <input type="text" name={title} className="form-control" id="exampleFormControlInput1" placeholder="Enter Task Name" onChange={e => setTitle(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label heading">Assign To</label>
                        <input type="email" name={assigned} className="form-control" id="exampleFormControlInput1" placeholder="Enter Asignee mail " onChange={e => setAssigned(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label heading">Status</label>
                        <select className="form-select" aria-label="Default select example" value={status} onChange={e => setStatus(e.target.value)} required>
                            <option defaultValue={'Open'} value="open">Open</option>
                            <option value="In-Progress">In-Progress</option>
                            <option value="Under-review">Under-Review</option>
                            <option value="Done">Done</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label className="form-label heading">Priority</label>
                        <select className="form-select" aria-label="Default select example" value={priority} onChange={e => setPriority(e.target.value)} required>
                            <option defaultValue={'Low'} value="low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label className="form-label heading">Start Date</label>
                        <input type="date" name={startDate} className="form-control" id="exampleFormControlInput1" placeholder="enter title of book" onChange={e => setStartDate(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label heading">End Date</label>
                        <input type="date" name={endDate} className="form-control" id="exampleFormControlInput1" placeholder="enter title of book"
                            onChange={e => {
                                setEndDate(e.target.value);
                                setStatus('Done');
                            }}
                        />
                    </div>
                    <br />
                    <button type="submit" className="btn btn-info">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default AddTask