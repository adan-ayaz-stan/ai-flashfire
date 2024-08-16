export default function Test({ params }: { params: { test: string } }) {
  return (
    <div>
      <h1>Test {params.test}</h1>
    </div>
  );
}
