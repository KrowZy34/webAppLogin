import React, { useState } from "react";

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
      alert("Ingresa un producto válido con precio correcto");
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white flex justify-center py-10 px-4">
      <div className="w-full max-w-3xl bg-gray-800 rounded-2xl shadow-2xl p-6">

        <h1 className="text-3xl font-bold text-center mb-6">
          Dashboard
        </h1>

        {/* TABS */}
        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={() => setActiveTab("tasks")}
            className={`px-4 py-2 rounded-lg ${
              activeTab === "tasks" ? "bg-blue-600" : "bg-gray-700"
            }`}
          >
            Tareas
          </button>

          <button
            onClick={() => setActiveTab("products")}
            className={`px-4 py-2 rounded-lg ${
              activeTab === "products" ? "bg-blue-600" : "bg-gray-700"
            }`}
          >
            Productos
          </button>
        </div>

        {/* TASKS */}
        {activeTab === "tasks" && (
          <>
            <div className="flex gap-2 mb-6">
              <input
                value={taskInput}
                onChange={(e) => setTaskInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addTask()}
                placeholder="Nueva tarea..."
                className="flex-1 px-4 py-2 rounded bg-gray-900 border border-gray-700"
              />

              <button
                onClick={addTask}
                className="bg-green-500 px-4 py-2 rounded"
              >
                {editingTaskId ? "Actualizar" : "Agregar"}
              </button>
            </div>

            <div className="space-y-2">
              {tasks.map(task => (
                <div key={task.id} className="flex justify-between bg-gray-900 p-3 rounded">
                  <span
                    onClick={() => toggleTask(task.id)}
                    className={`cursor-pointer ${
                      task.completed ? "line-through text-gray-500" : ""
                    }`}
                  >
                    {task.text}
                  </span>

                  <div className="flex gap-2">
                    <button onClick={() => editTask(task)}>✏️</button>
                    <button onClick={() => deleteTask(task.id)}>🗑️</button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* PRODUCTS */}
        {activeTab === "products" && (
          <>
            <div className="flex gap-2 mb-6">
              <input
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="Nombre del producto"
                className="flex-1 px-4 py-2 rounded bg-gray-900 border border-gray-700"
              />

              <input
                type="number"
                value={productPrice}
                onChange={(e) => setProductPrice(e.target.value)}
                placeholder="Precio"
                className="w-32 px-4 py-2 rounded bg-gray-900 border border-gray-700"
              />

              <button
                onClick={addProduct}
                className="bg-green-500 px-4 py-2 rounded"
              >
                {editingProductId ? "Actualizar" : "Agregar"}
              </button>
            </div>

            <div className="space-y-2">
              {products.map(product => (
                <div key={product.id} className="flex justify-between bg-gray-900 p-3 rounded">
                  <span>
                    {product.name} -{" "}
                    {new Intl.NumberFormat("es-PE", {
                      style: "currency",
                      currency: "PEN",
                    }).format(product.price)}
                  </span>

                  <div className="flex gap-2">
                    <button onClick={() => editProduct(product)}>✏️</button>
                    <button onClick={() => deleteProduct(product.id)}>🗑️</button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;