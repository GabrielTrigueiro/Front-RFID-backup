import { Box } from "@mui/material"
import { UserTable } from "../../shared/components"
import { ContentLayout } from "../../shared/layout"

export const Users = () => {
    return (
      <ContentLayout tittle={'Usuários'}>
        <Box>
          <UserTable/>
        </Box>
      </ContentLayout>
    )
  }