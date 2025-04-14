import { useQuery } from "@apollo/client";
import React from "react";
import { useTranslation } from "react-i18next";
import { DASHBOARD_STATS } from "../../graphql/admin";
import { numberFormat } from "../utilities/helpers";
// import { numberFormat } from "../../utils/misc";

export default function Dashboard1() {
  const { data, loading } = useQuery(DASHBOARD_STATS);

  return (
    <div className="row">
      <div className="col-lg-12">
        <div className="row">
          <div className="col-lg-3 col-md-6">
            <StatisticsCard
              label={"Partners"}
              icon={"bi-person"}
              value={loading ? "-" : data?.stats?.partners}
            />
          </div>
          <div className="col-lg-3 col-md-6">
            <StatisticsCard
              label={"Members"}
              icon={"bi-person"}
              value={loading ? "-" : data?.stats?.members}
            />
          </div>
          <div className="col-lg-3 col-md-6">
            <StatisticsCard
              label={"Prophetic School Sessions"}
              icon={"bi-person"}
              value={loading ? "-" : data?.stats?.propheticSchoolSessions || 0}
            />
          </div>
          <div className="col-lg-3 col-md-6">
            <StatisticsCard
              label={"Blogs"}
              icon={"bi-person"}
              value={loading ? "-" : data?.stats?.blogs}
            />
          </div>

          <div className="col-lg-4 col-md-6">
            <StatisticsCard
              label={"Visitors"}
              icon={"bi-person"}
              value={loading ? "-" : data?.stats?.visitors}
            />
          </div>
          <div className="col-lg-4 col-md-4">
            <StatisticsCard
              label={"Foreign Transactions"}
              icon={"bi-person"}
              value={
                loading ? "-" : numberFormat(data?.stats?.foreign_txn) + " USD"
              }
            />
          </div>
          <div className="col-lg-4 col-md-6">
            <StatisticsCard
              label={"Local Transactions"}
              icon={"bi-person"}
              value={
                loading ? "-" : numberFormat(data?.stats?.local_txn) + " ETB"
              }
            />
          </div>

          <DataTable
            loading={loading}
            recentTransactions={data?.stats?.recentTransactions}
          />
        </div>
      </div>
    </div>
  );
}

function DataTable({ loading, recentTransactions }) {
  const { t } = useTranslation();

  return (
    <div className="col-12">
      <div className="card recent-sales overflow-auto">
        <div className="card-body">
          <h5 className="card-title">
            {t("Recent Transactions")}
            {/* <span>| 23, 789, 123 ETB</span> */}
          </h5>

          <table className="table table-borderless datatable">
            <thead>
              <tr>
                <th scope="col">{t("Transaction #")}</th>
                <th scope="col">{t("From")}</th>
                <th scope="col">{t("Payment Method")}</th>
                <th scope="col">{t("Amount")}</th>
                <th scope="col">{t("Date")}</th>
                <th scope="col">{t("Status")}</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <></>
              ) : (
                recentTransactions?.map((tx) => (
                  <tr key={tx?.tx_ref}>
                    <th scope="row">
                      <a href="#">{tx?.tx_ref}</a>
                    </th>
                    <td>{tx?.first_name + " " + tx?.last_name}</td>
                    <td>{tx?.payment_method}</td>

                    <td>
                      {numberFormat(tx.amount) +
                        " " +
                        (tx.payment_method === "Paypal" ? "USD" : "ETB")}{" "}
                    </td>
                    <td>{new Date(tx?.createdAt).toLocaleDateString()}</td>
                    <td>
                      <span className="badge bg-success">{tx?.status}</span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatisticsCard({ label, icon, value }) {
  return (
    <div className="card info-card sales-card">
      {/* <div className="filter">
        <a className="icon" href="#" data-bs-toggle="dropdown">
          <i className="bi bi-three-dots"></i>
        </a>
        <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
          <li className="dropdown-header text-start">
            <h6>Filter</h6>
          </li>

          <li>
            <a className="dropdown-item" href="#">
              Today
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="#">
              This Month
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="#">
              This Year
            </a>
          </li>
        </ul>
      </div> */}

      <div className="card-body">
        <h5 className="card-title">
          {label}
          {/* <span>| Today</span> */}
        </h5>

        <div className="d-flex align-items-center">
          <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
            <i className={"bi " + icon}></i>
          </div>
          <div className="ps-3">
            <h6>{value}</h6>
            {/* <span className="text-success small pt-1 fw-bold">12%</span>
            <span className="text-muted small pt-2 ps-1">increase</span> */}
          </div>
        </div>
      </div>
    </div>
  );
}
