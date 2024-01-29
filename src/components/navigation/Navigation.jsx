import React  from 'react'
import styled from 'styled-components'
import { menuItems } from '../../utils/MenuItems'
import { useAuth } from '../../context/auth';
import { useGlobalContext } from '../../context/globalContext';
import { useNavigate } from 'react-router-dom';

const Navigation = ({active , setActive}) => {
    const {totalBalance} = useGlobalContext()
    const [auth , setAuth] = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('auth');
      setAuth({ user: null, token: '' });
      
      
      navigate('/login');
    };
  return (
    <NavStyled>
<div className="user-con">

        <div className="text">
          <h2>{auth.user ? auth.user.name : ''}</h2>
          <p>ksh . {totalBalance()}</p>
        </div>
      </div>
    <ul className='menu-items'>
        {menuItems.map( (item) => {
            return <li 
           key = {item.id} 
           onClick={() => setActive(item.id)}
           className= {active === item.id ? 'active' : ''}
            >
                {item.icon}
                <span>{item.title}</span>
            </li>
        })}
    </ul>
    <div className="bottom-nav">
        <button onClick={handleLogout}>
             Log Out
        </button>
    </div>

    </NavStyled>
  )
}

const NavStyled = styled.div`
padding: 2rem 1.5rem;
width: 374px;
height: 100%;
background: rgba(252, 246, 249, 0.78);
border: 3px solid #FFFFFF;
backdrop-filter: blur(4.5px);
border-radius: 32px;
display: flex;
flex-direction: column;
justify-content: space-between;
gap: 2rem;
.user-con{
    height: 100px;
    display: flex;
    align-items: center;
    gap: 1rem;
  
    h2{
        color: rgba(34, 34, 96, 1);
    }
    p{
        color: rgba(34, 34, 96, .6);
    }
}

.menu-items{
    flex: 1;
    display: flex;
    flex-direction: column;
    li{
        display: grid;
        grid-template-columns: 40px auto;
        align-items: center;
        margin: .6rem 0;
        font-weight: 500;
        cursor: pointer;
        transition: all .4s ease-in-out;
        color: rgba(34, 34, 96, .6);
        padding-left: 1rem;
        position: relative;
        i{
            color: rgba(34, 34, 96, 0.6);
            font-size: 1.4rem;
            transition: all .4s ease-in-out;
        }
    }
}

.active{
    color: rgba(34, 34, 96, 1) !important;
    i{
        color: rgba(34, 34, 96, 1) !important;
    }
    &::before{
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        width: 4px;
        height: 100%;
        background: #222260;
        border-radius: 0 10px 10px 0;
    }
}

`

export default Navigation