import React from 'react';

const TestApp: React.FC = () => {
  return (
    <div
      style={{
        padding: '40px',
        textAlign: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        minHeight: '100vh',
        color: 'white',
      }}
    >
      <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>
        ✅ React работает!
      </h1>
      <p style={{ fontSize: '1.2rem' }}>Версия React: {React.version}</p>
      <div style={{ marginTop: '2rem' }}>
        <button
          style={{
            padding: '1rem 2rem',
            fontSize: '1.1rem',
            background: 'white',
            color: '#667eea',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
          }}
          onClick={() => alert('Кнопка работает!')}
        >
          Нажми меня
        </button>
      </div>
    </div>
  );
};

export default TestApp;
