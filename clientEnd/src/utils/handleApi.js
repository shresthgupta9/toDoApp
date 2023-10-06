import axios from 'axios';

// url at which back end is running
const baseUrl = "http://localhost:8000/"

const getToDo = (setToDo) => {
    axios.get(baseUrl).then(({ data }) => {
        // console.log('data ---> ', data);
        setToDo(data)
    })
}

const addToDo = (text, setText, setToDo) => {
    axios.post(baseUrl, { text }).then((data) => {
        // console.log(data);
        setText("");
        getToDo(setToDo)
    }).catch((err) => console.log(err));
}

const updateToDo = (toDoId, text, setToDo, setText, setIsUpdating) => {
    axios.put(baseUrl + toDoId, { text }).then((data) => {
        setText("");
        setIsUpdating(false);
        getToDo(setToDo)
    }).catch((err) => console.log(err));
}

const deleteToDo = (toDoId, setToDo) => {
    axios.delete(baseUrl + toDoId).then((data) => {
        getToDo(setToDo)
    }).catch((err) => console.log(err));
}

export { getToDo, addToDo, updateToDo, deleteToDo }