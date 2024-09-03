import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

// 폼 입력 데이터의 타입 정의
interface IFormInput {
  name: string;
  email: string;
}

const MyForm: React.FC = () => {
  // useForm 훅을 사용하여 폼을 초기화하고 타입을 지정
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  // 폼 제출 핸들러
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="name">이름</label>
        <input
          id="name"
          {...register("name", { required: "이름은 필수 항목 입니다." })}
        />
        {errors.name && <span role="alert">{errors.name.message}</span>}
      </div>

      <div>
        <label htmlFor="email">이메일</label>
        <input
          id="email"
          type="email"
          {...register("email", {
            required: "이메일은 필수 항목 입니다.",
            pattern: {
              value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
              message: "올바른 이메일 주소를 입력하세요.",
            },
          })}
        />
        {errors.email && <span role="alert">{errors.email.message}</span>}
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default MyForm;
