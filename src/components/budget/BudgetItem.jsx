import React, { useState } from 'react';
import styled from 'styled-components';

import { dateFormat } from '../../utils/dateFormat';

const BudgetItem = ({
  id,
  title,
  amount,
  date,
  category,
  description,
  deleteItem,
  updateItem,
  indicatorColor,
  type,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedData, setUpdatedData] = useState({
    title,
    amount,
    date,
    category,
    description,
  });

  const handleUpdateClick = () => {
    setIsEditing(true);
  };

  const handleCancelUpdate = () => {
    console.log("Cancel button clicked");
    setUpdatedData({
        title,
        amount,
        date,
        category,
        description,
      });
    setIsEditing(false);
  };

  const handleUpdate = () => {
    // Call the updateItem function with the updatedData and item ID
    updateItem(id, updatedData);
    setIsEditing(false);

    // setUpdatedData({
    //     title: '',
    //     amount: '',
    //     date: '',
    //     category: '',
    //     description: '',
    //   });
  };

 

  return (
    <BudgetItemStyled>
      
      <div className="inner-content">
        {isEditing ? (
          <div className="edit-form p-4 bg-gray-100 rounded-md">
          <label htmlFor="edit-title" className="block text-gray-700 font-bold mb-2">Title</label>
          <input
            type="text"
            value={updatedData.title}
            onChange={(e) => setUpdatedData({ ...updatedData, title: e.target.value })}
            className="border-2 border-gray-300 p-2 rounded-md w-full mb-2 focus:outline-none focus:border-green-300"
          />
        
          <label htmlFor="edit-amount" className="block text-gray-700 font-bold mb-2">Amount</label>
          <input
            type="number"
            value={updatedData.amount}
            onChange={(e) => setUpdatedData({ ...updatedData, amount: e.target.value })}
            className="border-2 border-gray-300 p-2 rounded-md w-full mb-2 focus:outline-none focus:border-green-300"
          />
        
          <label htmlFor="edit-date" className="block text-gray-700 font-bold mb-2">Date</label>
          <input
            type="date"
            value={updatedData.date}
            onChange={(e) => setUpdatedData({ ...updatedData, date: e.target.value })}
            className="border-2 border-gray-300 p-2 rounded-md w-full mb-2 focus:outline-none focus:border-green-300"
          />
        
          <label htmlFor="edit-category" className="block text-gray-700 font-bold mb-2">Category</label>
          <input
            type="text"
            value={updatedData.category}
            onChange={(e) => setUpdatedData({ ...updatedData, category: e.target.value })}
            className="border-2 border-gray-300 p-2 rounded-md w-full mb-2 focus:outline-none focus:border-green-300"
          />
        
          <label htmlFor="edit-description" className="block text-gray-700 font-bold mb-2">Description</label>
          <input
            type="text"
            value={updatedData.description}
            onChange={(e) => setUpdatedData({ ...updatedData, description: e.target.value })}
            className="border-2 border-gray-300 p-2 rounded-md w-full mb-4 focus:outline-none focus:border-green-300"
          />
        
          {/* Add other fields as needed */}
          <button
            className="bg-green-500 text-white p-2 rounded-md mr-2 hover:bg-green-600 focus:outline-none"
            onClick={handleUpdate}
            name="Update"
          >
            Update
          </button>
          <button
            className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none"
            onClick={handleCancelUpdate}
            name="Cancel"
          >
            Cancel
          </button>
        </div>
        
        ) : (
          <div className="text">
             <p className="text-lg font-semibold mb-2">{title}</p>
            <p className="text-sm opacity-70">ksh.{amount}</p>
            <p className="flex items-center gap-2">
                <span className="text-sm opacity-70">{dateFormat(date)}</span>
                <span className="text-sm opacity-70">{description}</span>
              </p>
          </div>
        )}
        <div className=" flex items-center mt-4">
          {isEditing ? (
            null
          ) : (
            <>
           <button
              className="bg-red-300 p-2 rounded-md text-white mr-2"
              onClick={() => deleteItem(id)}
            >
              Delete
            </button>
            <button
              className="bg-green-300 p-2 rounded-full text-white"
              onClick={handleUpdateClick}
            >
              Update
            </button>
            </>
          )}
        </div>
      </div>
    </BudgetItemStyled>
  );
};

const BudgetItemStyled = styled.div`
background: #FCF6F9;
    border: 2px solid #FFFFFF;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    border-radius: 20px;
    padding: 1rem;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    width: 100%;
    color: #222260;
    .icon{
        width: 80px;
        height: 80px;
        border-radius: 20px;
        background: #F5F5F5;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 2px solid #FFFFFF;
        i{
            font-size: 2.6rem;
        }
    }

    .content{
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: .2rem;
        h5{
            font-size: 1.3rem;
            padding-left: 2rem;
            position: relative;
            &::before{
                content: '';
                position: absolute;
                left: 0;
                top: 50%;
                transform: translateY(-50%);
                width: .8rem;
                height: .8rem;
                border-radius: 50%;
                background: ${props => props.indicator};
            }
        }

        .inner-content{
            display: flex;
            justify-content: space-between;
            align-items: center;
            .text{
                display: flex;
                align-items: center;
                gap: 1.5rem;
                p{
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    color: var(--primary-color);
                    opacity: 0.8;
                }
            }
        }
    }

`;


export default BudgetItem;
