//  <div className='w-full h-screen justify-center items-center py-12 mt-10'>
      
//         <p className='home-text'>{JSON.stringify(global, null, 4)}</p>
//       </div> 
import React, { useState } from 'react';
import Dashboard from '../components/dashboard/Dashboard';
import Income from '../components/income/Income';
import Expenses from '../components/expenses/Expenses';
import { useGlobalContext } from '../context/globalContext';
import { MainLayout } from '../styles/Layout';
import Navigation from '../components/navigation/Navigation';
import styled from 'styled-components';
import Budget from '../components/budget/Budget';

const Home = () => {
  const [active, setActive] = useState(1);
  const global = useGlobalContext();

  const displayData = () => {
    switch (active) {
      case 1:
        return <Dashboard />;
      case 2:
        return <Budget />;
      case 3:
        return <Income />;
      case 4:
        return <Expenses />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <HomeStyled>
      <MainLayout>
        <Navigation active={active} setActive={setActive} />
        <main>
        {displayData()}
        </main>
      </MainLayout>
    </HomeStyled>
  );
}

const HomeStyled = styled.div`
  height: 100vh;
  position: relative;
  position: relative;
  main {
    flex: 1;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #FFFFFF;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    overflow-x: hidden;
    &::-webkit-scrollbar {
      width: 0;
    }
  }
`;

export default Home;

