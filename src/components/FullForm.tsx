import { useState } from 'react';
import Form from './Form';
import Result from './Result';

function FullForm() {
  const [result, setResult] = useState<object>();
  const handleResult = (result: any) => {
    setResult(result);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold mb-6 text-center">Form</h1>
        <Form onResult={handleResult}/>
        {result && <Result result={result} />}
        
      </div>
    </div>
  );
}

export default FullForm;

