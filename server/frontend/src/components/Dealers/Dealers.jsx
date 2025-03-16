import React, { useState, useEffect } from 'react';
import "./Dealers.css";
import "../assets/style.css";
import Header from '../Header/Header';
import review_icon from "../assets/reviewicon.png";

const Dealers = () => {
  const [dealersList, setDealersList] = useState([]);
  const [states, setStates] = useState([]);

  // Backend API URLs
  const BASE_URL = "http://127.0.0.1:8000/djangoapp";
  const dealer_url = `${BASE_URL}/get_dealers/`;

  // Fetch dealers list
  const get_dealers = async () => {
    try {
      const res = await fetch(dealer_url, { method: "GET" });
      const retobj = await res.json();

      if (retobj.status === 200 && retobj.dealers) {
        let all_dealers = retobj.dealers;
        let uniqueStates = Array.from(new Set(all_dealers.map(dealer => dealer.state)));

        setStates(uniqueStates);
        setDealersList(all_dealers);
      }
    } catch (error) {
      console.error("Error fetching dealers:", error);
    }
  };

  // Filter dealers by state
  const filterDealers = async (state) => {
    let url = state === "All" ? dealer_url : `${dealer_url}${state}`;
    
    try {
      const res = await fetch(url, { method: "GET" });
      const retobj = await res.json();

      if (retobj.status === 200 && retobj.dealers) {
        setDealersList(retobj.dealers);
      }
    } catch (error) {
      console.error("Error fetching dealers by state:", error);
    }
  };

  useEffect(() => {
    get_dealers();
  }, []);  

  let isLoggedIn = sessionStorage.getItem("username") !== null;

  return (
    <div>
      <Header />

      <table className='table'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Dealer Name</th>
            <th>City</th>
            <th>Address</th>
            <th>Zip</th>
            <th>
              <select name="state" id="state" onChange={(e) => filterDealers(e.target.value)}>
                <option value="" selected disabled hidden>State</option>
                <option value="All">All States</option>
                {states.map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>        
            </th>
            {isLoggedIn && <th>Review Dealer</th>}
          </tr>
        </thead>
        <tbody>
          {dealersList.map(dealer => (
            <tr key={dealer.id}>
              <td>{dealer.id}</td>
              <td><a href={`/dealer/${dealer.id}`}>{dealer.full_name}</a></td>
              <td>{dealer.city}</td>
              <td>{dealer.address}</td>
              <td>{dealer.zip}</td>
              <td>{dealer.state}</td>
              {isLoggedIn && (
                <td>
                  <a href={`/postreview/${dealer.id}`}>
                    <img src={review_icon} className="review_icon" alt="Post Review"/>
                  </a>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dealers;
