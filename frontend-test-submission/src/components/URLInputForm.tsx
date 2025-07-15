import React, { useState } from "react";
import {
  Button,
  Container,
  Typography,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";
import URLInputCard from "./URLInputCard";
import {
  isValidShortcode,
  isValidUrl,
  isValidValidityMinutes,
} from "../utils/validators";
import { createShortUrl, ShortenRequest } from "../utils/shorten";

type URLForm = {
  url: string;
  validity?: string;
  shortcode?: string;
};

type URLErrors = {
  url?: string;
  validity?: string;
  shortcode?: string;
};

type Result = {
  shortLink: string;
  expiry: string;
};

const URLInputForm: React.FC = () => {
  const [forms, setForms] = useState<URLForm[]>(Array(5).fill({ url: "" }));
  const [errors, setErrors] = useState<URLErrors[]>(Array(5).fill({}));
  const [results, setResults] = useState<Result[]>([]);
  const [snackbar, setSnackbar] = useState("");

  const handleChange = (index: number, field: keyof URLForm, value: string) => {
    const updated = [...forms];
    updated[index][field] = value;
    setForms(updated);
  };

  const validate = (): boolean => {
    const allErrors: URLErrors[] = [];

    forms.forEach((form, i) => {
      const e: URLErrors = {};
      if (!form.url || !isValidUrl(form.url)) {
        e.url = "Invalid URL";
      }
      if (form.validity && !isValidValidityMinutes(form.validity)) {
        e.validity = "Must be a positive integer";
      }
      if (form.shortcode && !isValidShortcode(form.shortcode)) {
        e.shortcode = "4–10 alphanumeric characters";
      }
      allErrors[i] = e;
    });

    setErrors(allErrors);
    return allErrors.every((e) => Object.keys(e).length === 0);
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    const newResults: Result[] = [];

    for (const form of forms) {
      if (!form.url) continue;

      const payload: ShortenRequest = {
        url: form.url,
        validity: form.validity ? parseInt(form.validity) : undefined,
        shortcode: form.shortcode || undefined,
      };

      try {
        const res = await createShortUrl(payload);
        newResults.push(res);
      } catch (err: any) {
        setSnackbar(err.message || "Something went wrong");
        return;
      }
    }

    setResults(newResults);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        🔗 Affordmed URL Shortener
      </Typography>

      {forms.map((form, idx) => (
        <URLInputCard
          key={idx}
          index={idx}
          data={form}
          errors={errors[idx] || {}}
          onChange={handleChange}
        />
      ))}

      <Box textAlign="center" my={3}>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Shorten URLs
        </Button>
      </Box>

      {results.length > 0 && (
        <Box>
          <Typography variant="h6">Results:</Typography>
          {results.map((r, i) => (
            <Box key={i} my={1}>
              <a href={r.shortLink} target="_blank" rel="noopener noreferrer">
                {r.shortLink}
              </a>{" "}
              — expires at: {new Date(r.expiry).toLocaleString()}
            </Box>
          ))}
        </Box>
      )}

      <Snackbar
        open={!!snackbar}
        autoHideDuration={4000}
        onClose={() => setSnackbar("")}
      >
        <Alert severity="error" onClose={() => setSnackbar("")}>
          {snackbar}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default URLInputForm;
