import React from 'react';

export default function ErrorModal({ error, onClear }) {
    if (!error) {
        return null;
      }
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded shadow-md">
        <h2 className="text-xl font-semibold mb-4">An Error Occurred!</h2>
        <p>{error}</p>
        <button onClick={onClear} className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">
          Okay
        </button>
      </div>
    </div>
    )
}