import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Modal from "react-responsive-modal";
export class Wallets extends Component {
  constructor(props) {
    super(props);

    this.state = {
      wallets: null,
      open: false,
      wallet: null
    };
  }
  onOpenModal = id => {
    axios
      .get(`${process.env.REACT_APP_BACKEND}/api/wallet/${id}`)
      .then(wallet => {
        this.setState({ wallet: wallet.data.wallet, open: true });
      });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };
  componentDidMount() {
    axios
      .get(`${process.env.REACT_APP_BACKEND}/api/allwallets`)
      .then(wallets => {
        this.setState({ wallets: wallets.data });
      })
      .catch(err => {
        console.log(err);
      });
  }
  render() {
    const { open, wallet } = this.state;
    return this.state.wallets ? (
      <div className="content-wrapper">
        <div className="container-fluid">
          <div className="card mb-3">
            <div className="card-header">
              <div>
                <i className="fa fa-table" /> Wallets
                <Link
                  to="/admin/wallets/add-wallet"
                  className="btn btn-info float-right btn-sm"
                >
                  Add New Wallet
                </Link>
              </div>
            </div>
            <Modal open={open} onClose={this.onCloseModal} center>
              {wallet ? (
                <div className='container historyModal'>
                  <ul>
                    {wallet.history.map((event, key) => {
                      if (event.includes("subtract")) {
                        return <li className="text-danger">{event}</li>;
                      } else {
                        return <li className="text-success">{event}</li>;
                      }
                    })}
                  </ul>
                </div>
              ) : (
                <p>Loading</p>
              )}
            </Modal>
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
                      <th style={{ width: "30%" }}>Name</th>
                      <th style={{ width: "30%" }}>Group</th>
                      <th style={{ width: " 5%" }}>Coins</th>
                      <th style={{ width: "8.33%" }}>Actions</th>
                      <th style={{ width: "8.33%" }}>Actions</th>
                      <th style={{ width: "8.33%" }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.wallets.map((wallet, key) => {
                      return (
                        <tr key={key}>
                          <td>{wallet.name}</td>
                          <td>{wallet.group.name} </td>
                          <td>{wallet.coins}</td>
                          <td>
                            <button
                              onClick={this.onOpenModal.bind(null, wallet._id)}
                              className="btn btn-sm btn-success"
                            >
                              History
                            </button>
                          </td>
                          <td>
                            <button className="btn btn-sm btn-warning">
                              Edit
                            </button>
                          </td>
                          <td>
                            <button className="btn btn-sm btn-danger">
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
      <h1>Loading</h1>
    );
  }
}

export default Wallets;
