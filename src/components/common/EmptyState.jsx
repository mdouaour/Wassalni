export default function EmptyState({ icon = '🔍', title, message, action }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <span className="text-5xl mb-4">{icon}</span>
      <h3 className="text-lg font-semibold text-gray-700 mb-2">{title}</h3>
      {message && <p className="text-gray-500 mb-4 max-w-md">{message}</p>}
      {action}
    </div>
  );
}
