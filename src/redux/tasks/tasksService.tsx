import axios from 'axios';

export function getTasks(currentUser: String) {
    return axios
        .get(`http://localhost:8080/tasks/?id=${currentUser}`)
        .then((res) => res.data)
        .catch((err) => err);
}

export function createTask({ taskname, description, priority, currentUser }: { taskname: String, description: String, priority: String, currentUser: String }) {
    return axios
      .post(`http://localhost:8080/new-task`, {
        title: taskname,
        description: description,
        priority: priority,
        creator: currentUser,
      })
      .then((res) => res.data)
      .catch((err) => console.log("error occured: ", err));
}

export function deleteTask({ taskId }: {taskId: String}){
    return axios
      .delete(`http://localhost:8080/delete-task/?id=${taskId}`)
      .then((res) => res.data)
      .catch((err) => console.log("error occured:", err));
}

export function editTask({ _id, taskname, description, priority, currentUser }: { _id: String, taskname: String, description: String, priority: String, currentUser: String }) {
    return axios
      .put(`http://localhost:8080/edit-task`, {
        id: _id,
        title: taskname,
        description: description,
        priority: priority,
        creator: currentUser,
      })
      .then((res) => res.data)
      .catch((err) => console.log("error occured:", err));
}

export function completeTask({ taskId }: { taskId: String }) {
    return axios
      .get(`http://localhost:8080/complete-task/?id=${taskId}`)
      .then((res) => res.data)
      .catch((err) => console.log("error occured:", err));
}

export function cancelTask({ taskId }: { taskId: String }) {
    return axios
      .get(`http://localhost:8080/cancel-task/?id=${taskId}`)
      .then((res) => res.data)
      .catch((err) => console.log("error occured:", err));
}