import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import "./styleList.css";

function ListTask() {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  async function getTasks() {
  
      const response = await api.get("/api/tasks");
      setTasks(response.data);
  }
    
  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div className="container">
      <h1>Lista de Tarefas</h1>
      <button className="back-button" onClick={() => navigate("/")}>
        Voltar
      </button>

      {tasks.length === 0 ? (
        <p>Não há tarefas cadastradas.</p>
      ) : (
        <ul className="task-list">
          {tasks.map((task) => (
            <li key={task._id} className="task-item">
              <p><strong>Título:</strong> {task.title}</p>
              <p><strong>Situação:</strong> {task.finished ? "Finalizada" : "Pendente"}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ListTask;
