import { useState } from "react";
import { ContentLayout } from "../../shared/layout";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from '@mui/material/Tabs';
import { Typography } from "@mui/material";
import { AlertTable, MustBuyTable } from "../../shared/components";

//prop da tabela do dashboard
interface TabProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

//tabela
function TabPanel(props: TabProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box pt={2}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export const Dashboard = () => {
  const [value, setValue] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <ContentLayout tittle={"Dashboard"}>
      <Box height={"100%"}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Alertas" {...a11yProps(0)} />
            <Tab label="Produtos mais vendidos" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <AlertTable/>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <MustBuyTable/>
        </TabPanel>
      </Box>
    </ContentLayout>
  );
};
