import { Button, TextField, Select, MenuItem, Box, FormControl, InputLabel } from "@mui/material";
import { useForm, Controller, type SubmitHandler } from "react-hook-form";

type FormInput = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: "user" | "business";
  companyName?: string;
};

export const RegistrationForm = () => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormInput>({
    shouldUnregister: true,
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "user",
      companyName: "",
    },
  });

  const passwordValue = watch("password"); // useWatch()
  const roleValue = watch("role");

  const patternEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const onSubmit: SubmitHandler<FormInput> = (data) => {
    console.log(data);
  };

  return (
    <>
       <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            width: 400,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
        <TextField
          {...register("name", {
            required: "Name is required.",
          })}
          placeholder="Enter name"
          helperText={errors.name?.message}
          error={!!errors.name}
        />
        <TextField
          {...register("email", {
            required: "Email is required.",
            pattern: {
              value: patternEmail,
              message: "Enter a correct email.",
            },
          })}
          placeholder="Enter email"
          helperText={errors.email?.message}
          error={!!errors.email}
        />
        <TextField 
          {...register("password", {
            required: "Password is required.",
            minLength: {
              value: 6,
              message: "Enter at least 6 characters.",
            },
          })}
          placeholder="Enter password"
          helperText={errors.password?.message}
          error={!!errors.password}
        />
        <TextField
          {...register("confirmPassword", {
            required: "Confirm password is required.",
            validate: (confirmPassword) => {
              if (passwordValue !== confirmPassword) {
                return "The passwords don't match.";
              }
              
              return true;
            },
          })}
          placeholder="Repeat password"
          helperText={
            errors.confirmPassword?.message
          }
          error={!!errors.confirmPassword}
        />  
        <Controller
          name="role"
          control={control}
          rules={{
            required: true,
          }}
          render={({ field }) => (
            <FormControl fullWidth>
              <InputLabel id="role-select-label">Role</InputLabel>
              <Select
                labelId="role-select-label"
                id="role-select-label"
                label="Age"
                {...field}
              >
                <MenuItem value={"user"}>User</MenuItem>
                <MenuItem value={"business"}>Business</MenuItem>
              </Select>
            </FormControl>
          )}
        />
        {roleValue === "business" && (
          <TextField
            {...register("companyName", {
              required: "Enter company name",
            })}
            placeholder="Enter company name"
            helperText={errors.companyName?.message}
            error={!!errors.companyName}
          />
        )}
        <Button type="submit" variant="outlined">
          Submit
        </Button>
      </Box>
    </>
  );
};
