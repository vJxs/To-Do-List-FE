import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
const AddTask = () => {

    const navigate = useNavigate()

    useEffect(() =>{
        if(!sessionStorage.getItem("user"))
            navigate("/")
    })


    // const handleAdd = () => {
    // }
    const [msg, SetMsg] = useState(null)
    const [formData, setFormData] = useState({
        task: "",
        owner: sessionStorage.getItem("user"),
        dueDate: ""
    })

    const addATask = (e) => {
        e.preventDefault()

        console.debug(formData)

        const req = new Request(
            'http://localhost:3000/add', {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(formData)
        }
        )

        fetch(req)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                SetMsg(data)

            })
            .catch(err => console.error(err))

        navigate("/viewAll")
    }

    const handleChange = (e) => {
        //console.warn(e.target.id , e.target.value)
        if (e.target.id == "dueDate")
            if (isNaN(e.target.value)) {
                // alert("Please enter a number")
            }
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        })
    }

    return (
        <>
            {!msg ? (
                <div className="bg-violet-100">
                    <p className="text-xl text-center">Add a Task:</p>



                    <form method="POST" className="max-w-md mx-auto flex flex-col shadow">
                        <div className="relative z-0 w-full mb-5 group">
                            <input type="text" name="task" id="task" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required onChange={handleChange} />
                            <label htmlFor="task" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Task</label>
                        </div>
                        <div className="relative z-0 w-full mb-5 group">
                            <input type="date" name="dueDate" id="dueDate" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " onChange={handleChange} />
                            <label htmlFor="dueDate" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">dueDate</label>
                        </div>
                        <div className="flex justify-center">
                            <button type="submit" className=" justify-center text-black bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 " onClick={addATask}>Enter</button>
                        </div>
                        <div className="relative z-0 w-full mb-5 group">
                            {/* <input type="text" name="owner" id="owner" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required onChange={handleChange} />
                            <label htmlFor="owner" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Owner</label> */}
                        </div>

                    </form>

                </div>
            ) : (
                <p className="m-5 text-center text-red-600 text-4-xl"></p>

            )}
        </>
    )
}

export default AddTask