import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { deleteTask, fetchData } from "../../redux/actions";
import './TaskList.scss';
import { formatDate } from "../../utils";

const TaskList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'ascending' });
    const data = useSelector(state => state.data || []);

    useEffect(() => {
        dispatch(fetchData());
    }, [dispatch]);

    const handleDelete = (event,taskId) => {
        event.stopPropagation();
        alert('Are You Sure, You want to delete this task ?')
        dispatch(deleteTask(taskId));
    }

    const handleEditClick = (event, taskId) => {
        event.stopPropagation();
        navigate(`/edit/${taskId}`);
    };

    const handleRowClick = (taskId) => {
        navigate(`/view/${taskId}`);
    };

    const sortedData = React.useMemo(() => {
        let sortableData = [...data];
        if (sortConfig !== null) {
            sortableData.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableData;
    }, [data, sortConfig]);

    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    return (
        <div className="container">
            <nav className="navbar bg-body-tertiary">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">Task Bar</a>
                    <Link to={`/add`} className="btn btn-outline-success">Add Task</Link>
                </div>
            </nav>
            <table className="table table-hover table-border">
                <thead>
                    <tr>
                        <th scope="col" onClick={() => requestSort('title')}>Title {sortConfig.key === 'title' ? (sortConfig.direction === 'ascending' ? '▲' : '▼') : ''}</th>
                        <th scope="col" onClick={() => requestSort('assigned')}>Assigned To {sortConfig.key === 'assigned' ? (sortConfig.direction === 'ascending' ? '▲' : '▼') : ''}</th>
                        <th scope="col" onClick={() => requestSort('status')}>Status {sortConfig.key === 'status' ? (sortConfig.direction === 'ascending' ? '▲' : '▼') : ''}</th>
                        <th scope="col" onClick={() => requestSort('priority')}>Priority {sortConfig.key === 'priority' ? (sortConfig.direction === 'ascending' ? '▲' : '▼') : ''}</th>
                        <th scope="col">Start Date</th>
                        <th scope="col">End Date</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedData.map(task => (
                        <tr key={task._id}
                            onClick={() => handleRowClick(task._id)}
                            style={{ cursor: 'pointer' }}
                        >
                            <td>{task.title}</td>
                            <td>{task.assigned}</td>
                            <td>{task.status}</td>
                            <td>{task.priority}</td>
                            <td>{formatDate(task.startDate)}</td>
                            <td>{formatDate(task.endDate)}</td>
                            <td>
                                <button className="btn btn-primary" onClick={(event) => handleEditClick(event, task._id)}>Edit</button>
                                <button className="btn btn-danger ms-3" onClick={(event) => handleDelete(event, task._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default TaskList