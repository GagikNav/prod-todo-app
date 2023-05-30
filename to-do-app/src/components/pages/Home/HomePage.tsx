import Header from "../../common/Header";
import useGetTodos from "./hooks/useGetTodos";
import useAuthentication from "./hooks/useAuthentication";
import {useEffect, useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../../api/axiosinstance";
import { ToDo, ToDoWithId } from "../../../interfaces/interfaces";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useStore from "../../../state/store";

let isEditType: null | number;

const HomePage = () => {
    let toDos = useStore((state) => state.todos);
    const removeToDoStore = useStore((state) => state.removeToDo);
    const initializeToDoStore = useStore((state) => state.initializeToDos);
    const [isEdit, setIsEdit] = useState<typeof isEditType>(null);
    useAuthentication()
    const getTodos = useGetTodos();
    let { isLoading, isError, data, error } = getTodos;
    let addToDoRef = useRef<HTMLInputElement>(null)
    let editRef = useRef<HTMLInputElement>(null)


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

    const updateToDoMutation = useMutation({
        mutationFn: async ({id, ...newToDo}:ToDoWithId) => {
            await axiosInstance.put("todos/"+id.toString(), newToDo);
        }
    })

    const deleteToDoMutation = useMutation({
        mutationFn: async (id:string) => {
            await axiosInstance.delete("todos/"+id);
        }
    })

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

    function handleEditToDo(e: React.MouseEvent, index: number): void {
        e.preventDefault();
        if(isEdit === null) {
            setIsEdit(index)
            console.log(editRef.current)
            if(editRef.current){
                editRef.current.value = "haha"
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
            updateToDoMutation.mutateAsync(body as ToDoWithId).then(async() => {
                let todos = await getToDosMutation.mutateAsync()
                initializeToDoStore(todos.data)
            })
        }
    }

    function handleSubmitEditToDo(e:React.MouseEvent) :void {
        e.preventDefault()
        if(editRef.current){
            let newTitle = editRef.current.value;
            let id = editRef.current.id;
            //ERROR: unchecks checked items on edit
            let completed = editRef.current.checked;
            let body = {title: newTitle, id: parseInt(id), completed: completed }
            updateToDoMutation.mutateAsync(body as ToDoWithId).then(async() => {
                let todos = await getToDosMutation.mutateAsync()
                initializeToDoStore(todos.data)
            })
            setIsEdit(null);
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
            <div className="todo" key={todo.id}>
                {isEdit !== todo.id ?
                <>
                <input type="checkbox" value={todo.title} id={todo.id.toString()} checked={todo.completed} onChange={(e) => handleCheckbox(e)}/>
                <label htmlFor={todo.id.toString()} className="m-1">{todo.title}</label>
                <button name={todo.id.toString()} type="submit" className="edit-icon ml-5 mr-2" onClick={(e) => handleEditToDo(e, todo.id)}><FontAwesomeIcon icon="pen-to-square" /></button>
                <button name={todo.id.toString()} type="submit" className="trash-icon" onClick={(e) => handleDeleteToDo(e)}><FontAwesomeIcon icon="trash-can"/></button>
            </>
            : <div className="flex flex-col items-center justify-center">
                <label htmlFor={todo.id.toString()}>Edit your To Do:</label>
                <input id={todo.id.toString()} type="text" className="border-slate-200 border-2" ref={editRef} defaultValue={todo.title}/>
                <div>
                    <button id="cancel" onClick={() => setIsEdit(null)}>Cancel</button>
                    <button id="edit" onClick={(e) => handleSubmitEditToDo(e)}>Edit</button>
                </div>
            </div> }
                </div>
                
                ): null}
            </div>

                <label htmlFor="add-todo" className="mt-5">Add another to do:</label>
                <input type="text" id="add-todo" name="add-todo" className="border-slate-200 border-2" ref={addToDoRef}/>
                <button type="submit" className="bg-gray-100 px-5 py-2 mt-4 rounded-md" onClick={(e) => handleAddToDo(e)}>Add</button>
        </form>
    </div>
    </> );
}
 
export default HomePage;