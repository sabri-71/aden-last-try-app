import React, { useEffect, useState } from 'react';
import { fetchData } from '../api';

const ExampleComponent = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchData('/your-endpoint').then(setData);
  }, []);

  return (
    <div>
      <h2>بيانات من الـ Backend:</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default ExampleComponent;
