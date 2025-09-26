const ErrorMessage = ({ error }) => {
  if (!error) return null;

  return (
    <div className="max-w-md mx-auto mt-4 p-4 bg-red-500/20 backdrop-blur-sm border border-red-400/50 rounded-2xl text-white text-center">
      <p className="font-semibold">⚠️ {error}</p>
    </div>
  );
};

export default ErrorMessage;
