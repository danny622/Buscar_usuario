import { useState } from "react";
import { useAuth } from "../hooks/useAuth.jsx";
import LoadingBar from "../components/LoadingBar.jsx"; // 👈 ahora correcto

export default function Login() {
  const { login } = useAuth();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await login(form.username, form.password);

      if (!res?.ok) {
        setError(res?.message || "No se pudo iniciar sesión");
      }
    } catch (err) {
      setError("Error al conectar con el servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid place-items-center bg-gray-100 p-4">
      {loading && <LoadingBar />} {/*  se renderiza solo cuando loading = true */}
      <form
        onSubmit={onSubmit}
        className="bg-white rounded-2xl p-6 w-full max-w-sm shadow"
      >
        <h1 className="text-2xl font-semibold mb-4 text-center">
          INICIAR SESIÓN
        </h1>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <label className="block mb-2">
          <span className="text-sm text-gray-600">Usuario</span>
          <input
            className="mt-1 w-full border rounded p-2"
            type="text"
            name="username"
            value={form.username}
            onChange={onChange}
            placeholder="admin"
          />
        </label>

        <label className="block mb-4">
          <span className="text-sm text-gray-600">Contraseña</span>
          <input
            className="mt-1 w-full border rounded p-2"
            type="password"
            name="password"
            autoComplete="current-password"
            value={form.password}
            onChange={onChange}
            placeholder="1234"
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded bg-blue-600 text-white py-2 disabled:opacity-50 hover:bg-blue-700 transition"
        >
          {loading ? "Cargando..." : "LOGIN"}
        </button>
      </form>
    </div>
  );
}
