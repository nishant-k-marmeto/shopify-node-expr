import {
  Form,
  FormLayout,
  Checkbox,
  TextField,
  Button,
} from "@shopify/polaris";
import { useState, useCallback } from "react";

function FormOnSubmitExample() {
  const [newsletter, setNewsletter] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = useCallback(async () => {
    const sessionData = {
      id: "session_id_123", // You can generate this dynamically if needed
      content: JSON.stringify({
        email,
        name,
        password,
        confirmPassword,
        newsletter,
      }),
      shop: "example.myshopify.com", // Replace with actual shop data
    };

    try {
      const response = await fetch("/api/save-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sessionData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Session saved:", result);
      } else {
        console.error("Failed to save session");
      }
    } catch (error) {
      console.error("Error during fetch:", error);
    }

    setEmail("");
    setName("");
    setPassword("");
    setConfirmPassword("");
    setNewsletter(false);
  }, [email, name, password, confirmPassword, newsletter]);

  const handleNewsLetterChange = useCallback(
    (value) => setNewsletter(value),
    []
  );
  const handleEmailChange = useCallback((value) => setEmail(value), []);
  const handleNameChange = useCallback((value) => setName(value), []);
  const handlePasswordChange = useCallback((value) => setPassword(value), []);
  const handleConfirmPasswordChange = useCallback(
    (value) => setConfirmPassword(value),
    []
  );

  return (
    <Form onSubmit={handleSubmit}>
      <FormLayout>
        <TextField
          value={name}
          onChange={handleNameChange}
          label="Name"
          type="text"
          autoComplete="name"
        />

        <TextField
          value={email}
          onChange={handleEmailChange}
          label="Email"
          type="email"
          autoComplete="email"
        />

        <TextField
          value={password}
          onChange={handlePasswordChange}
          label="Password"
          type="password"
          autoComplete="current-password"
        />

        <TextField
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          label="Confirm Password"
          type="password"
          autoComplete="current-password"
        />

        <Checkbox
          label="Sign up for the Polaris newsletter"
          checked={newsletter}
          onChange={handleNewsLetterChange}
        />

        <Button submit>Submit</Button>
      </FormLayout>
    </Form>
  );
}

export default FormOnSubmitExample;
