import Header from "../../common/Header";
import useGetTodos from "./hooks/useGetTodos";

const Home = () => {
    const getTodos = useGetTodos();
    let {isLoading, isError, data, error}= getTodos;

    return ( 
    <>
    <Header/>
    <div className="text-2xl p-10 flex flex-col items-center justify-center">
        <h4 className="font-bold">
            To do:
        </h4>
        <form>
            {!!data && Array.isArray(data) ? data?.map((todo) => <div>
            <input type="checkbox" key={todo.id} value={todo.title} id={todo.id}/>
            <label htmlFor={todo.id} className="m-1">Grab laundry</label>
            </div>): null} 
        </form>
    </div>
    </> );
}
 
export default Home;