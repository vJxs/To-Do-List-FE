import { useEffect, useState } from "react"
import ViewTask from "./ViewTask"
import { useNavigate } from "react-router-dom"


const ViewAllTask = () => {
    const [allTasks, setAllTasks] = useState([])
    const [filteredTasks, setFilteredTasks] = useState([])

    const navigate = useNavigate() 
    useEffect(() =>{
        if(!sessionStorage.getItem("user"))
            navigate("/")
    })


    useEffect(() => {
        const req = new Request(
            'http://localhost:3000/tasks', {
            headers: {
                "content-type": "application/json"
            }
        }
        )

        fetch(req)
            .then(res => res.json())
            .then(data => {
                // console.table(data)
                if (data.message)
                    setMsg(data)
                else {
                    setAllTasks(data)
                    setFilteredTasks(data)
                }

            })
            .catch(err => console.error(err))
    }, [])

    const handleSearch = (e) => {
        const value = e.target.value

        const filtered = allTasks.filter(task => {
            // console.log("tes3", task)      
            return (
                task.task.toLowerCase().includes(value.toLowerCase()) || task.owner.toLowerCase().includes(value.toLowerCase()) || task.dueDate.toString().includes(value.toLowerCase())
            )
        })

        setFilteredTasks(filtered)
    }

    return (
        <>
            <input type="text"
                onChange={handleSearch} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Task" required />
            <p>Tasks Found:  {filteredTasks.length}</p>
            <div className="flex flex-row  flex-wrap justify-around gap-y-8">

                {filteredTasks.map(task => {
                    return (
                        <ViewTask key={task._id} oneTask={task} />

                    )
                }
                )}
            </div>
        </>

    )
}

export default ViewAllTask
