export function saveToLS(name: string, data: any) {
  localStorage.setItem(name, JSON.stringify(data));
}

export function removeFromLS(name: string) {
  localStorage.removeItem(name);
}

export function retrieveFromLS(name: string): any | null {
  const objectStr = localStorage.getItem(name);
  if (objectStr) {
    return JSON.parse(objectStr);
  }
  return null;
}
