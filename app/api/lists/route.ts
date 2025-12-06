// API route for managing list items (shopping lists, equipment)
// Handles GET to fetch items, POST to add items, and DELETE to remove items
import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const list_key = searchParams.get('list_key');
    
    if (!list_key) {
      return NextResponse.json(
        { error: 'list_key parameter is required' },
        { status: 400 }
      );
    }
    
    const [rows] = await pool.query<RowDataPacket[]>(
      'SELECT * FROM lists WHERE list_key = ? ORDER BY created_at DESC',
      [list_key]
    );
    
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch list items' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { list_key, item_text, name } = body;
    
    // Validation
    if (!list_key || !item_text || !name) {
      return NextResponse.json(
        { error: 'Missing required fields: list_key, item_text, and name' },
        { status: 400 }
      );
    }
    
    // Trim inputs and validate
    const trimmedName = name.trim();
    const trimmedItemText = item_text.trim();
    
    if (trimmedName.length === 0 || trimmedItemText.length === 0) {
      return NextResponse.json(
        { error: 'Name and item text cannot be empty' },
        { status: 400 }
      );
    }
    
    if (trimmedName.length > 100) {
      return NextResponse.json(
        { error: 'Name too long (max 100 characters)' },
        { status: 400 }
      );
    }
    
    if (trimmedItemText.length > 500) {
      return NextResponse.json(
        { error: 'Item text too long (max 500 characters)' },
        { status: 400 }
      );
    }
    
    // Insert new item
    const [result] = await pool.query<ResultSetHeader>(
      'INSERT INTO lists (list_key, item_text, name, created_at) VALUES (?, ?, ?, NOW())',
      [list_key, trimmedItemText, trimmedName]
    );
    
    // Fetch the newly created item
    const [rows] = await pool.query<RowDataPacket[]>(
      'SELECT * FROM lists WHERE id = ?',
      [result.insertId]
    );
    
    return NextResponse.json(rows[0]);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to add list item' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { error: 'id parameter is required' },
        { status: 400 }
      );
    }
    
    await pool.query<ResultSetHeader>(
      'DELETE FROM lists WHERE id = ?',
      [parseInt(id)]
    );
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to delete list item' },
      { status: 500 }
    );
  }
}
