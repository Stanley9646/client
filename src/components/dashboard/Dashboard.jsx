// import React , {useEffect} from 'react'
// import styled from 'styled-components'
// import { InnerLayout } from '../../styles/Layout'
// import Chart from '../chart/Chart'
// import { useGlobalContext } from '../../context/globalContext'
// import History from '../history/History'

// const Dashboard = () => {
//   const {totalIncome, totalExpense, totalBalance, getExpenses , getIncomes} = useGlobalContext()
  
//   useEffect(() => {
//     getIncomes()
//     getExpenses()
// }, [])

//   return (
//     <DashboardStyled>
//         <InnerLayout>
//           <div className="stats-con">
//             <div className="chart-con">
//               <Chart/>
//               <div className="amount-con">
//                 <div className="income">
//                   <h2>Total Income</h2>
//                 <p>ksh . {totalIncome()}</p>
//                 </div>
//                 <div className="expense">
//                   <h2>Total Expense</h2>
//                 <p>ksh . {totalExpense()}</p>
//                 </div>
//                 <div className="balance">
//                   <h2>Total Balance</h2>
//                 <p>ksh . {totalBalance()}</p>
//                 </div>
//               </div>
//             </div>
//             <div className="history-con"></div>
//             <History/>
//             </div>  
//         </InnerLayout>
//     </DashboardStyled>
//   )
// }

// const DashboardStyled = styled.div`
// .stats-con{
//   display: grid;
//   grid-template-columns: repeat(5, 1fr);
//   gap: 1rem;
//   .chart-con{
//       grid-column: 1 / 4;
//       height: 350px;
//       .amount-con{
//           display: grid;
//           grid-template-columns: repeat(2, 1fr);
//           gap: 1rem;
//           margin-top: 2rem;
//           .income, .expense{
//               grid-column: span 1;
//           }
//           .income, .expense, .balance{
//               background: #FCF6F9;
//               border: 2px solid #FFFFFF;
//               box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
//               border-radius: 20px;
//               padding: 1rem;
//               p{
//                   font-size: 3.5rem;
//                   font-weight: 700;
//               }
//           }

//           .balance{
//               grid-column: 1 / 4;
//               display: flex;
//               flex-direction: column;
//               justify-content: center;
//               align-items: center;
//               p{
//                   color: var(--color-green);
//                   opacity: 0.6;
//                   font-size: 4.5rem;
//               }
//           }
//       }
//   }

//   .history-con{
//       grid-column: 4 / -3;
//       h2{
//           margin: 1rem 0;
//           display: flex;
//           align-items: center;
//           justify-content: space-between;
//       }
//       .salary-title{
//           font-size: 1.2rem;
//           span{
//               font-size: 1.8rem;
//           }
//       }
//       .salary-item{
//           background: #FCF6F9;
//           border: 2px solid #FFFFFF;
//           box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
//           padding: 1rem;
//           border-radius: 20px;
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           p{
//               font-weight: 600;
//               font-size: 1.6rem;
//           }
//       }
//   }
// }
// `

// export default Dashboard
import React, { useEffect } from 'react';
import Chart from '../chart/Chart';
import { useGlobalContext } from '../../context/globalContext';
import History from '../history/History';

const Dashboard = () => {
  const { totalIncome, totalExpense, totalBalance, getExpenses, getIncomes } = useGlobalContext();

  useEffect(() => {
    getIncomes();
    getExpenses();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
      <div className="md:col-span-3">
        <div className="bg-white p-4 rounded-md shadow-md mb-4">
          <Chart />
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="bg-purple-100 p-4 rounded-md">
              <h2 className="text-lg font-semibold mb-2">Total Income</h2>
              <p className="text-2xl font-bold">ksh. {totalIncome()}</p>
            </div>
            <div className="bg-red-100 p-4 rounded-md">
              <h2 className="text-lg font-semibold mb-2">Total Expense</h2>
              <p className="text-2xl font-bold">ksh. {totalExpense()}</p>
            </div>
          </div>
          <div className="bg-green-100 p-4 rounded-md mt-4">
            <h2 className="text-lg font-semibold mb-2">Total Balance</h2>
            <p className="text-2xl font-bold text-green-700">ksh. {totalBalance()}</p>
          </div>
        </div>
      </div>
      <div className="md:col-span-2">
        <div className="bg-white p-4 rounded-md shadow-md">
          <h2 className="text-xl font-semibold mb-4">Transaction History</h2>
          <History />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
