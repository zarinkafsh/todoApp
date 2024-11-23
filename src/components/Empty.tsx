import { ComponentPropsWithoutRef } from 'react';
import { Box, Typography } from "@mui/material";
import InboxIcon from '@mui/icons-material/Inbox';

type EmptyProps = ComponentPropsWithoutRef<typeof Box> & {
  description?: string;
}

export const Empty = ({ description }: EmptyProps) => {
  return (
    <Box>
      <InboxIcon fontSize="large" />
      <Typography variant="body1" align="center">{description}</Typography>
    </Box>
  )
}