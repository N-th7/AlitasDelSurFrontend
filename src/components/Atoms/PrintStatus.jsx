import React, { useState, useEffect } from 'react';
import { getPrintQueueStatus } from '../../api/orderService';

const PrintStatus = ({ queueId, onStatusChange }) => {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!queueId) return;

    const checkStatus = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await getPrintQueueStatus(queueId);
        
        if (response.success) {
          setStatus(response);
          
          // Notificar cambio de estado al componente padre
          if (onStatusChange) {
            onStatusChange(response);
          }
          
          // Si está completado, dejar de verificar
          if (response.status === 'completed') {
            return;
          }
        }
      } catch (err) {
        console.error('Error verificando estado de impresión:', err);
        setError('Error verificando impresión');
      } finally {
        setLoading(false);
      }
    };

    // Verificar inmediatamente
    checkStatus();

    // Continuar verificando si no está completado
    const interval = setInterval(() => {
      if (status?.status !== 'completed') {
        checkStatus();
      }
    }, 3000); // Verificar cada 3 segundos

    return () => clearInterval(interval);
  }, [queueId, status?.status, onStatusChange]);

  if (!queueId) return null;

  const getStatusIcon = () => {
    switch (status?.status) {
      case 'pending':
        return '⏳';
      case 'processing':
        return '🖨️';
      case 'completed':
        return '✅';
      case 'failed':
        return '❌';
      default:
        return '❓';
    }
  };

  const getStatusText = () => {
    switch (status?.status) {
      case 'pending':
        return 'En cola';
      case 'processing':
        return 'Imprimiendo...';
      case 'completed':
        return 'Impreso';
      case 'failed':
        return 'Error';
      default:
        return 'Verificando...';
    }
  };

  const getStatusColor = () => {
    switch (status?.status) {
      case 'pending':
        return 'text-yellow-600 bg-yellow-100';
      case 'processing':
        return 'text-blue-600 bg-blue-100';
      case 'completed':
        return 'text-green-600 bg-green-100';
      case 'failed':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  if (loading && !status) {
    return (
      <div className="flex items-center space-x-2 text-sm">
        <span className="animate-spin">⏳</span>
        <span className="text-gray-600">Verificando impresión...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center space-x-2 text-sm text-red-600">
        <span>⚠️</span>
        <span>{error}</span>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-2">
      <div className={`px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1 ${getStatusColor()}`}>
        <span>{getStatusIcon()}</span>
        <span>{getStatusText()}</span>
      </div>
      
      {status?.attempts > 0 && (
        <span className="text-xs text-gray-500">
          (Intento {status.attempts})
        </span>
      )}
      
      {status?.error && status.status === 'failed' && (
        <div className="text-xs text-red-500 max-w-xs truncate" title={status.error}>
          Error: {status.error}
        </div>
      )}
    </div>
  );
};

export default PrintStatus;