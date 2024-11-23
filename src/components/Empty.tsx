import { ComponentPropsWithoutRef } from 'react';
import { Box, Typography } from "@mui/material";
import InboxIcon from '@mui/icons-material/Inbox';

type EmptyProps = ComponentPropsWithoutRef<typeof Box> & {
  description?: string;
}

export const Empty = ({ description }: EmptyProps) => {
  return (
    <Box sx={{}} alignContent="center" textAlign="center">
      <InboxIcon fontSize="large" color="action"/>
      <Typography variant="body1" color="textSecondary" align="center">{description}</Typography>
    </Box>
  )
}