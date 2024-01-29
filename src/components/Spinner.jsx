import React, { useState, useEffect } from 'react'
import { useNavigate , useLocation } from 'react-router-dom'

const Spinner = ({path ="login"}) => {

    const [count , setCount] = useState (5)
    const navigate = useNavigate();
    const location = useLocation();

    useEffect (()=> {
const interval = setInterval (() => {
    setCount ((prevValue) => --prevValue);
}, 1000);

count === 0 && navigate(`/${path}` , {
    state: location.pathname,
});
return () => clearInterval(interval);
    }, [count, navigate , location , path])
  return (
    <div className='flex justify-center items-center '>
        <button type="button" className="bg-blue-400 " disabled>
  <h1 className='flex justify-center'> redirecting you in {count} second</h1>
  <svg className="animate-spin h-5 w-5 mr-3 " viewBox="0 0 24 24">

  </svg>
  Redirecting...
</button>
    </div>
  )
}

export default Spinner