import React, {useRef} from 'react';
import { Link } from 'react-router-dom';
import ReactToPrint from 'react-to-print';

const SimpleComponent = props => {
	const { printRef } = props;
  
	return <div ref={printRef}>
		<h1>Title</h1>
		<p>abcd efg</p>
		<p>아주 간단한 컴포넌트입니다.</p>
		
	</div>;
};

const Main = (props) => {
	const componentRef = useRef(null);

	return (
	  <div>
		<ReactToPrint
		  trigger={() => <button>프린트하기</button>}
		  content={() => componentRef.current}
		/>
  
		<SimpleComponent printRef={componentRef} />
	  </div>
	);
};

export default Main;