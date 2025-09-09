import { NextRequest, NextResponse } from 'next/server'
import pool from '../../../lib/db'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const search = searchParams.get('search') || ''

  try {
    let query = 'SELECT projeto, veiculo, op, local, peca FROM estoque_pu'
    let params: string[] = []

    if (search) {
      query += ' WHERE projeto ILIKE $1 OR op ILIKE $1'
      params = [`%${search}%`]
    }

    query += ' ORDER BY projeto, veiculo'

    const result = await pool.query(query, params)
    return NextResponse.json(result.rows)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Erro ao buscar dados' }, { status: 500 })
  }
}