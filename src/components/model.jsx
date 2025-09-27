export default function Modal({ isOpen, onClose, usuario }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4" onClick={(e) => e.stopPropagation()}>
        <button className="float-right text-gray-500 hover:text-gray-700" onClick={onClose}>×</button>
        <img className="w-24 h-24 rounded-full mx-auto" src={usuario.foto} alt={usuario.nombre} />
        <h2 className="text-center font-bold text-xl mt-4">{usuario.nombre} {usuario.apellidos}</h2>
        <p className="text-center text-gray-600 mt-2"><strong>Perfil:</strong> {usuario.perfil}</p>
        <p className="text-center mt-2"><strong>Intereses:</strong> {usuario.intereses}</p>
        <p className="text-center text-blue-500 mt-2"><strong>Correo:</strong> {usuario.correo}</p>
      </div>
    </div>
  );
}