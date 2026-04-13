export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 mt-auto">
      <div className="max-w-5xl mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-gray-600">
            <span className="font-bold text-primary-600">🚗 WASALNI</span>
            <span className="text-sm">— Algerian Ride Sharing</span>
          </div>
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} WASALNI. Travel together, save together.
          </p>
        </div>
      </div>
    </footer>
  );
}
