
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { InnerLayout } from '../../styles/Layout';
import { useGlobalContext } from '../../context/globalContext';
import BudgetForm from './BudgetForm';
import BudgetItem from './BudgetItem';

const Budget = () => {
  const { addBudget, budgets, getBudgets, deleteBudget, totalBudget , updateBudget} = useGlobalContext();

  useEffect(() => {
    getBudgets();
  }, []);

  return (
    <BudgetStyled>
      <InnerLayout>
        <h2 className="total-budget">
          Total Budget: <span>Ksh. {totalBudget()}</span>
        </h2>
        <div className="budget-content">
          <div className="form-container">
            <BudgetForm/>
          </div>
          <div className="budgets">
            {budgets.map((budget) => {
              const { _id, title, amount, date, category, description, type } = budget;
              return (
                <BudgetItem
                  key={_id}
                  id={_id}
                  title={title}
                  description={description}
                  amount={amount}
                  date={date}
                  type={type}
                  category={category}
                  indicatorColor="var(--color-green)"
                  deleteItem={deleteBudget}
                  updateItem={updateBudget} 
                />
              );
            })}
          </div>
        </div>
      </InnerLayout>
    </BudgetStyled>
  );
};

const BudgetStyled = styled.div`
  display: flex;
  overflow: auto;
  .total-budget {
    display: flex;
    justify-content: center;
    align-items: center;
    background: #fcf6f9;
    border: 2px solid #ffffff;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    border-radius: 20px;
    padding: 1rem;
    margin: 1rem 0;
    font-size: 2rem;
    gap: 0.5rem;
    span {
      font-size: 1.5rem;
      font-weight: 800;
      color: var(--color-green);
    }
  }
  .budget-content {
    display: flex;
    gap: 2rem;
    .budgets {
      flex: 1;
    }
  }
`;

export default Budget;
