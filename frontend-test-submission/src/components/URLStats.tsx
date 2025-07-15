import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  Grid,
  Divider,
} from "@mui/material";
import { fetchStats } from "../utils/shorten";

const URLStats: React.FC = () => {
  const [shortcode, setShortcode] = useState("");
  const [error, setError] = useState("");
  const [stats, setStats] = useState<any>(null);

  const handleFetchStats = async () => {
    setError("");
    setStats(null);

    if (!shortcode.trim()) {
      setError("Please enter a shortcode");
      return;
    }

    try {
      const data = await fetchStats(shortcode.trim());
      setStats(data);
    } catch (err: any) {
      setError(err?.response?.data?.error || "Failed to fetch stats");
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        📊 Short URL Statistics
      </Typography>

      <Box display="flex" gap={2} my={2}>
        <TextField
          label="Enter Shortcode"
          value={shortcode}
          onChange={(e) => setShortcode(e.target.value)}
          fullWidth
        />
        <Button variant="contained" onClick={handleFetchStats}>
          Get Stats
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ my: 2 }}>
          {error}
        </Alert>
      )}

      {stats && (
        <Box my={3}>
          <Typography variant="h6">Original URL:</Typography>
          <Typography>{stats.originalUrl}</Typography>

          <Typography variant="h6" mt={2}>
            Created At:
          </Typography>
          <Typography>{new Date(stats.createdAt).toLocaleString()}</Typography>

          <Typography variant="h6" mt={2}>
            Expires At:
          </Typography>
          <Typography>{new Date(stats.expiresAt).toLocaleString()}</Typography>

          <Typography variant="h6" mt={2}>
            Total Clicks:
          </Typography>
          <Typography>{stats.totalClicks}</Typography>

          <Divider sx={{ my: 2 }} />

          <Typography variant="h6">Click Details:</Typography>
          <Grid container spacing={1}>
            {stats.clicks.map((click: any, i: number) => (
              <Grid item xs={12} key={i}>
                <Box border={1} p={1} borderRadius={2}>
                  <Typography variant="body2">
                    <strong>Time:</strong>{" "}
                    {new Date(click.timestamp).toLocaleString()}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Referrer:</strong> {click.referrer || "Direct"}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Location:</strong> {click.location}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Container>
  );
};

export default URLStats;
