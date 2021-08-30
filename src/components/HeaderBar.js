// import logo from '../justlogo.png';
import logo from '../just.svg';
import '../styles/HeaderBar.css';
import { SearchIcon } from '@primer/octicons-react';

export default function HeaderBar() {
  return (
    <div className="HeaderBar">
      <div className="col-12 col-sm-2 content" id="logo">
        <img src={logo} className="JUST-logo" alt="JUST logo" />
      </div>
      <div className="hidden-xs col-sm-7 content">
      </div>
      <div className="col-12 col-sm-3 content">
        <form className="form-inline">
          <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
          <button className="btn btn-outline-success my-2 my-sm-0" type="submit"><SearchIcon size={16} /> </button>
        </form>
      </div>
    </div>
  )
}