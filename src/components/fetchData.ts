export default async function fetchData(): Promise<any> {
  const response = await fetch("https://dummyapi.online/api/movies");

  if (!response.ok) {
    throw new Error("데이터를 불러오는 데 실패했습니다.");
  }
  return response.json();
}
