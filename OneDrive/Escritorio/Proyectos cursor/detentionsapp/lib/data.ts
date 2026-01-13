import { Student, Detention, DetentionSession, DayOfWeek } from '@/types';
import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const STUDENTS_FILE = path.join(DATA_DIR, 'students.json');
const DETENTIONS_FILE = path.join(DATA_DIR, 'detentions.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initialize files if they don't exist
if (!fs.existsSync(STUDENTS_FILE)) {
  fs.writeFileSync(STUDENTS_FILE, JSON.stringify([], null, 2));
}

if (!fs.existsSync(DETENTIONS_FILE)) {
  fs.writeFileSync(DETENTIONS_FILE, JSON.stringify([], null, 2));
}

export function getStudents(day?: DayOfWeek): Student[] {
  try {
    const data = fs.readFileSync(STUDENTS_FILE, 'utf8');
    const students: Student[] = JSON.parse(data);
    if (day) {
      return students.filter(s => s.day === day);
    }
    return students;
  } catch (error) {
    return [];
  }
}

export function saveStudent(student: Student): void {
  const students = getStudents();
  const index = students.findIndex(s => s.id === student.id);
  if (index >= 0) {
    students[index] = student;
  } else {
    students.push(student);
  }
  fs.writeFileSync(STUDENTS_FILE, JSON.stringify(students, null, 2));
}

export function deleteStudent(id: string): void {
  const students = getStudents();
  const filtered = students.filter(s => s.id !== id);
  fs.writeFileSync(STUDENTS_FILE, JSON.stringify(filtered, null, 2));
}

export function getDetentions(date?: string): Detention[] {
  try {
    const data = fs.readFileSync(DETENTIONS_FILE, 'utf8');
    const detentions: Detention[] = JSON.parse(data);
    let filtered = date ? detentions.filter(d => d.date === date) : detentions;
    // Ordenar por número para asegurar orden correcto
    return filtered.sort((a, b) => a.number - b.number);
  } catch (error) {
    return [];
  }
}

export function getDetentionsByDateRange(startDate: string, endDate: string): Detention[] {
  const detentions = getDetentions();
  return detentions.filter(d => d.date >= startDate && d.date <= endDate);
}

export function saveDetention(detention: Detention): void {
  const detentions = getDetentions();
  const index = detentions.findIndex(d => d.id === detention.id);
  if (index >= 0) {
    detentions[index] = detention;
  } else {
    detentions.push(detention);
  }
  fs.writeFileSync(DETENTIONS_FILE, JSON.stringify(detentions, null, 2));
}

export function deleteDetention(id: string): void {
  const detentions = getDetentions();
  const filtered = detentions.filter(d => d.id !== id);
  fs.writeFileSync(DETENTIONS_FILE, JSON.stringify(filtered, null, 2));
}

export function getDetentionSessions(): DetentionSession[] {
  const detentions = getDetentions();
  const sessionsMap = new Map<string, Detention[]>();
  
  detentions.forEach(detention => {
    if (!sessionsMap.has(detention.date)) {
      sessionsMap.set(detention.date, []);
    }
    sessionsMap.get(detention.date)!.push(detention);
  });
  
  return Array.from(sessionsMap.entries()).map(([date, detentions]) => ({
    date,
    dayOfWeek: detentions[0].dayOfWeek,
    detentions: detentions.sort((a, b) => a.number - b.number),
  })).sort((a, b) => a.date.localeCompare(b.date));
}
