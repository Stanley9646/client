import React , {useState} from 'react'
import styled from 'styled-components'
import { BsDice6 } from "react-icons/bs";
import Button from '../button/Button';
import { dateFormat } from '../../utils/dateFormat'
const IncomeItem = (
    {
        id,
        title,
        amount,
        date,
        category,
        description,
        deleteItem,
        updateItem,
        indicatorColor,
        type
    }
) => {
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

    setUpdatedData({
        title: '',
        amount: '',
        date: '',
        category: '',
        description: '',
      });
  };
    const categoryIcon = () => {
        switch (category) {
            case 'salary':
                return <BsDice6 />;
            case 'freelancing':
                return <BsDice6 />;


            default:
                return ''
        }
    }
    const expenseCatIcon = () => {
        switch (category) {
            case 'education':
                return <BsDice6 />;
            case 'groceries':
                return <BsDice6 />;

            default:
                return ''
        }
    }
    return (
        <IncomeItemStyled>

            {/* <div className="icon">
                {type === 'expense' ? expenseCatIcon() : categoryIcon()}

            </div>
            <div className="inner-content">

                <div className="text">
                    <p>{amount}</p>
                    <p>
                        {
                            dateFormat(date)}
                        {description}
                    </p>

                </div>
                <div className="btn-con">
                    <Button
                        icon=<BsDice6 />
                        bPad={'1rem'}
                        bRad={'50%'}
                        bg={'var(--primary-color'}
                        color={'#fff'}
                        iColor={'#fff'}
                        hColor={'var(--color-green)'}
                        onClick={() => deleteItem(id)}
                    />
                </div>
            </div> */}
            <div className="icon">{type === 'expense' ? expenseCatIcon() : categoryIcon()}</div>
      <div className="inner-content">
        {isEditing ? (
          <div className="edit-form">
           
            <label htmlFor="edit-title">Title</label>
            <input
              type="text"
              value={updatedData.title}
              onChange={(e) => setUpdatedData({ ...updatedData, title: e.target.value })}
            />
            <label htmlFor="edit-amount">Amount</label>
            <input
              type="number" // Use appropriate input type for the amount
              value={updatedData.amount}
              onChange={(e) => setUpdatedData({ ...updatedData, amount: e.target.value })}
            />
            <label htmlFor="edit-Date">date</label>
             <input
              type="date" // Use appropriate input type for the amount
              value={updatedData.date}
              onChange={(e) => setUpdatedData({ ...updatedData, date: e.target.value })}
            />
            <label htmlFor="edit-category">Category</label>
             <input
              type="text" // Use appropriate input type for the amount
              value={updatedData.category}
              onChange={(e) => setUpdatedData({ ...updatedData, category: e.target.value })}
            />
            <label htmlFor="edit-Description">Description</label>
             <input
              type="text" // Use appropriate input type for the amount
              value={updatedData.description}
              onChange={(e) => setUpdatedData({ ...updatedData, description: e.target.value })}
            />
            {/* Add other fields as needed */}
            <Button onClick={handleUpdate} name="Update" />
            <Button onClick={handleCancelUpdate} name="Cancel" />
          </div>
        ) : (
          <div className="text">
            <p>{amount}</p>
            <p>{dateFormat(date)}{description}</p>
          </div>
        )}
        <div className="btn-con">
          {isEditing ? (
            null
          ) : (
            <>
              <Button
                icon={<BsDice6 />}
                bPad={'1rem'}
                bRad={'50%'}
                bg={'var(--primary-color'}
                color={'#fff'}
                iColor={'#fff'}
                hColor={'var(--color-green)'}
                onClick={() => deleteItem(id)}
              />
              <Button
                icon={<BsDice6 />}
                bPad={'1rem'}
                bRad={'50%'}
                bg={'var(--primary-color'}
                color={'#fff'}
                iColor={'#fff'}
                hColor={'var(--color-green)'}
                onClick={handleUpdateClick}
              />
            </>
          )}
        </div>
      </div>

        </IncomeItemStyled>
    )
}

const IncomeItemStyled = styled.div`
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
`

export default IncomeItem