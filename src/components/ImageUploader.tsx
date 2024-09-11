"use client";
import React, { useState } from "react";

const ImageUploader = () => {
  const [category, setCategory] = useState("");
  const [message, setMessage] = useState("");

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = e.target.value;
    setCategory(selectedCategory);
    if (selectedCategory) {
      setMessage(`${selectedCategory} 이미지가 업로드 되었습니다!`);
    }
  };

  return (
    <div>
      <input type="file" aria-label="이미지 업로드" />
      <select value={category} onChange={handleSelectChange}>
        <option value="">카테고리를 선택하세요</option>
        <option value="자연">자연</option>
        <option value="도시">도시</option>
        <option value="동물">동물</option>
      </select>
      {message && <h1>{message}</h1>}
    </div>
  );
};

export default ImageUploader;
