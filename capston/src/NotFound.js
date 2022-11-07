import React from 'react';
import "./css/notFound.css";

const NotFound = () => {
    return (
        <div className='notFound_App'>
            <div className='notFound_div'>
                <span className='notFound_icon'>😭</span>
                <span className='notFound_text'>앗, 페이지가 없어요.</span>
            </div>  
        </div>
    );
};
  
export default NotFound;