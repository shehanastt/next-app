'use client';

import Image from 'next/image';
import Link from 'next/link';
import ListProducts from './products/page';
import { Button, Typography } from '@mui/material';

 const Home = ()=>  {
  return (
    <div >
      <ListProducts/>
    </div>
  );
}

export default Home
