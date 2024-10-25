import React, { useEffect, useState } from 'react'
import axios from 'axios'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const App = () => {
  const [tasks,setTasks]=useState([])
  const [data,setdata] = useState({title:"",description:""})
const [newdata,setnewdata] = useState({ntitle:"",ndescription:""})
   function onchangehandler(e){
    setdata({
      ...data,
       [e.target.name]:e.target.value
    })
   
   }
   function onchangehandlernew(e){
    setnewdata({
      ...data,
       [e.target.name]:e.target.value
    })
    
   }
  

  useEffect(()=>{
    axios.get('http://localhost:5000/api/tasks/getalltasks',{withCredentials:true})
    .then(response=>setTasks(response.data))
    .catch(error=>console.error(error))
  },[])
  console.log(tasks);
  const addTask=()=>{
    axios.post('http://localhost:5000/api/tasks/addtask',{title:data.title,description:data.description},{withCredentials:true})
    .then(response=>{
      setTasks([...tasks,response.data])
    setdata({title:"",description:""})
    }
   
    )
    .catch(error=>console.error(error))
    console.log(tasks);
  }
  const updatetask = (id) => {
    axios.put(
        `http://localhost:5000/api/tasks/updatetask/${id}`, // Include taskId in the URL
        { title: newdata.ntitle, description: newdata.ndescription },
        { withCredentials: true }
    )
    .then(response => {
      console.log(response.data.tasks);
        // Update the task in the local state
        setTasks(response.data.tasks);
        // Clear the input fields
        toast.success("updated successfully")
       setnewdata({ntitle:"",ndescription:""})
    })
    .catch(error => console.error(error));
};


  const deleteTask=(id)=>{
    axios.delete(`http://localhost:5000/api/tasks/deletetask/${id}`,{withCredentials:true})
    .then(()=>setTasks(tasks.filter(task=>task._id !== id)))
    .catch(error=>console.error(error))
  }
  return (
    <div className='p-6 bg-gray-100 min-h-screen'>
      <h1 className='text-3xl font-bold text-center mb-6'>Task Manager</h1>

      <div className='bg-white p-4 rounded shadow-md mb-6'>
        <input className='border p-2 w-full mb-4' name="title" type='text' onChange={onchangehandler} value={data.title} placeholder='Enter Task Title'/>

        <textarea className='border p-2 w-full mb-4'
        placeholder='Task Description' name="description" onChange={onchangehandler} value={data.description} />

        <button className='bg-blue-500 text-white p-2 rounded' onClick={addTask}>Add Task</button>


      </div>
      <div>
        {tasks.map(task=>(
          <div key={task._id} className='bg-white p-4 mb-4 rounded shadow-md flex justify-between'>
            <div>
              <h2 className='text-xl font-bold'>{task.title}</h2>
              <p>{task.description}</p>
            </div>
            <div className=' gap-2 flex'>

            <button className='bg-red-500 text-white p-3 rounded' onClick={()=>deleteTask(task._id)}>Delete</button>
            <div>
      {/* You can open the modal using document.getElementById('ID').showModal() method */}
<button className="btn bg-green-500 text-white" onClick={()=>document.getElementById('my_modal_4').showModal()}>Edit</button>
<dialog id="my_modal_4" className="modal">
  <div className="modal-box w-11/12 max-w-5xl">
    <h3 className="font-bold text-lg">Edit !</h3>
    <input className='border p-2 w-full mb-4' name='ntitle'  type='text' value={newdata.ntitle} onChange={onchangehandlernew} placeholder='Enter New Task Title'/>
    <input className='border p-2 w-full mb-4' name='ndescription' onChange={onchangehandlernew} value={newdata.ndescription}  type='text' placeholder='Enter New Task Description'/>
    <div className="modal-action">
      
        {/* if there is a button, it will close the modal */}
        <button onClick={()=>{updatetask(task._id)
        document.getElementById('my_modal_4').close()
        }} className="btn bg-emerald-400 text-white">Save</button>
      
    </div>
  </div>
</dialog>
    </div>
            </div>

          </div>
        ))}
      </div>
      
    </div>
  )
}

export default App
