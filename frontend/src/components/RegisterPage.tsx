import RegisterForm from "./User/RegisterForm";

const RegisterPage = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <img
        src="https://flowbite.com/docs/images/logo.svg"
        className="h-8 p-1"
        alt="Flowbite Logo"
      />
      <h1 className="mb-4 p-1 text-center text-xl font-bold text-white">
        Register
      </h1>
      <div className="max-w-md rounded-md border border-gray-600 bg-[rgb(22,27,34)] p-6 shadow-md">
        <RegisterForm />
      </div>
    </div>
  );
};

export default RegisterPage;
