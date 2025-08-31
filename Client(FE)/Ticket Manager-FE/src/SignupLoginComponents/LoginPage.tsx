import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { loginSchema, type LoginInput } from "../schemaValidations/AuthSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { login } from "../redux/AuthSlice";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const LoginPage = () => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  // Mutation for API call
  const mutation = useMutation({
    mutationFn: async (payload: LoginInput) => {
      const response = await axios.post("/api/login", payload);
      return response.data;
    },
    onSuccess: (data) => {
      dispatch(login({ email: data.email })); // store user in Redux
      alert("Login successful");
    },
    onError: (error: any) => {
      alert(error.response?.data?.message || "Login failed");
    },
  });

  const onSubmit = (data: LoginInput) => {
    console.log("12345 ")
    mutation.mutate(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          placeholder="Email or Username"
          {...register("email")}
        />
        {errors.email && <p>{errors.email.message}</p>}

        <input
          type="password"
          placeholder="Password"
          {...register("password")}
        />
        {errors.password && <p>{errors.password.message}</p>}

        <button type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
