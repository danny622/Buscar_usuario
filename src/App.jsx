
import Card from './components/card'
import SearchInput from './components/searchinput'
import LoadingBar from './components/LoadingBar'
import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import { useAuth } from './hooks/useAuth'
export default function App() {
  const { logout } = useAuth()
  const [usuarios, setUsuarios] = useState([])
  const [filtrados, setFiltrados] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const obtenerUsuarios = async () => {
    try {
      const response = await axios.get('http://localhost:3001/usuarios')
      setUsuarios(response.data)
      setFiltrados(response.data)
    } catch (err) {
      setError('Error al cargar usuarios')
      console.log(err)
    }
  }

  useEffect(() => {
    obtenerUsuarios()
  },[])

  const filtrarUsuarios = useCallback((query) => {
    setLoading(true)
    setTimeout(() => {
      const q = query.trim().toLowerCase()
      const resultados = usuarios.filter(usuario =>
        [usuario.nombre, usuario.apellidos, usuario.perfil, usuario.intereses, usuario.correo].some(campo =>
          String(campo).toLowerCase().includes(q)
        )
      )
      setFiltrados(resultados)
      setLoading(false)
    }, 1000) // Simulate loading time
  }, [usuarios])

  console.log(usuarios)

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1>BUSCADOR DE USUARIOS</h1>
        <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded">Logout</button>
      </div>
      <SearchInput onSearch={filtrarUsuarios} />
      {error && <p className="text-red-500">{error}</p>}
      {loading ? <LoadingBar /> : filtrados.map(usuario => (<Card key={usuario.id} usuario={usuario} />))}
    </div>
  )
}