import React from "react";
import {
  Modal,
  Backdrop,
  Box,
  Typography,
  Button,
  TextField,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
} from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import workers from "../../../service/workers";
import { useMask } from "@react-input/mask";


const Fade = ({ children, in: open }) => {
  const style = {
    opacity: open ? 1 : 0,
    transition: "opacity 0.5s",
  };

  return <div style={style}>{open ? children : null}</div>;
};

const Index = ({ open, handleClose, item }) => {
  const inputRef = useMask({mask: "+998 (93) ___-__-__",replacement: { _: /\d/ },});

  const initialValues = {
    age: item?.age || "",
    email: item?.email || "",
    first_name: item?.first_name || "",
    last_name: item?.last_name || "",
    gender: item?.gender || "",
    password: item?.password || "",
    phone_number: item?.phone_number || "",
  };

  const handleSubmit = async (values) => {
    const phone = values.phone_number.replace(/\D/g, "");
    if (item) {
      const payload = { id: item.id, ...values };
      try {
        const response = await workers.update(payload);
        if (response.status === 200) {
          window.location.reload();
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const response = await workers.create(values);
        if (response.status === 201) {
          window.location.reload();
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            borderRadius: 8,
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h5" sx={{ mb: 3, textAlign: "center" }}>
            {item ? "Edit Worker" : "Add Worker"}
          </Typography>
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <Field
                  name="age"
                  type="number"
                  as={TextField}
                  label="Age"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  error={Boolean(ErrorMessage)}
                  helperText={<ErrorMessage name="age" component="div" />}
                />
                <Field
                  name="email"
                  type="email"
                  as={TextField}
                  label="Email"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  error={Boolean(ErrorMessage)}
                  helperText={<ErrorMessage name="email" component="div" />}
                />
                <Field
                  name="first_name"
                  type="text"
                  as={TextField}
                  label="First Name"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  error={Boolean(ErrorMessage)}
                  helperText={<ErrorMessage name="first_name" component="div" />}
                />
                <Field
                  name="last_name"
                  type="text"
                  as={TextField}
                  label="Last Name"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  error={Boolean(ErrorMessage)}
                  helperText={<ErrorMessage name="last_name" component="div" />}
                />
                <FormControl component="fieldset" sx={{ my: 2 }}>
                  <RadioGroup row name="gender">
                    <FormControlLabel
                      value="male"
                      control={<Radio />}
                      label="Male"
                    />
                    <FormControlLabel
                      value="female"
                      control={<Radio />}
                      label="Female"
                    />
                  </RadioGroup>
                </FormControl>
                <Field
                  name="password"
                  type="password"
                  as={TextField}
                  label="Password"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  error={Boolean(ErrorMessage)}
                  helperText={<ErrorMessage name="password" component="div" />}
                />
                <Field
                  name="phone_number"
                  type="text"
                  as={TextField}
                  label="Phone Number"
                  fullWidth
                  inputRef={inputRef}
                  margin="normal"
                  variant="outlined"
                  error={Boolean(ErrorMessage)}
                  helperText={<ErrorMessage name="phone_number" component="div" />}
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  disabled={isSubmitting}
                  sx={{ mt: 2 }}
                >
                  {isSubmitting ? "Saving..." : "Save"}
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
      </Fade>
    </Modal>
  );
};

export default Index;
