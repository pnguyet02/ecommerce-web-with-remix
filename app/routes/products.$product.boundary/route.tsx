export default function ErrorBoundary({ error }: { error: Error }) {
  return (
    <div className="container mx-auto text-center py-16">
      <h1 className="text-2xl font-bold text-red-600">Oops! Đã xảy ra lỗi.</h1>
      <p className="text-lg text-gray-700 mt-4">{error.message}</p>
      <p className="text-gray-500 mt-2">Hãy thử lại hoặc quay về trang chủ.</p>
    </div>
  );
}
