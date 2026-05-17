import { Button, TextField, Select, MenuItem } from "@mui/material";
import { useForm, Controller, type SubmitHandler } from "react-hook-form";

type FormInput = {
  name: string;
  email: string;
  password: number | string;
  confirmPassword: number | string;
  role: "user" | "business";
  companyName: string;
};

export const RegistrationForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: undefined,
      confirmPassword: undefined,
      role: "user",
      companyName: "",
    },
  });

  const passwordValue = watch("password");
  const confirmPasswordValue = watch("confirmPassword");
  const roleValue = watch("role");

  console.log(roleValue);
  const patternEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const onSubmit: SubmitHandler<FormInput> = (data) => {
    console.log(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="name"
          control={control}
          rules={{
            required: "This is required.",
          }}
          render={({ field }) => (
            <TextField
              placeholder="Enter name"
              sx={{ mr: 3 }}
              helperText={errors.name && errors.name.message}
              error={errors.name ? true : false}
              {...field}
            />
          )}
        />
        <Controller
          name="email"
          control={control}
          rules={{
            required: true,
            pattern: patternEmail,
          }}
          render={({ field }) => (
            <TextField
              placeholder="Enter email"
              sx={{ mr: 3 }}
              helperText={errors.email && "Enter a correct email."}
              error={errors.email ? true : false}
              {...field}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          rules={{
            required: true,
            minLength: 6,
          }}
          render={({ field }) => (
            <TextField
              placeholder="Enter password"
              sx={{ mr: 3 }}
              helperText={errors.password && "Enter at least 6 characters."}
              error={errors.password ? true : false}
              {...field}
            />
          )}
        />
        <Controller
          name="confirmPassword"
          control={control}
          rules={{
            required: true,
            validate: () => passwordValue == confirmPasswordValue,
          }}
          render={({ field }) => (
            <TextField
              placeholder="Repeat password"
              sx={{ mr: 3 }}
              helperText={
                errors.confirmPassword && "The passwords don't match."
              }
              error={errors.confirmPassword ? true : false}
              {...field}
            />
          )}
        />
        <Controller
          name="role"
          control={control}
          rules={{
            required: true,
          }}
          render={({ field }) => (
            <Select sx={{ mr: 3 }} label="Role" {...field}>
              <MenuItem value={"user"}>User</MenuItem>
              <MenuItem value={"business"}>Business</MenuItem>
            </Select>
          )}
        />
        {roleValue === "user" ? (
          ""
        ) : (
          <Controller
            name="companyName"
            control={control}
            rules={{
              required: "Enter company name",
            }}
            render={({ field }) => (
              <TextField
                placeholder="Enter company name"
                sx={{ mr: 3 }}
                helperText={errors.companyName && errors.companyName.message}
                error={errors.companyName ? true : false}
                {...field}
              />
            )}
          />
        )}
        <Button type="submit" variant="outlined" sx={{ height: 56 }}>
          Submit
        </Button>
      </form>
    </>
  );
};
