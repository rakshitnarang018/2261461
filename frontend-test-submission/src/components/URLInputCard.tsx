import React from "react";
import {
  Card,
  CardContent,
  TextField,
  Grid,
  Typography,
} from "@mui/material";

type Props = {
  index: number;
  data: {
    url: string;
    validity?: string;
    shortcode?: string;
  };
  errors: {
    url?: string;
    validity?: string;
    shortcode?: string;
  };
  onChange: (index: number, field: string, value: string) => void;
};

const URLInputCard: React.FC<Props> = ({ index, data, errors, onChange }) => {
  return (
    <Card variant="outlined" sx={{ my: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          URL #{index + 1}
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Long URL"
              value={data.url}
              onChange={(e) => onChange(index, "url", e.target.value)}
              error={!!errors.url}
              helperText={errors.url}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Validity (mins)"
              value={data.validity || ""}
              onChange={(e) => onChange(index, "validity", e.target.value)}
              error={!!errors.validity}
              helperText={errors.validity}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Custom Shortcode"
              value={data.shortcode || ""}
              onChange={(e) => onChange(index, "shortcode", e.target.value)}
              error={!!errors.shortcode}
              helperText={errors.shortcode}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default URLInputCard;
