export const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export function authHeader(token: string) {
  return {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
}

export async function fetchJSON<T>(url: string, options: RequestInit): Promise<T> {
  const res = await fetch(url, options);
  if (!res.ok) throw new Error(await res.text());
  return await res.json();
}

export interface AuthDto {
  username?: string;
  password?: string;
}

export interface AuthResponse {
  accessToken?: string;
  expireIn: number;
}

export interface CreateUserDto {
  username?: string;
  password?: string;
}

export interface UserEntity {
  id: number;
  username?: string;
  createdAt: string;
  updatedAt: string;
  password?: string;
}

export interface CreateWorkspaceDto {
  name?: string;
  color?: string;
  logo?: string;
}

export interface UpdateWorkspaceDto {
  name?: string;
  color?: string;
  logo?: string;
}

export interface WorkspaceEntity {
  id: number;
  name?: string;
  slug?: string;
  color?: string;
  ownerId: number;
  logo?: string;
}

export interface CreateDatabaseDto {
  name?: string;
  description?: string;
}

export interface DatabaseEntity {
  id: number;
  name?: string;
  slug?: string;
  workspaceId: number;
  workspace: WorkspaceEntity;
}

export interface CreateNotebookDto {
  name?: string;
  content?: string | null;
}

export interface NotebookEntity {
  id: number;
  name?: string;
  slug?: string;
  workspaceId: number;
  workspace: WorkspaceEntity;
  content?: string;
}

export interface CreateTableDto {
  name?: string;
  columnsJson?: string;
}

export interface TableEntity {
  id: number;
  name?: string;
  slug?: string;
  databaseId: number;
  database: DatabaseEntity;
  columnsJson?: string;
}

export interface ExecuteCodeDto {
  input?: string;
  output: [];
}


// auth
export async function login(username: string, password: string) {
  return await fetchJSON<AuthResponse>(`${BASE_URL}/Auth`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
}

// user
export async function createUser(dto: CreateUserDto) {
  return await fetchJSON<UserEntity>(`${BASE_URL}/User`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dto),
  });
}

// workspace
export async function createWorkspace(dto: CreateWorkspaceDto, token: string) {
  return await fetchJSON<WorkspaceEntity>(`${BASE_URL}/Workspace`, {
    method: 'POST',
    headers: authHeader(token),
    body: JSON.stringify(dto),
  });
}

export async function getWorkspace(slug: string, token: string) {
  return await fetchJSON<WorkspaceEntity>(`${BASE_URL}/Workspace/${slug}`, {
    headers: authHeader(token),
  });
}

export async function listWorkspaces(token: string) {
  return await fetchJSON<WorkspaceEntity[]>(`${BASE_URL}/Workspace`, {
    headers: authHeader(token),
  });
}

export async function getWorkspaceContent(workspaceId: number, token: string) {
  return await fetchJSON<any>(`${BASE_URL}/workspaces/${workspaceId}/content`, {
    headers: authHeader(token),
  });
}

export async function updateWorkspace(slug: string, dto: UpdateWorkspaceDto, token: string) {
  return await fetchJSON<WorkspaceEntity>(`${BASE_URL}/Workspace/${slug}`, {
    method: 'PUT',
    headers: authHeader(token),
    body: JSON.stringify(dto),
  });
}

export async function deleteWorkspace(slug: string, token: string) {
  return await fetch(`${BASE_URL}/Workspace/${slug}`, {
    method: 'DELETE',
    headers: authHeader(token),
  });
}

// database
export async function createDatabase(workspaceId: number, dto: CreateDatabaseDto, token: string) {
  return await fetchJSON<DatabaseEntity>(`${BASE_URL}/workspaces/${workspaceId}/databases`, {
    method: 'POST',
    headers: authHeader(token),
    body: JSON.stringify(dto),
  });
}

export async function getDatabases(workspaceId: number, token: string) {
  return await fetchJSON<DatabaseEntity[]>(`${BASE_URL}/workspaces/${workspaceId}/databases`, {
    headers: authHeader(token),
  });
}

export async function getDatabase(workspaceId: number, slug: string, token: string) {
  return await fetchJSON<DatabaseEntity>(`${BASE_URL}/workspaces/${workspaceId}/databases/${slug}`, {
    headers: authHeader(token),
  });
}

export async function updateDatabase(workspaceId: number, slug: string, dto: CreateDatabaseDto, token: string) {
  return await fetch(`${BASE_URL}/workspaces/${workspaceId}/databases/${slug}`, {
    method: 'PUT',
    headers: authHeader(token),
    body: JSON.stringify(dto),
  });
}

export async function deleteDatabase(workspaceId: number, slug: string, token: string) {
  return await fetch(`${BASE_URL}/workspaces/${workspaceId}/databases/${slug}`, {
    method: 'DELETE',
    headers: authHeader(token),
  });
}

//table
export async function createTable(workspaceId: number, dbSlug: string, dto: CreateTableDto, token: string) {
  return await fetchJSON<TableEntity>(`${BASE_URL}/workspaces/${workspaceId}/databases/${dbSlug}/tables`, {
    method: 'POST',
    headers: authHeader(token),
    body: JSON.stringify(dto),
  });
}

export async function getTables(workspaceId: number, dbSlug: string, token: string) {
  return await fetchJSON<TableEntity[]>(`${BASE_URL}/workspaces/${workspaceId}/databases/${dbSlug}/tables`, {
    headers: authHeader(token),
  });
}

export async function getTable(workspaceId: number, dbSlug: string, tableSlug: string, token: string) {
  return await fetchJSON<TableEntity>(`${BASE_URL}/workspaces/${workspaceId}/databases/${dbSlug}/tables/${tableSlug}`, {
    headers: authHeader(token),
  });
}

export async function updateTable(workspaceId: number, dbSlug: string, tableSlug: string, dto: CreateTableDto, token: string) {
  const response = await fetch(`${BASE_URL}/workspaces/${workspaceId}/databases/${dbSlug}/tables/${tableSlug}`, {
    method: 'PUT',
    headers: authHeader(token),
    body: JSON.stringify(dto),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json(); // <-- IMPORTANT pour récupérer l'objet TableEntity !
}


export async function deleteTable(workspaceId: number, dbSlug: string, tableSlug: string, token: string) {
  return await fetch(`${BASE_URL}/workspaces/${workspaceId}/databases/${dbSlug}/tables/${tableSlug}`, {
    method: 'DELETE',
    headers: authHeader(token),
  });
}


// notebook
export async function createNotebook(workspaceId: number, dto: CreateNotebookDto, token: string) {
  return await fetchJSON<NotebookEntity>(`${BASE_URL}/workspaces/${workspaceId}/notebooks`, {
    method: 'POST',
    headers: authHeader(token),
    body: JSON.stringify(dto),
  });
}

export async function getNotebooks(workspaceId: number, token: string) {
  return await fetchJSON<NotebookEntity[]>(`${BASE_URL}/workspaces/${workspaceId}/notebooks`, {
    headers: authHeader(token),
  });
}

export async function updateNotebook(workspaceId: number, slug: string, dto: CreateNotebookDto, token: string) {
  return await fetch(`${BASE_URL}/workspaces/${workspaceId}/notebooks/${slug}`, {
    method: 'PUT',
    headers: authHeader(token),
    body: JSON.stringify(dto),
  });
}

export async function deleteNotebook(workspaceId: number, slug: string, token: string) {
  return await fetch(`${BASE_URL}/workspaces/${workspaceId}/notebooks/${slug}`, {
    method: 'DELETE',
    headers: authHeader(token),
  });
}

export async function executeCell(workspaceId: string, dto: ExecuteCodeDto, token: string) {
  return await fetch(`${BASE_URL}/workspaces/${workspaceId}/notebooks/execute-cell`, {
    method: 'POST',
    headers: authHeader(token),
    body: JSON.stringify(dto),
  });
}

export async function executeNotebook(workspaceId: string, cells: ExecuteCodeDto[], token: string) {
  return await fetch(`${BASE_URL}/workspaces/${workspaceId}/notebooks/execute-notebook`, {
    method: 'POST',
    headers: authHeader(token),
    body: JSON.stringify(cells),
  });
}


