import "./style.css";
import Trashh from "../../assets/Trashh.png";
import { useEffect, useState, useRef } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

function Home() {
  const [editingTask, setEditingTask] = useState(null);
  const [editedStatus, setEditedStatus] = useState(false);
  const [tasks, setTasks] = useState([]);
  const inputTitle = useRef();
  const navigate = useNavigate();

  async function getTask() {
    try {
      const responseTasks = await api.get("/api/tasks");
      setTasks(responseTasks.data);
    } catch (error) {
      console.error("Erro ao buscar tarefas:", error);
    }
  }

  async function createTask() {
    if (!inputTitle.current.value.trim()) return;
    try {
      await api.post("/api/tasks", {
        title: inputTitle.current.value,
      });
      inputTitle.current.value = "";
      getTask();
    } catch (error) {
      console.error("Erro ao criar tarefa:", error);
    }
  }

  async function deleteTask(id) {
    try {
      await api.delete(`/api/tasks/${id}`);
      getTask();
    } catch (error) {
      console.error("Erro ao deletar tarefa:", error);
    }
  }

  function startEditing(task) {
    setEditingTask(task._id);
    setEditedStatus(task.finished);
  }

  async function saveEdit(taskId) {
    try {
      await api.put(`/api/tasks/${taskId}`, { finished: editedStatus });
      setEditingTask(null);
      getTask();
    } catch (error) {
      console.error("Erro ao salvar edição:", error);
    }
  }

  useEffect(() => {
    getTask();
  }, []);

  return (
    <div className="container">
      <div className="circle one"></div>
      <div className="circle two"></div>
      <div className="circle three"></div>

      <form onSubmit={(e) => e.preventDefault()}>
        <h1>Cadastro de atividades</h1>
        <input placeholder="Título" name="Título" ref={inputTitle} />
        <button type="button" onClick={createTask}>Cadastrar</button>
      </form>

      {tasks.map((task) => (
        <div key={task._id} className="card">
          <div className="card-content">
            <p className="task-title">Título: {task.title}</p>

            {editingTask === task._id ? (
              <>
                <label>Situação:</label>
                <select
                  value={editedStatus.toString()}
                  onChange={(e) => setEditedStatus(e.target.value === "true")}
                >
                  <option value="false">Pendente</option>
                  <option value="true">Finalizada</option>
                </select>
                <button className="button-save" onClick={() => saveEdit(task._id)}>
                  Salvar
                </button>
              </>
            ) : (
              <>
                <p className="task-status">Situação: {task.finished ? "Finalizada" : "Pendente"}</p>
                <button className="edit-button" onClick={() => startEditing(task)}>Editar</button>
              </>
            )}
          </div>

          <button onClick={() => deleteTask(task._id)}>
            <img className="trash" src={Trashh} alt="lixeira" />
          </button>
        </div>
      ))}

      <div className="listTasks">
        <button onClick={() => navigate("/listTask")}>Listar Todas Tarefas</button>
      </div>
    </div>
  );
}

export default Home;
