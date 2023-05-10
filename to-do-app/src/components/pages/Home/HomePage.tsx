import Header from "../../common/Header";
import useGetTodos from "./hooks/useGetTodos";
import useAuthentication from "./hooks/useAuthentication";


const HomePage = () => {
    useAuthentication()
    const getTodos = useGetTodos();
    let {isLoading, isError, data, error}= getTodos;
    let res = data?.data;
    return ( 
    <>
    <Header/>
    <div className="text-2xl p-10 flex flex-col items-center justify-center">
        <h4 className="font-bold">
            To do:
        </h4>
        <form>
            {!!res && Array.isArray(res) ? res?.map((todo) => <div>
            <input type="checkbox" key={todo.id} value={todo.title} id={todo.id}/>
            <label htmlFor={todo.id} className="m-1">{todo.title}</label>
            </div>): null} 
        </form>
    </div>
    </> );
}
 
export default HomePage;