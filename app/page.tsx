'use client'

import { useState, useEffect } from 'react'

interface EstoqueItem {
  projeto: string
  veiculo: string
  op: string
  local: string
}

export default function Home() {
  const [data, setData] = useState<EstoqueItem[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [error, setError] = useState('')

  const fetchData = async (searchTerm = '') => {
    setLoading(true)
    try {
      const url = searchTerm 
        ? `/api/estoque?search=${encodeURIComponent(searchTerm)}`
        : '/api/estoque'
      
      const response = await fetch(url)
      if (!response.ok) throw new Error('Erro na requisição')
      
      const result = await response.json()
      setData(result)
      setError('')
    } catch (err) {
      setError('Erro ao carregar dados')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleSearch = () => {
    fetchData(search)
  }

  const handleClear = () => {
    setSearch('')
    fetchData()
  }

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: 'white',
      padding: '20px'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
        overflow: 'hidden'
      }}>
        <div style={{
          background: 'linear-gradient(135deg, #4160e9ff 0%, #4160e9ff 100%)',
          color: 'white',
          padding: '30px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '15px'
        }}>
          <img 
            src="/opera.jpg" 
            alt="Opera Logo" 
            style={{
              height: '60px',
              width: 'auto',
              objectFit: 'contain',
              borderRadius: '8px'
            }}
          />
          <h1 style={{ margin: 0, fontSize: '2.5rem', fontWeight: 'bold' }}>Estoque Poliuretano</h1>
        </div>

        <div style={{ padding: '30px' }}>
          <div style={{
            display: 'flex',
            gap: '10px',
            marginBottom: '30px',
            flexWrap: 'wrap'
          }}>
            <input
              type="text"
              placeholder="Pesquisar por projeto ou OP..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              style={{
                flex: 1,
                minWidth: '250px',
                padding: '12px 16px',
                border: '2px solid #e0e0e0',
                borderRadius: '8px',
                fontSize: '16px',
                outline: 'none',
                transition: 'border-color 0.3s'
              }}
              onFocus={(e) => e.target.style.borderColor = '#667eea'}
              onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
            />
            <button
              onClick={handleSearch}
              style={{
                padding: '12px 24px',
                backgroundColor: '#667eea',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                cursor: 'pointer',
                transition: 'background-color 0.3s'
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#5a6fd8'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#667eea'}
            >
              🔍 Buscar
            </button>
            <button
              onClick={handleClear}
              style={{
                padding: '12px 24px',
                backgroundColor: '#95a5a6',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                cursor: 'pointer',
                transition: 'background-color 0.3s'
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#7f8c8d'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#95a5a6'}
            >
              ✕ Limpar
            </button>
          </div>

          {error && (
            <div style={{
              backgroundColor: '#fee',
              color: '#c33',
              padding: '15px',
              borderRadius: '8px',
              marginBottom: '20px',
              border: '1px solid #fcc'
            }}>
              {error}
            </div>
          )}

          {loading ? (
            <div style={{ textAlign: 'center', padding: '40px' }}>
              <div style={{
                display: 'inline-block',
                width: '40px',
                height: '40px',
                border: '4px solid #f3f3f3',
                borderTop: '4px solid #667eea',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
              }}></div>
              <p style={{ marginTop: '15px', color: '#666' }}>Carregando...</p>
            </div>
          ) : (
            <>
              <div style={{
                overflowX: 'auto',
                borderRadius: '8px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
              }}>
                <table style={{
                  width: '100%',
                  borderCollapse: 'collapse',
                  backgroundColor: 'white'
                }}>
                  <thead>
                    <tr style={{
                      background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)'
                    }}>
                      <th style={{
                        padding: '16px',
                        textAlign: 'left',
                        fontWeight: '600',
                        color: '#2c3e50',
                        borderBottom: '2px solid #dee2e6'
                      }}>
                        Projeto - Veículo
                      </th>
                      <th style={{
                        padding: '16px',
                        textAlign: 'left',
                        fontWeight: '600',
                        color: '#2c3e50',
                        borderBottom: '2px solid #dee2e6'
                      }}>
                        OP
                      </th>
                      <th style={{
                        padding: '16px',
                        textAlign: 'left',
                        fontWeight: '600',
                        color: '#2c3e50',
                        borderBottom: '2px solid #dee2e6'
                      }}>
                        Local
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item, index) => (
                      <tr
                        key={index}
                        style={{
                          backgroundColor: index % 2 === 0 ? '#ffffff' : '#f8f9fa',
                          transition: 'background-color 0.2s'
                        }}
                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#e3f2fd'}
                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = index % 2 === 0 ? '#ffffff' : '#f8f9fa'}
                      >
                        <td style={{
                          padding: '16px',
                          borderBottom: '1px solid #dee2e6',
                          fontWeight: '500'
                        }}>
                          {item.projeto} - {item.veiculo}
                        </td>
                        <td style={{
                          padding: '16px',
                          borderBottom: '1px solid #dee2e6'
                        }}>
                          {item.op}
                        </td>
                        <td style={{
                          padding: '16px',
                          borderBottom: '1px solid #dee2e6'
                        }}>
                          {item.local}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {data.length === 0 && (
                <div style={{
                  textAlign: 'center',
                  padding: '40px',
                  color: '#666'
                }}>
                  <p style={{ fontSize: '18px' }}>Nenhum item encontrado no estoque.</p>
                </div>
              )}

              <div style={{
                marginTop: '20px',
                textAlign: 'center',
                color: '#666',
                fontSize: '14px'
              }}>
                Total: {data.length} {data.length === 1 ? 'item' : 'itens'}
              </div>
            </>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}