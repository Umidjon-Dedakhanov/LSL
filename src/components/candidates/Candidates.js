import React, { useEffect, useState } from "react";
import userpayment_services from "../../api/userpayment-services";
import registration_services from "../../api/registration-services";
import "./Candidates.css";
import {FiUsers, FiUserCheck, FiUserX} from "react-icons/fi"
import NewLoader from "../Loader/NewLoader"

const Candidates = () => {
  const [allUserRecords, setAllUserRecords] = useState([]);
  const [allUserRecordsFilter, setAllUserRecordsFilter] = useState([]);
  const [loading, setIsLoading] = useState(false);
  const [btnLoading, setBtnIsLoading] = useState(false);
  const [updatedResults, setUpdatesResults] = useState({
    proceeded: [],
    not_proceeded: [],
  });
  const [updateToProceedThePayment, setUpdateToProceedThePayment] = useState(
    []
  );
  const [updateToNotProceedThePayment, setUpdateNotToProceedThePayment] =
    useState([]);
  useEffect(() => {
    const fetchUsers = () => {
      setIsLoading(true);
      registration_services
        .get("/")
        .then((users) => {
          setAllUserRecords(users.data);
          setAllUserRecordsFilter(users.data);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
        });
    };
    fetchUsers();
  }, [updatedResults]);
  if (allUserRecords) {
    var { password, __v, ...tableHeadProperties } = allUserRecords[0] || {};
    tableHeadProperties.change_status = "";
  }
  const collectThePaidIds = (event, id) => {
    if (event.target.value === "paid") {
      setUpdateToProceedThePayment([...updateToProceedThePayment, id]);
      let canceledId = updateToNotProceedThePayment.indexOf(id);
      updateToNotProceedThePayment.splice(canceledId, 1);
    } else if (event.target.value === "notpaid") {
      setUpdateNotToProceedThePayment([...updateToNotProceedThePayment, id]);
      let canceledId = updateToProceedThePayment.indexOf(id);
      updateToProceedThePayment.splice(canceledId, 1);
    }
  };
  const notPaidUser = allUserRecords
    .filter((user) => !user.payment_proceeded)
    .map((user) => user._id);
  const paidUser = allUserRecords
    .filter((user) => user.payment_proceeded)
    .map((user) => user._id);
  const updateSelectedUsersToUpdate = () => {
    setBtnIsLoading(true)
    userpayment_services
      .patch("/proceed", {
        payment_proceeded_updates: updateToProceedThePayment.concat(paidUser),
      })
      .then((result) => {
        setBtnIsLoading(false)
        setUpdatesResults({ ...updatedResults, proceeded: result.data });
      })
      .catch((err) => console.log(err));
  };

  const updateSelectedUnpaidUser = () => {
    setBtnIsLoading(true)

    userpayment_services
      .patch("/notproceed", {
        payment_notproceeded_updates:
          updateToNotProceedThePayment.concat(notPaidUser),
      })
      .then((result) =>{
        setUpdatesResults({ ...updatedResults, not_proceeded: result.data })
         setBtnIsLoading(false)
}
      )
      .catch((err) => console.log(err));
  };
  // console.log("NOT",updateToNotProceedThePayment);
  // console.log("PAID", updateToProceedThePayment);
  console.log("allUserRecords>>>", allUserRecords);
  const filterPaid = (e) => {
    let value = e.target.value;
    let users;
    if (value === "paid") {
      users = allUserRecords.filter((i) => i.payment_proceeded);
    } else if (value === "unpaid") {
      users = allUserRecords.filter((i) => !i.payment_proceeded);
    } else {
      users = allUserRecords.filter(
        (i) => !i.payment_proceeded || i.payment_proceeded
      );
    }
    setAllUserRecordsFilter(users);
  };
  const searchCandidate = (e)=>{
        let users = allUserRecords.filter((i) => i.firstname.toLowerCase().includes(e.toLowerCase()) || i.lastname.toLowerCase().includes(e.toLowerCase()) );
        setAllUserRecordsFilter(users);
  }
  return (
    <div className="candidate_panel">
        <h1>Candidates</h1>
      <div className="candidate_info">
        <h2 className="candidate_infoitem">
            <FiUsers/>
            <span>{allUserRecords.length} </span>
        </h2>
        <h2 className="candidate_infoitem">
            <FiUserCheck/>
            <span>{allUserRecords.filter((i) => i.payment_proceeded).length}</span>
        </h2>
        <h2 className="candidate_infoitem">
            <FiUserX/>
            <span>{allUserRecords.filter((i) => !i.payment_proceeded).length}</span>
        </h2>
      </div>
      <input onChange={(e)=> searchCandidate(e.target.value)} className="candidates_search" placeholder="Search candidates" type="text" />
      <select className="candidates_select" onChange={filterPaid} name="" id="">
          <option value="all">All user</option>
          <option value="paid">Paid</option>
          <option value="unpaid">Unpaid</option>
        </select>
      <div className="table__content">
        
        <table id="candidate__table">
          <thead>
            <tr className="table__rowHead">
                {
                    allUserRecords.length ? <th className="table__head-cell">№</th> : <></>
                }
              {allUserRecords &&
                Object.keys(tableHeadProperties).map((th, index) => (
                  <th key={index} className="table__head-cell">
                    {th.replaceAll("_", " ")}
                  </th>
                ))}
            </tr>
          </thead>
          <tbody>
            {loading ? <NewLoader/> :
            allUserRecordsFilter.length ? (
              allUserRecordsFilter.map((user,inx) => (
                <tr key={user._id} className="table__row">
                  <td className="table__head-cell">{inx+1}</td>
                  <td className="table__head-cell">{user._id}</td>
                  <td className="table__head-cell">{user.firstname}</td>
                  <td className="table__head-cell">{user.lastname}</td>
                  <td
                    className={
                      user.payment_proceeded
                        ? "table__head-cell table__head-cellPaid"
                        : "table__head-cell table__head-cellUnaid"
                    }
                  >
                    {user.payment_proceeded ? "Paid" : "Not Paid"}{" "}
                  </td>
                  <td className="table__head-cell">{user.gained_score} </td>
                  <td className="table__head-cell">
                    <select className="candidates_select" onChange={(e) => collectThePaidIds(e, user._id)}>
                      <option value="n" selected disabled>
                        Select the status
                      </option>
                      <option value="notpaid">Not paid</option>
                      <option value="paid">Paid</option>
                    </select>{" "}
                  </td>
                </tr>
              ))
              
            ) :(
              <h1>No User records</h1>
            )}
          </tbody>
        </table>
      
      </div>
      {updateToProceedThePayment && (
          <>
            {" "}
            <button disabled={btnLoading} className="candidates_btn" onClick={updateSelectedUsersToUpdate}>
              Update Selected paid users
            </button>
            <button disabled={btnLoading} className="candidates_btn" onClick={updateSelectedUnpaidUser}>
              Update Selected  not paid users
            </button>
          </>
        )}
    </div>
  );
};

export default Candidates;
