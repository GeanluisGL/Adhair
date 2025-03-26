import './Style/Container.css'
const Container = ({children, className}) => {
    return (
     <div className="Container max-w-4xl mx-auto p-4 bg-white shadow-md rounded-lg">

        {children}

     </div>
    );
  };
  
  export default Container;