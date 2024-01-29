import React, { useState } from 'react'
import styled from 'styled-components'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { useGlobalContext } from '../../context/globalContext';
import { BsDice6 } from "react-icons/bs";
import Button from '../button/Button';
const ExpenseForms = () => {
    const {addExpense, getExpenses,error, setError } = useGlobalContext()
    const [inputState , setInputState] = useState({
        title : '',
        amount: '',
        date:'',
        category:'',
        description:'',
    })

    const { title, amount , date , category, description} =inputState;
const handleInput = name => e => {
    setInputState({...inputState , [name]: e.target.value})
    setError('')
}

const handleSubmit= e => {
    e.preventDefault()
    addExpense(inputState)
    setInputState({
        title:'',
        amount:'',
        date:'',
        category:'',
        description:'',
    })
    getExpenses()
}
return (
    <ExpenseFormStyled onSubmit={handleSubmit}>
        {error && <p className='error'>{error}</p>}
        <div className="input-control">
            <input
             type="text"
             value= {title}
             name={'title'}
             placeholder='  Name of the Expense'
             onChange={handleInput('title')}
             />
        </div>
        <div className="input-control">
            <input
             type="text"
             value= {amount}
             name={'amount'}
             placeholder='Amount of the Expense'
             onChange={handleInput('amount')}
             />
        </div>
        <div className="input-control">
            <DatePicker
            id='date'
            placeholderText='Insert the Expense Date '
            selected={date}
            dateFormat="dd/MM/yyyy"
            onChange={(date) => {
                setInputState({...inputState , date: date})
            }}
           />
        </div>
        <div className="selects input-control">
                <select required value={category} name="category" id="category" onChange={handleInput('category')}>
                    <option value=""  disabled >Select expense category</option>
                  
                    <option value="Feed Costs">Feed Costs</option>
                    <option value="Veterinary Care">Veterinary Care</option>
                    <option value="Housing and Equipment">Housing and Equipment</option>
                    <option value="Utilities">Utilities</option>
                    <option value="Labor Costs">Labor Costs</option>
                    <option value="Insurance">Insurance</option>
                    <option value="Transportation">Transportation</option>
                    <option value="Marketing and Packaging">Marketing and Packaging</option>
                    
                </select>
            </div>

            <div className="input-control">
                <textarea name="description" value={description} placeholder='Brief Description of the expense' id="description" cols="30" rows="4" onChange={handleInput('description')}></textarea>
            </div>
            <div className="submit-btn">
            <Button 
                    name={'Add Expense'}
                    icon = <BsDice6/>
                    bPad={'.8rem 1.6rem'}
                    bRad={'30px'}
                    bg={'var(--color-accent'}
                    color={'#fff'}
                />
            </div>

    </ExpenseFormStyled>
  )
}

const ExpenseFormStyled = styled.form`
display: flex;
    flex-direction: column;
    gap: 2rem;
    input, textarea, select{
        font-family: inherit;
        font-size: inherit;
        outline: none;
        border: none;
        
        border-radius: 5px;
        border: 2px solid #fff;
        background: transparent;
        resize: none;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        color: rgba(34, 34, 96, 0.9);
        &::placeholder{
            color: rgba(34, 34, 96, 0.4);
        }
    }
    .input-control{
        input{
            width: 100%;
        }
    }

    .selects{
        display: flex;
        justify-content: flex-end;
        select{
            color: rgba(34, 34, 96, 0.4);
            &:focus, &:active{
                color: rgba(34, 34, 96, 1);
            }
        }
    }
    .submit-btn{
        button{
            box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
            &:hover{
                background: var(--color-green) !important;
            }
        }
    }

`

export default ExpenseForms