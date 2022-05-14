import React, { useEffect, useState } from "react";
import userpayment_services from "../../api/userpayment-services";
import registration_services from "../../api/registration-services";
import "./Candidates.css";
import createTest from "../../api/create-test";
import { FiUsers, FiUserCheck, FiUserX } from "react-icons/fi";
import NewLoader from "../Loader/NewLoader";

const Candidates = () => {
  const [allUserRecords, setAllUserRecords] = useState([]);
  const [allUserRecordsFilter, setAllUserRecordsFilter] = useState([]);
  const [loading, setIsLoading] = useState(false);
  const [deleted, setDeleted] = useState({});
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
          setIsLoading(false);
        });
    };
    fetchUsers();
  }, [updatedResults, deleted]);
  if (allUserRecords) {
    var { password, __v, _id,...tableHeadProperties } = allUserRecords[allUserRecords.length - 1] || {};
    tableHeadProperties.change_status = "";
  }
  const collectThePaidIds = (event, id) => {
    if (event.target.value === "paid") {
      setUpdateToProceedThePayment([...updateToProceedThePayment, id]);
      let canceledId = updateToNotProceedThePayment.indexOf(id);
      if (canceledId !== -1) {
        updateToNotProceedThePayment.splice(canceledId, 1);
      }
    } else if (event.target.value === "notpaid") {
      setUpdateNotToProceedThePayment([...updateToNotProceedThePayment, id]);
      let canceledId = updateToProceedThePayment.indexOf(id);
      if (canceledId !== -1) {
        updateToProceedThePayment.splice(canceledId, 1);
      }
    }
  };

  const notPaidUser = allUserRecords
    .filter((user) => !user.payment_proceeded)
    .map((user) => user._id);

  const paidUser = allUserRecords
    .filter((user) => user.payment_proceeded)
    .map((user) => user._id);

  // Refreshing Paid and Unpiad automatically;
  useEffect(() => {
    if (updateToProceedThePayment.length) {
      userpayment_services
        .patch("/proceed", {
          payment_proceeded_updates: updateToProceedThePayment.concat(paidUser),
        })
        .then((result) => {
          setUpdatesResults({ ...updatedResults, proceeded: result.data });
          setUpdateToProceedThePayment([]);
        })
        .catch((err) => console.log(err));
    } else if (updateToNotProceedThePayment.length) {
      userpayment_services
        .patch("/notproceed", {
          payment_notproceeded_updates:
            updateToNotProceedThePayment.concat(notPaidUser),
        })
        .then((result) => {
          setUpdatesResults({ ...updatedResults, not_proceeded: result.data });
          setUpdateNotToProceedThePayment([]);
        })
        .catch((err) => console.log(err));
    }
  }, [
    updateToProceedThePayment,
    updateToNotProceedThePayment,
    paidUser,
    updatedResults,
    notPaidUser
  ]);

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
  const searchCandidate = (e) => {
    let users = allUserRecords.filter(
      (i) =>
        i.firstname.toLowerCase().includes(e.toLowerCase()) ||
        i.lastname.toLowerCase().includes(e.toLowerCase())
    );
    setAllUserRecordsFilter(users);
  };

  const handleDelteUser = (id) => {
    createTest.delete(`/user/registration/${id}`)
      .then(res => setDeleted(res) )
      .catch(err => console.log(err ));
  }
  return (
    <div className="candidate_panel">
      <h1 title="Candidates Info">Candidates</h1>
      <div className="candidate_info">
        <h2 title="All Candidates" className="candidate_infoitem">
          <FiUsers />
          <span>{allUserRecords.length} </span>
        </h2>
        <h2 title="Payment Proceeded Candidates" className="candidate_infoitem">
          <FiUserCheck />
          <span>
            {allUserRecords.filter((i) => i.payment_proceeded).length}
          </span>
        </h2>
        <h2
          title="Payment Not Proceeded Candidates"
          className="candidate_infoitem"
        >
          <FiUserX />
          <span>
            {allUserRecords.filter((i) => !i.payment_proceeded).length}
          </span>
        </h2>
      </div>
      <input
        title="Search..."
        onChange={(e) => searchCandidate(e.target.value)}
        className="candidates_search"
        placeholder="Search candidates"
        type="text"
      />
      <select className="candidates_select" onChange={filterPaid} name="" id="">
        <option title="All Candidates" value="all">
          All user
        </option>
        <option title="Payment Proceeded Candidates" value="paid">
          Paid
        </option>
        <option title="Payment Not Proceeded Candidates" value="unpaid">
          Unpaid
        </option>
      </select>
      <div className="table__content">
        <table id="candidate__table">
          <thead>
            <tr className="table__rowHead">
              {allUserRecords.length ? (
                <th className="table__head-cell">№</th>
              ) : (
                <></>
              )}
              {allUserRecords &&
                Object.keys(tableHeadProperties).map((th, index) => (
                  <th key={index} className="table__head-cell">
                    {th.replaceAll("_", " ")}
                  </th>
                ))}
                <th className="table__head-cell">Delete user</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <NewLoader />
            ) : allUserRecordsFilter.length ? (
              allUserRecordsFilter.map((user, inx) => (
                <tr key={user._id} className="table__row">
                  <td className="table__head-cell">{inx + 1}</td>
                  <td
                    title={`candidate's firstname: ${user.firstname}`}
                    className="table__head-cell"
                  >
                    {user.firstname}
                  </td>
                  <td
                    title={`candidate's lastname: ${user.lastname}`}
                    className="table__head-cell"
                  >
                    {user.lastname}
                  </td>
                  <td
                    title={
                      user.payment_proceeded
                        ? "status: Paid"
                        : "status: Not Paid"
                    }
                    className="table__head-cell"
                  >
                    {user.phone}
                  </td>
                  <td
                    title={
                      user.payment_proceeded
                        ? "status: Paid"
                        : "status: Not Paid"
                    }
                    className={
                      user.payment_proceeded
                        ? "table__head-cell table__head-cellPaid"
                        : "table__head-cell table__head-cellUnaid"
                    }
                  >
                    {user.payment_proceeded ? "Paid" : "Not Paid"}{" "}
                  </td>
                  <td
                    title={`${user.firstname}'s gained score: ${user.gained_score}`}
                    className="table__head-cell"
                  >
                    {user.gained_score}{" "}
                  </td>
                  <td
                    className="table__head-cell"
                  >
                    {user.solved ? "Solved" : "Not Solved"}
                  </td>
                  <td className="table__head-cell">
                    <select
                      className="candidates_select"
                      onChange={(e) => collectThePaidIds(e, user._id)}
                    >
                      <option value="n" selected disabled>
                        Select the status
                      </option>
                      <option title="status: Not Paid" value="notpaid">
                        Not paid
                      </option>
                      <option title="status: Paid" value="paid">
                        Paid
                      </option>s
                    </select>{" "}
                  </td>
                  <td className="table__head-cell">
                    <button onClick={() => handleDelteUser(user._id)}>Delete User</button>
                  </td>
                </tr>
              ))
            ) : (
              <h1>No User records</h1>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Candidates;