import * as React from 'react';
import moment from 'moment';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { TempLineChart } from './TempLineChart';

function CustomTabPanel({ value, index, dayData }) {
  //   console.log(dayData);
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && <TempLineChart dayData={dayData} />}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs({ fiveDayData }) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          sx={{ flexGrow: 1 }} // Add this line to make the Tabs stretch
        >
          {fiveDayData.map((dayData, index) => (
            <Tab
              key={index}
              label={moment.unix(dayData[0].dt).format('dddd')}
              sx={{
                color: value === index ? 'orange' : 'white',
                '&.Mui-selected': {
                  color: 'orange',
                },
              }}
              {...a11yProps(index)}
            />
          ))}
        </Tabs>
      </Box>
      {fiveDayData.map((dayData, index) => (
        <CustomTabPanel
          key={index}
          value={value}
          index={index}
          dayData={dayData}
        />
      ))}
    </Box>
  );
}
