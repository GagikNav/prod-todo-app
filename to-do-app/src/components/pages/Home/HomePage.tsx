import Header from "../../common/Header";
import useGetTodos from "./hooks/useGetTodos";
import useAuthentication from "./hooks/useAuthentication";
import { ChangeEvent, useRef } from "react";
import { useMutation } from "react-query";
import axiosInstance from "../../../api/axiosinstance";


const HomePage = () => {
    useAuthentication()
    const getTodos = useGetTodos();
    let {isLoading, isError, data, error}= getTodos;
    const addToDo = useMutation({
        mutationFn: (e:ChangeEvent) => {
            e.preventDefault();
            return axiosInstance.post("todos/")
        }
    })
    let res = data?.data;
    let checkboxRef = useRef<HTMLInputElement>(null)

    function toggleCheckbox(){
        if(checkboxRef.current){
            checkboxRef.current.checked = !checkboxRef.current.checked
            console.log(checkboxRef.current.checked)
        }
    }

    function addToDoToList(){
        addToDo.mutate
    }
    return ( 
    <>
    <Header/>
    <div className="text-2xl p-10 flex flex-col items-center justify-center">
        <h4 className="font-bold">
            To do:
        </h4>
        <form className="flex flex-col items-center justify-center">
            {!!res && Array.isArray(res) ? res?.map((todo) => <div key={todo.id} >
            <input type="checkbox" checked={!!todo.completed} value={todo.title} id={todo.id} ref={checkboxRef} onChange={toggleCheckbox}/>
            <label htmlFor={todo.id} className="m-1">{todo.title}</label>
            </div>): null} 
                <label htmlFor="add-todo" className="mt-5">Add another to do:</label>
                <input type="text" id="add-todo" name="add-todo" className="border-slate-200 border-2"/>
                <button type="submit" className="bg-gray-100 px-5 py-2 mt-4 rounded-md" onClick={addToDoToList}>Add</button>
        </form>
    </div>
    </> );
}
 
export default HomePage;