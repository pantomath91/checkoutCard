import React, { Fragment, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import styles from "./SpanningTable.css";

export default function SpanningTable() {
  
  let state = [
    {
      id: "1",
      image: "img",
      product_description: "Jet Sky1",
      value: "$500",
      quantity: 1
    },
    {
      id: "2",
      image: "img",
      product_description: "Jet Sky2",
      value: "$500",
      quantity: 1
    },
    {
      id: "3",
      image: "img",
      product_description: "Jet Sky3",
      value: "$500",
      quantity: 1
    }
  ];

  const [rows, setRows] = useState(state);
  // const [rows, setRows] = useState(state);
  const useStyles = makeStyles({
    table: {
      minWidth: 700
    }
  });

  let subtotal = rows => {
    let sum = 0;
    let item_price_list = rows.map(row => parseInt(row.value.replace("$", "")));
    let quantity = rows.map(row => parseInt(row.quantity));
    for (let i = 0; i < item_price_list.length; i++) {
      sum = sum + item_price_list[i] * quantity[i];
    }
    console.log(sum);
    return sum;
  }
  const TAX_RATE = 0;
  const invoiceTaxes = TAX_RATE * subtotal(rows);
  const invoiceTotal = invoiceTaxes + subtotal(rows);
  const classes = useStyles();
  let removeItem = rowId => {
    // Array.prototype.filter returns new array
    // so we aren't mutating state here
    const arrayCopy = rows.filter(row => row.id !== rowId);
    setRows(arrayCopy);
  };
  
  let handleChange = (id,event) => {
    for(let i=0;i<rows.length;i++){
   if(rows[i].id===id){
     rows[i].quantity=event.target.value
    };
  }
  setRows(rows);
  return subtotal(rows);
  };
  return (
    <Fragment>
      <div className="top-header">
        <div className="container">
          <div className="form-heading">
            <div className="page-heading">
              Order<span>Form</span>
            </div>
            <div className="cart">
              Cart <span>{rows.length}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="below-header">
          <div className="your-cart">Your Cart</div>
          <div className="breadcrumb">
            <div>Home</div>
            <div>Checkout</div>
          </div>
        </div>
      </div>

      <div className="container">
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="spanning table">
            <TableHead>
              <TableRow className="table-row-dark">
                <TableCell></TableCell>
                <TableCell>Product Name</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(row => (
                <TableRow key={row.id}>
                  <TableCell>{row.image}</TableCell>
                  <TableCell>{row.product_description}</TableCell>
                  <TableCell>{row.value}</TableCell>
                  <TableCell>
                    <input type="text" defaultValue={row.quantity} onChange={(event) => handleChange(row.id,event)}/>
                    <button>Update</button>
                  </TableCell>
                  <TableCell>
                    <button onClick={() => removeItem(row.id)}>X</button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <div className="container">
        <div className="bottom-bar">
          <div className="additional-comments">
            <h3>Adiitional Comments</h3>
            <textarea rows="6">
            </textarea>
          </div>

          <div className="delivery-info">
            <h3>Delivery Info</h3>
            <p>
              All order will be sent by special delivery, which will be insured
              and will need to be signed for. Allow 4-6 weeks for delivery
            </p>
          </div>

          <div className="cart-total">
            <div className="cart-table-row">
              <div>Sub Total</div>
              <div className="txt-bold">{subtotal(rows)}</div>
            </div>

            <div className="cart-table-row">
              <div>Tax</div>
              <div className="txt-bold">{invoiceTaxes}</div>
            </div>

            <div className="cart-table-row table-row-dark">
              <div>Total</div>
              <div className="txt-bold">{invoiceTotal}</div>
            </div>

            <div className="btn-checkout">
              <button className="btn-red">Checkout</button>
              <p>
                or <a href="#">Continue Shopping</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
