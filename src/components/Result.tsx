const Result = ({ result }: { result: object }) => {
  return (
    <div>{result && <div className="mt-4">
     <span className="text-green-700 font-extrabold"> JSON.stringify(result, null, 2)</span>
    </div>}</div>
  );
}

export default Result;
