import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ImageUploader from "./ImageUploader";

test("이미지 업로드 후 카테고리 선택 및 메시지가 출력된다", async () => {
  // 컴포넌트 렌더링
  render(<ImageUploader />);

  // 파일 업로드
  const fileInput = screen.getByLabelText(/이미지 업로드/i);
  const file = new File(["dummy content"], "example.png", {
    type: "image/png",
  });
  await userEvent.upload(fileInput, file);

  // 카테고리 선택
  const select = screen.getByRole("combobox");
  await userEvent.selectOptions(select, "자연");

  // 메시지가 h1 태그에 나타나는지 확인
  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
    "자연 이미지가 업로드 되었습니다!"
  );
});
