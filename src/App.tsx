import * as React from 'react';
import Layout from './Layout/index'; 
import { RecoilRoot } from 'recoil';
export default function App() {
  return (
    <RecoilRoot>
      <Layout />
    </RecoilRoot>
  );
}