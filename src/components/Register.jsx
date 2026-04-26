import { useEffect, useState } from "react";
import axios from "axios";
import {
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Button,
  Card,
  CardBody,
  CardHeader,
  FormFeedback,
  CardFooter,
} from "reactstrap";
const initialValues = {
  ad: "",
  soyad: "",
  email: "",
  password: "",
};
export const errorMessages = {
  ad: "En az 3 karakter içermelidir",
  soyad: "En az 3 karakter içermelidir",
  email: "Geçerli bir email adresi giriniz",
  password:
    "En az 6 karakter içermelidir,en az bir büyük harf, en az bir küçük harf ve en az bir rakam içermelidir",
};
export default function Register() {
  const [formData, setFormData] = useState(initialValues);
  const [errors, setErrors] = useState({
    ad: false,
    soyad: false,
    email: false,
    password: false,
  });
  const [isValid, setIsValid] = useState(false);
  const [id, setId] = useState("");
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      );
  };
  let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;
  useEffect(() => {
    formData.ad.trim().length >= 3 &&
    formData.soyad.trim().length >= 3 &&
    validateEmail(formData.email) &&
    regex.test(formData.password)
      ? setIsValid(true)
      : setIsValid(false);
  }, [formData]);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    if (name === "ad" || name === "soyad") {
      if (value.trim().length >= 3) {
        setErrors({ ...errors, [name]: false });
      } else {
        setErrors({ ...errors, [name]: true });
      }
    }
    if (name === "email") {
      if (validateEmail(value)) {
        setErrors({ ...errors, [name]: false });
      } else {
        setErrors({ ...errors, [name]: true });
      }
    }
    if (name === "password") {
      if (regex.test(value)) {
        setErrors({ ...errors, [name]: false });
      } else {
        setErrors({ ...errors, [name]: true });
      }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!isValid) return;
    axios
      .post("http://reqres.in/api/users", formData)
      .then((response) => {
        setFormData(initialValues);
        setId(response.data.id);
      })
      .catch((error) => {
        console.warn(error);
      });
  };
  return (
    <Card>
      <CardHeader>Kayıt Ol</CardHeader>
      <CardBody>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="ad">Ad:</Label>
            <Input
              id="ad"
              name="ad"
              placeholder="Adınızı Giriniz"
              type="text"
              onChange={handleChange}
              value={formData.ad}
              invalid={errors.ad}
              data-cy="ad-input"
            />
            {errors.ad && (
              <FormFeedback data-cy="error-message">
                {errorMessages.ad}
              </FormFeedback>
            )}
          </FormGroup>
          <FormGroup>
            <Label for="soyad">Soyad:</Label>
            <Input
              id="soyad"
              name="soyad"
              placeholder="Soyadınızı Giriniz"
              type="text"
              onChange={handleChange}
              value={formData.soyad}
              invalid={errors.soyad}
              data-cy="soyad-input"
            />
            {errors.soyad && (
              <FormFeedback data-cy="error-message">
                {errorMessages.soyad}
              </FormFeedback>
            )}
          </FormGroup>
          <FormGroup>
            <Label for="email">Email:</Label>
            <Input
              id="email"
              name="email"
              placeholder="Emailinizi Giriniz"
              type="email"
              onChange={handleChange}
              value={formData.email}
              invalid={errors.email}
              data-cy="email-input"
            />
            {errors.email && (
              <FormFeedback data-cy="error-message">
                {errorMessages.email}
              </FormFeedback>
            )}
          </FormGroup>
          <FormGroup>
            <Label for="password">Password:</Label>
            <Input
              id="password"
              name="password"
              placeholder="Password Giriniz"
              type="password"
              data-cy="password-input"
              onChange={handleChange}
              value={formData.password}
              invalid={errors.password}
            />
            {errors.password && (
              <FormFeedback data-cy="error-message">
                {errorMessages.password}
              </FormFeedback>
            )}
          </FormGroup>
          <Button disabled={!isValid} data-cy="submit-button">
            Kayıt Ol
          </Button>
        </Form>
      </CardBody>
      {id && <CardFooter data-cy="response-message">ID: {id}</CardFooter>}
    </Card>
  );
}
