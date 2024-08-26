"use client";
import Image from "next/image";
import React, { useState } from "react";

const fetchData = async () => {
  const response = await fetch("https://dummyapi.online/api/movies");

  if (!response.ok) {
    throw new Error("데이터를 불러오는 데 실패했습니다.");
  }
  return response.json();
};

const Fetch = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [image, setImage] = useState("");

  const handleFetchData = async () => {
    setLoading(true);
    setError("");
    try {
      const result = await fetchData();
      setData(result);
      setImage(
        "https://upload.wikimedia.org/wikipedia/ko/4/4a/%EC%8B%A0%EC%A7%B1%EA%B5%AC.png"
      );
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={handleFetchData}>데이터 불러오기</button>
      {loading && <p>로딩중...</p>}
      {error && <p>에러 발생!: {error}</p>}
      {data && <div>데이터: {JSON.stringify(data)}</div>}
      {data && <Image src={image} width={50} height={80} alt="이미지" />}
    </div>
  );
};

export default Fetch;
