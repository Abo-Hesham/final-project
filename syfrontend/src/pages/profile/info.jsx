import React from 'react'
import { useState } from 'react'
import {Box , Tab} from '@mui/material'
import { TabContext , TabList , TabPanel  } from '@mui/lab'
import About from './About'
import UpdateData from './updateData'
const Info = () =>{
  const [value  ,setValue] = useState('1');
  const handleChange = (event: React.SyntheticEvent , newValue: string) => {
    setValue(newValue)
  }
  return(
    <Box>
      <TabContext value={value}>
        <Box sx={{ width:'750px'}}>
          <TabList onChange={handleChange} sx={{borderBottom:1 , borderColor:'divider'}} >
            <Tab label='About' value='1'/>
            <Tab label='Update Your Information' value='2'/>
          </TabList>
          <TabPanel value='1'><About/></TabPanel>
          <TabPanel value='2'><UpdateData/></TabPanel>
        </Box>
      </TabContext>
    </Box>
  )
}


export default Info