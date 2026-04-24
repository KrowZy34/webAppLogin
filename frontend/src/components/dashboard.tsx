import React, { useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "./DashboardLayout";
import { useNotification } from "./NotificationProvider";

/* ================== TYPES ================== */
interface Task {
  id: number;
  text: string;
  completed: boolean;
}

interface Product {
  id: number;
  name: string;
  price: number;
}

/* ================== COMPONENT ================== */
const Dashboard: React.FC = () => {
  const { notify } = useNotification();
  const [activeTab, setActiveTab] = useState<"tasks" | "products">("tasks");

  // TASKS
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskInput, setTaskInput] = useState("");
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);

  // PRODUCTS
  const [products, setProducts] = useState<Product[]>([]);
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [editingProductId, setEditingProductId] = useState<number | null>(null);

  /* ================== TASK FUNCTIONS ================== */
  const addTask = () => {
    if (!taskInput.trim()) return;

    if (editingTaskId !== null) {
      setTasks(prev =>
        prev.map(t =>
          t.id === editingTaskId ? { ...t, text: taskInput } : t
        )
      );
      setEditingTaskId(null);
    } else {
      setTasks(prev => [
        ...prev,
        { id: Date.now(), text: taskInput, completed: false },
      ]);
    }

    setTaskInput("");
  };

  const deleteTask = (id: number) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const toggleTask = (id: number) => {
    setTasks(prev =>
      prev.map(t =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const editTask = (task: Task) => {
    setTaskInput(task.text);
    setEditingTaskId(task.id);
  };

  /* ================== PRODUCT FUNCTIONS ================== */
  const addProduct = () => {
    const priceNumber = Number(productPrice);

    if (!productName.trim() || isNaN(priceNumber) || priceNumber <= 0) {
      notify("Ingresa un producto válido con precio correcto", "error");
      return;
    }

    if (editingProductId !== null) {
      setProducts(prev =>
        prev.map(p =>
          p.id === editingProductId
            ? { ...p, name: productName, price: priceNumber }
            : p
        )
      );
      setEditingProductId(null);
    } else {
      setProducts(prev => [
        ...prev,
        {
          id: Date.now(),
          name: productName,
          price: priceNumber,
        },
      ]);
    }

    setProductName("");
    setProductPrice("");
  };

  const deleteProduct = (id: number) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const editProduct = (product: Product) => {
    setProductName(product.name);
    setProductPrice(product.price.toString());
    setEditingProductId(product.id);
  };

  /* ================== UI ================== */
  return (
    <DashboardLayout>
      <div className="page active">
        <div className="page-header">
          <Link to="/home" className="back-btn">← Inicio</Link>
          <h2 className="page-heading">
            {activeTab === "tasks" ? "Gestión de tareas" : "Control de productos"}
          </h2>
        </div>

        {/* TABS */}
        <div className="tabs-header">
          <button
            onClick={() => setActiveTab("tasks")}
            className={`tab-btn ${activeTab === "tasks" ? "active" : ""}`}
          >
            Tareas
          </button>
          <button
            onClick={() => setActiveTab("products")}
            className={`tab-btn ${activeTab === "products" ? "active" : ""}`}
          >
            Productos
          </button>
        </div>

        {/* ===================== TASKS ===================== */}
        {activeTab === "tasks" && (
          <div>
            <div className="input-panel">
              <div className="input-panel-label">Nueva tarea</div>
              <div className="input-row">
                <input
                  type="text"
                  value={taskInput}
                  onChange={(e) => setTaskInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addTask()}
                  placeholder="Nombre de la tarea..."
                />
                <button onClick={addTask} className="btn-add">
                  {editingTaskId ? "Actualizar" : "Agregar"}
                </button>
              </div>
            </div>

            <div className="section-card" style={{ marginBottom: 0 }}>
              <div className="section-header">
                <span className="section-label">Lista de tareas</span>
                <span className="section-badge">{tasks.length} tareas</span>
              </div>
              
              <div>
                {tasks.length === 0 ? (
                  <div className="section-empty">Vaya, aún no tienes tareas.</div>
                ) : (
                  tasks.map(task => (
                    <div key={task.id} className="task-row">
                      <div className="task-left">
                        <div
                          className={`checkbox ${task.completed ? "done" : ""}`}
                          onClick={() => toggleTask(task.id)}
                        >
                          {task.completed && (
                            <svg width="8" height="8" viewBox="0 0 12 9" fill="none">
                              <path d="M1 4l3.5 3.5L11 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          )}
                        </div>
                        <input
                          className={`task-name ${task.completed ? "done" : ""}`}
                          value={task.text}
                          readOnly
                          onClick={() => editTask(task)}
                          style={{cursor: 'pointer'}}
                        />
                      </div>
                      <div className="task-right">
                        <span className={`badge ${task.completed ? 'done' : 'pending'}`}>
                          {task.completed ? 'Lista' : 'Pendiente'}
                        </span>
                        <button className="del-btn" onClick={() => deleteTask(task.id)}>×</button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* ===================== PRODUCTS ===================== */}
        {activeTab === "products" && (
          <div>
            <div className="input-panel">
              <div className="input-panel-label">Nuevo producto</div>
              <div className="input-row">
                <input
                  type="text"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  placeholder="Nombre del producto..."
                />
                <input
                  type="number"
                  value={productPrice}
                  onChange={(e) => setProductPrice(e.target.value)}
                  className="price-input"
                  placeholder="Precio"
                  min="0"
                  step="0.01"
                />
                <button onClick={addProduct} className="btn-add">
                  {editingProductId ? "Actualizar" : "Agregar"}
                </button>
              </div>
            </div>

            <div className="section-card" style={{ marginBottom: 0 }}>
              <div className="section-header">
                <span className="section-label">Inventario</span>
                <span className="section-badge">{products.length} productos</span>
              </div>
              
              <div>
                {products.length === 0 ? (
                  <div className="section-empty">Aún no hay productos registrados.</div>
                ) : (
                  products.map(product => (
                    <div key={product.id} className="product-row">
                      <div className="product-left">
                        <div className="dot" />
                        <span className="product-name" onClick={() => editProduct(product)} style={{cursor: 'pointer'}}>
                          {product.name}
                        </span>
                      </div>
                      <div className="product-right">
                        <span className="product-price">S/ {product.price.toFixed(2)}</span>
                        <button className="del-btn" onClick={() => deleteProduct(product.id)}>×</button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
