import {FC} from "react";
import {Box, Typography} from "@mui/material";
import InboxIcon from '@mui/icons-material/Inbox';

interface EmptyProps {
  description?: string;
}

export const Empty: FC<EmptyProps> = ({description}) => {
  return (
    <Box>
      <InboxIcon fontSize="large" className="mt-4 text-gray-400"/>
      <Typography variant="body1" className="text-gray-400" align="center">{description}</Typography>
    </Box>
  )
}