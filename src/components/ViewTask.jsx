import { Link } from "react-router-dom"
import RemoveTask from "./RemoveTask"

const ViewTask = (props) => {

    const handleCheckBox = (e) => {
        // console.log(e.target.checked)
        if (e.target.checked == false)
            console.log("Not Completed")
        else{
            e.target.checked == true
            console.log("Completed")
        }

        const req = new Request(
            'http://localhost:3000/update/', {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ completed: false })
        }
        )

        fetch(req)
            .then(res => res.json())
            .then(data => {
                // delete data._id

                console.log(data)
                // setMsg(data)

            })
            .catch(err => console.error(err))

        // navigate("/view")

    }

    // console.log("data: ",props.oneTask) 
    const { _id, task, owner, dueDate, priv, comp } = props.oneTask
    return (
        <div key={_id} className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 basis-1/4">
            <a href="#">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{task}</h5>
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{owner}</h5>
            </a>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400"></p>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{dueDate}</p>
            <div class="flex items-center mb-4">
                {(!comp) ? (
                    <input id="default-checkbox" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onChange={handleCheckBox} />
                ) : (
                    <input id="default-checkbox" type="checkbox" checked class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onChange={handleCheckBox} />
                )}

                <label for="default-checkbox" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Completed</label>
            </div>
            <RemoveTask id={_id} />
            <Link
                to={"/update/" + _id}
                className=" ml-1 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-white-800 focus:ring-4 focus:outline-none focus:ring-white-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"> Update </Link>
        </div>
    )
}

export default ViewTask