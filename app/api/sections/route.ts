// API route for managing editable sections (timetable, rooms, activities)
// Handles GET requests to fetch section data and POST to update sections
import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const key = searchParams.get('key');
    
    if (!key) {
      const [rows] = await pool.query<RowDataPacket[]>(
        'SELECT * FROM sections ORDER BY updated_at DESC'
      );
      return NextResponse.json(rows);
    }
    
    const [rows] = await pool.query<RowDataPacket[]>(
      'SELECT * FROM sections WHERE section_key = ?',
      [key]
    );
    
    if (rows.length === 0) {
      return NextResponse.json({ 
        section_key: key, 
        title: '', 
        content: '', 
        name: '', 
        updated_at: null 
      });
    }
    
    return NextResponse.json(rows[0]);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch sections' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { section_key, title, content, name } = body;
    
    // Validation
    if (!section_key || !name || content === undefined) {
      return NextResponse.json(
        { error: 'Missing required fields: section_key, content, and name' },
        { status: 400 }
      );
    }
    
    // Trim inputs and validate
    const trimmedName = name.trim();
    const trimmedContent = content.trim();
    const trimmedTitle = title?.trim() || '';
    
    if (trimmedName.length === 0) {
      return NextResponse.json(
        { error: 'Name cannot be empty' },
        { status: 400 }
      );
    }
    
    if (trimmedName.length > 100) {
      return NextResponse.json(
        { error: 'Name too long (max 100 characters)' },
        { status: 400 }
      );
    }
    
    if (trimmedContent.length > 5000) {
      return NextResponse.json(
        { error: 'Content too long (max 5000 characters)' },
        { status: 400 }
      );
    }
    
    // Upsert section
    await pool.query<ResultSetHeader>(
      `INSERT INTO sections (section_key, title, content, name, updated_at) 
       VALUES (?, ?, ?, ?, NOW()) 
       ON DUPLICATE KEY UPDATE 
       title = VALUES(title), 
       content = VALUES(content), 
       name = VALUES(name), 
       updated_at = NOW()`,
      [section_key, trimmedTitle, trimmedContent, trimmedName]
    );
    
    // Fetch updated section
    const [rows] = await pool.query<RowDataPacket[]>(
      'SELECT * FROM sections WHERE section_key = ?',
      [section_key]
    );
    
    return NextResponse.json(rows[0]);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to update section' },
      { status: 500 }
    );
  }
}
