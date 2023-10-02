// import logo from './logo.svg';
import './App.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHippo } from "@fortawesome/free-solid-svg-icons";

import Login from "./components/Login";
import Router from './components/Router';
import './css/Login.css'

function App() {
  // const [formData, setFormData] = useState({
  //   username: '',
  //   password: '',
  // });

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData({ ...formData, [name]: value });
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const response = await axios.post('http://your-api-url/api/login', formData);
  //     console.log(response.data); // Handle the API response as needed
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  return (
    <Router />
  );
}

export default App;
