import { Spin } from "antd";

const LoadingComponent = (type) => {
  return (
    <div
      className={`${
        type === "page"
          ? "w-full h-full flex items-center justify-center"
          : "w-full h-[100vh] flex items-center justify-center"
      }`}
    >
      <Spin />
    </div>
  );
};

export default LoadingComponent;
