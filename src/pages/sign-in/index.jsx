import {
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { auth } from "../../service/index";
import { Notification } from "../../utils/index";
import { signInValidationSchema } from "../../utils/validation";
import  "./style.css"

const Index = () => {
  const initialValues = {
    email: "",
    password: "",
  };
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handleSubmit = async (values) => {
    try {
      const response = await auth.sign_in(values);
      if (response.status === 200) {
        navigate("/");
        localStorage.setItem("access_token", response.data.access_token);
        Notification({
          title: "Sign In Successfuly",
          type: "success",
        });
      }
    } catch (error) {
      console.error(error);
      Notification({
        title: "Sign In Failed",
        type: "error",
      });
    }
  };
  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      navigate("/");
    }
  }, []);

  return (
    <div className="login-wrp w-full h-[100vh] flex items-center justify-center">
    <div className="max-w-[710px] w-full py-10 px-20 rounded-tl-[30px] rounded-br-3xl shadow-[30px] bg-[rgba(79,86,98,0.74)]">
      <h1 className="text-center mb-5 text-[56px] font-bold text-white">Log in</h1>
      <div className="max-w-[600px]">
      <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={signInValidationSchema}
          >
            {({ isSubmitting }) => (
              <Form>
                <Field
                  name="email"
                  type="email"
                  as={TextField}
                  label="Email address"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  helperText={
                    <ErrorMessage
                      name="email"
                      component="span"
                      className="text-[red] text-[18px]"
                    />
                  }
                />
                <Field
                  name="password"
                  type={showPassword ? "text" : "password"}
                  as={TextField}
                  label="Password"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  helperText={
                    <ErrorMessage
                      name="password"
                      component="span"
                      className="text-[red] text-[15px]"
                    />
                  }
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <p
                  className="mb-3 cursor-pointer text-blue-500"
                >
                  Parolni unutdingizmi?
                </p>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  disabled={isSubmitting}
                  sx={{ marginBottom: "8px", padding: "10px", fontSize: "17px" }}
                >
                  {isSubmitting ? "Signing" : "Login"}
                </Button>
              </Form>
            )}
          </Formik>
      </div>
    </div>
  </div>
  );
};

export default Index;



