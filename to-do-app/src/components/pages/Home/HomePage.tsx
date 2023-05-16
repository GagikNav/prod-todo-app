import Header from "../../common/Header";
import useGetTodos from "./hooks/useGetTodos";
import useAuthentication from "./hooks/useAuthentication";
import { useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../../api/axiosinstance";
import { ToDo, ToDoWithId } from "../../../interfaces/interfaces";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const HomePage = () => {
    useAuthentication()
    const getTodos = useGetTodos();
    let {isLoading, isError, data, error}= getTodos;
    const addToDoMutation = useMutation({
        mutationFn: async (newToDo:ToDo) => {
            const data = await axiosInstance.post("todos/", newToDo);
            return data.data;
        }
    })

    const toggleCheckboxMutation = useMutation({
        mutationFn: async ({id, ...newToDo}:ToDoWithId) => {
            const data = await axiosInstance.post("todos/"+id.toString(), newToDo);
            return data.data;
        }
    })

    const deleteToDoMutation = useMutation({
        mutationFn: async (id:string) => {
            const data = await axiosInstance.delete("todos/"+id);
            return data.data;
        }
    })

    let res = data?.data;
    let addToDoRef = useRef<HTMLInputElement>(null)

    function handleAddToDo(e:React.MouseEvent){
        e.preventDefault();
        let newToDo : ToDo;
        let newTitle = addToDoRef.current ? addToDoRef.current.value : "";
        newToDo = {title: newTitle, completed:false};
        addToDoMutation.mutate(newToDo);
    }

    function handleDeleteToDo(e: React.MouseEvent): void {
        e.preventDefault();
        if(e.currentTarget){
            let toDeleteId = e.currentTarget.getAttribute("name")
            deleteToDoMutation.mutate(toDeleteId);
        }
    }

    return ( 
    <>
    <Header/>
    <div className="text-2xl p-10 flex flex-col items-center justify-center">
        <h4 className="font-bold">
            To do:
        </h4>
        <form className="flex flex-col items-center justify-center">
            {!!res && Array.isArray(res) ? res?.map((todo) => 
            <div key={todo.id} >
                <input type="checkbox" value={todo.title} id={todo.id}/>
                <label htmlFor={todo.id} className="m-1">{todo.title}</label>
                <button name={todo.id} type="submit" className="mx-5" onClick={(e) => handleDeleteToDo(e)}><FontAwesomeIcon icon="trash-can"/></button></div>): null} 
                <label htmlFor="add-todo" className="mt-5">Add another to do:</label>
                <input type="text" id="add-todo" name="add-todo" className="border-slate-200 border-2" ref={addToDoRef}/>
                <button type="submit" className="bg-gray-100 px-5 py-2 mt-4 rounded-md" onClick={(e) => handleAddToDo(e)}>Add</button>
        </form>
    </div>
    </> );
}
 
export default HomePage;