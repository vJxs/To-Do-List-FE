import { Link } from "react-router-dom";
import RemoveTask from "./RemoveTask";

const ViewTask = (props) => {
    const { _id, task, owner, dueDate, priv, comp } = props.oneTask;

    const handleCheckBox = (e) => {
        const isCompleted = e.target.checked;
        console.log(isCompleted ? "Completed" : "Not Completed");

        const req = new Request('http://localhost:3000/update/', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id: _id, completed: isCompleted })
        });

        fetch(req)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                // Optional: Update task state or display message based on response
            })
            .catch(err => console.error(err));
    };

    const handlePrivacyChange = (e) => {
        const isPrivate = e.target.value === 'private';
        console.log(isPrivate ? "Private" : "Public");

        const req = new Request('http://localhost:3000/update/', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id: _id, private: isPrivate })
        });

        fetch(req)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                // Optional: Update task state or display message based on response
            })
            .catch(err => console.error(err));
    };

    return (
        <div key={_id} className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 basis-1/4">
            <a href="#">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{task}</h5>
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{owner}</h5>
            </a>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{dueDate}</p>
            <div className="flex items-center mb-4">
                <input 
                    id="default-checkbox" 
                    type="checkbox" 
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" 
                    onChange={handleCheckBox} 
                    checked={comp}
                />
                <label htmlFor="default-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Completed</label>
            </div>
            <div className="flex items-center mb-4">
                <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Privacy:</label>
                <div className="ml-4">
                    <input 
                        id="public-radio" 
                        type="radio" 
                        name="privacy" 
                        value="public" 
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" 
                        onChange={handlePrivacyChange} 
                        checked={!priv}
                    />
                    <label htmlFor="public-radio" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Public</label>
                </div>
                <div className="ml-4">
                    <input 
                        id="private-radio" 
                        type="radio" 
                        name="privacy" 
                        value="private" 
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" 
                        onChange={handlePrivacyChange} 
                        checked={priv}
                    />
                    <label htmlFor="private-radio" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Private</label>
                </div>
            </div>
            <RemoveTask id={_id} />
            <Link
                to={"/update/" + _id}
                className="ml-1 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"> 
                Update 
            </Link>
        </div>
    );
}

export default ViewTask;
