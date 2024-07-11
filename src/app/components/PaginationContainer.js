'use client';

import Pagination from '@mui/material/Pagination';
import  Box  from '@mui/material/Box';
export default function PaginationContainer({ count, page, url }) {

    const handleChange = (event, value) => {
      window.location.replace(url+ value)
    };

    return <Box sx={{justifyContent:'center',display:'flex', paddingTop:2}}> <Pagination count={count} page={page} onChange={handleChange}/></Box>
}