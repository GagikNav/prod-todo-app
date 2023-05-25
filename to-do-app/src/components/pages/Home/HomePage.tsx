import Header from "../../common/Header";
import useGetTodos from "./hooks/useGetTodos";
import useAuthentication from "./hooks/useAuthentication";
import {useEffect, useRef } from "react";
// import { ToDo, ToDoWithId } from "../../../interfaces/interfaces";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../../api/axiosinstance";
import { ToDo, ToDoWithId } from "../../../interfaces/interfaces";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useStore from "../../../state/store";

const HomePage = () => {
    let toDos = useStore((state) => state.todos);
    const removeToDoStore = useStore((state) => state.removeToDo);
    const initializeToDoStore = useStore((state) => state.initializeToDos);
    useAuthentication()
    const getTodos = useGetTodos();
    let { isLoading, isError, data, error } = getTodos;

    useEffect(() => {
        if(data && toDos.length === 0){
            initializeToDoStore(data.data);
        }
    }, [isLoading])

    const addToDoMutation = useMutation({
        mutationFn: async (newToDo:ToDo) => {
            await axiosInstance.post("todos/", newToDo);
        }
    })

    const getToDosMutation = useMutation({
        mutationFn: async () => {
            const data = axiosInstance.get("todos/");
            return data
        }
    })

    const toggleCheckboxMutation = useMutation({
        mutationFn: async ({id, ...newToDo}:ToDoWithId) => {
            await axiosInstance.put("todos/"+id.toString(), newToDo);
        }
    })

    const deleteToDoMutation = useMutation({
        mutationFn: async (id:string) => {
            await axiosInstance.delete("todos/"+id);
        }
    })
    let addToDoRef = useRef<HTMLInputElement>(null)

    async function handleAddToDo(e:React.MouseEvent){
        e.preventDefault();
        let newToDo : ToDo;
        if(addToDoRef.current){
            let newTitle =addToDoRef.current.value;
            newToDo = {title: newTitle, completed:false}; 
            addToDoMutation.mutateAsync(newToDo).then(async () => {
                let todos = await getToDosMutation.mutateAsync()
                initializeToDoStore(todos.data)
            });
            addToDoRef.current.value = "";
        }
    }

    function handleDeleteToDo(e: React.MouseEvent): void {
        e.preventDefault();
        if(e.currentTarget){
            let toDeleteId = e.currentTarget.getAttribute("name")
            if(toDeleteId){
                deleteToDoMutation.mutate(toDeleteId);
                removeToDoStore(parseInt(toDeleteId));
            }
        }
    }

    function handleCheckbox(e: React.ChangeEvent): void {
        e.preventDefault();
        if('checked' in e.currentTarget && 'value' in e.currentTarget){
            let newCompleted = e.currentTarget.checked;
            let title = e.currentTarget.value;
            let id = e.currentTarget.id;
            let body = {id: parseInt(id),completed: newCompleted,title: title}; 
            console.log(body)
            toggleCheckboxMutation.mutateAsync(body as ToDoWithId).then(async() => {
                let todos = await getToDosMutation.mutateAsync()
                initializeToDoStore(todos.data)
            })
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
            <div className="todos flex flex-col items-center justify-center">
            {!!toDos ? toDos?.map((todo) => 
            <div className="todo" key={todo.id} >
                <input type="checkbox" value={todo.title} id={todo.id.toString()} checked={todo.completed} onChange={(e) => handleCheckbox(e)}/>
                <label htmlFor={todo.id.toString()} className="m-1">{todo.title}</label>
                <button name={todo.id.toString()} type="submit" className="trash-icon mx-5" onClick={(e) => handleDeleteToDo(e)}><FontAwesomeIcon icon="trash-can"/></button>
                </div>): null}
</div>

                <label htmlFor="add-todo" className="mt-5">Add another to do:</label>
                <input type="text" id="add-todo" name="add-todo" className="border-slate-200 border-2" ref={addToDoRef}/>
                <button type="submit" className="bg-gray-100 px-5 py-2 mt-4 rounded-md" onClick={(e) => handleAddToDo(e)}>Add</button>
        </form>
    </div>
    </> );
}
 
export default HomePage;