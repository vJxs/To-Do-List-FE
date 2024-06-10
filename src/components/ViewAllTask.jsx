import { useEffect, useState } from "react";
import ViewTask from "./ViewTask";
import { useNavigate } from "react-router-dom";

const ViewAllTask = () => {
    const [allTasks, setAllTasks] = useState([]);
    const [filteredTasks, setFilteredTasks] = useState([]);
    const [msg, setMsg] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (!sessionStorage.getItem("user")) {
            navigate("/");
        }
    }, [navigate]);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const res = await fetch('http://localhost:3000/tasks', {
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                const data = await res.json();
                if (data.message) {
                    setMsg(data.message);
                } else {
                    setAllTasks(data);
                    setFilteredTasks(data);
                }
            } catch (err) {
                console.error(err);
                setMsg('Failed to fetch tasks');
            }
        };

        fetchTasks();
    }, []);

    const handleSearch = (e) => {
        const value = e.target.value.toLowerCase();
        const filtered = allTasks.filter(task =>
            task.task.toLowerCase().includes(value) ||
            task.owner.toLowerCase().includes(value) ||
            task.dueDate.toString().includes(value)
        );
        setFilteredTasks(filtered);
    };

    return (
        <>
            <input
                type="text"
                onChange={handleSearch}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search Task"
                required
            />
            {msg && <p>{msg}</p>}
            <p>Tasks Found: {filteredTasks.length}</p>
            <div className="flex flex-row flex-wrap justify-around gap-y-8">
                {filteredTasks.map(task => (
                    <ViewTask key={task._id} oneTask={task} />
                ))}
            </div>
        </>
    );
};

export default ViewAllTask;
