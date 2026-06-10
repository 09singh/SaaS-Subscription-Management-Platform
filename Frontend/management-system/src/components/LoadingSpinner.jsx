export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center h-full min-h-[400px]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-blue-200 rounded-full border-t-blue-600 animate-spin"></div>
        <p className="font-medium text-gray-600">Loading...</p>
      </div>
    </div>
  );
}
