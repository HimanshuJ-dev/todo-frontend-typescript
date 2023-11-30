import axios from "axios";

export function assignTask({
    taskname,
    description,
    priority,
    currentUser,
    recieverEmail }: {
        taskname: String,
        description: String,
        priority: String,
        currentUser: String,
        recieverEmail: String
    }) {
    return axios
      .post("http://localhost:8080/assign-task", {
        title: taskname,
        description: description,
        priority: priority,
        creator: currentUser,
        reciever: recieverEmail,
      })
      .then((res) => res.data)
      .catch((err) => console.log("error occured:", err));
}

export function assignedTasks(currentUser: String) {
    return axios
      .get(`http://localhost:8080/assigned-Tasks/?id=${currentUser}`)
      .then((res) => res.data)
      .catch((err) => console.log("error occured:", err));
}

export function completeAssignedTask({ taskId }: { taskId: String }) {
    return axios
      .get(`http://localhost:8080/complete-assigned-task/?id=${taskId}`)
      .then((res) => res.data)
      .catch((err) => console.log("error occured:", err));
}

export function cancelAssignedTask({ taskId }: { taskId: String }) {
    return axios
      .get(`http://localhost:8080/cancel-assigned-task/?id=${taskId}`)
      .then((res) => res.data)
      .catch((err) => console.log("error occured:", err));
}

export function editAssignedTask({
    _id,
    recieverEmail,
    taskName,
    description,
    priority,
    currentUser
}: {
        _id: String,
        recieverEmail: String,
        taskName: String,
        description: String,
        priority: String,
        currentUser: String
    }) {
    return axios
      .put(`http://localhost:8080/updated-assigned-task`, {
        id: _id,
        reciever: recieverEmail,
        title: taskName,
        description: description,
        priority: priority,
        creator: currentUser,
      })
      .then((res) => res.data)
      .catch((err) => console.log("error occured:", err));
}

export function recivedTasks(currentUser: String) {
    return axios
      .get(`http://localhost:8080/recieved-Tasks/?id=${currentUser}`)
      .then((res) => res.data)
      .catch((err) => console.log("error occured:", err));
}

