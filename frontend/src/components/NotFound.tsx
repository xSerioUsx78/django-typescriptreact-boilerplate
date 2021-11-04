import styles from './../styles/notFound.module.css';
import { Link } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/outline';


const NotFound = () => {
  return (
    <div className={styles.parent}>
      <div className="mb-14 text-center">
        <h4 className="text-indigo-600 text-4xl mb-7 font-bold">404 not found</h4>
        <Link 
        to="/" 
        className="bg-gray-200 bg-opacity-50 px-3 py-3 text-gray-800
        rounded-md hover:bg-opacity-100 inline-flex items-center">
          <ArrowLeftIcon className="w-5 h-5 text-gray-500 mr-2" aria-hidden={true} />
          <span>Go back to main page</span>
        </Link>
      </div>
    </div>
  )
};
    
export default NotFound;