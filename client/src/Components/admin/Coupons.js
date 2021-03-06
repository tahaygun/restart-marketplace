
import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Loading from "../Loading";

export class Coupons extends Component {
  constructor(props) {
    super(props);

    this.state = {
      coupons: null
    };
  }

  getAllCoupons = () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND}/api/allcoupons`)
      .then(coupons => {
        this.setState({ coupons: coupons.data });
      })
      .catch(err => {
        console.log(err);
      });
  };

  deleteHandler(id) {
    axios
    .delete(process.env.REACT_APP_BACKEND + "/api/deletecoupon/" + id)
      .then(resp => {
        this.getAllCoupons();

        // this.props.history.pageRefresh();
      });
  }
  componentDidMount() {
    this.getAllCoupons();
  }

  render() {
    return this.state.coupons ? (
      <div className="content-wrapper">
        <div className="container-fluid">
          <div className="card mb-3">
            <div className="card-header">
              <div>
                <i className="fa fa-table" /> Coupon Codes
                <Link
                  to="/admin/couponcodes/add-coupon"
                  className="btn btn-info float-right btn-sm"
                >
                  Add New Coupon
                </Link>
              </div>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table
                  className="table table-bordered"
                  id="dataTable"
                  width="100%"
                  cellSpacing="0"
                >
                  <thead>
                    <tr>
                      <th style={{ width: "80%" }}>Coupon Code</th>
                      <th style={{ width: "20%" }}>Actions</th>
                    
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.coupons.map((coupon,key) => {
                      return (
                        <tr key={key} >
                          <td>{coupon.couponCode}</td> 
                          <td>
                          <button
                              onClick={() => {
                                if (
                                  window.confirm(
                                    "Are you sure you wish to delete this coupon?"
                                  )
                                ) {
                                  this.deleteHandler(coupon._id);
                                }
                              }}
                              className="btn btn-danger"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    ) : (
      <Loading/>
    );
  }
}

export default Coupons;
