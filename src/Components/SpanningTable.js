import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import styles from "./SpanningTable.css";

const TAX_RATE = 0;

const useStyles = makeStyles({
  table: {
    minWidth: 700
  }
});

function ccyFormat(num) {
  //   return `${num.toFixed(2)}`;
}

function priceRow(qty, unit) {
  return qty * unit;
}

function createRow(img, desc, price, qty, removed) {
  return { img, desc, price, qty, removed };
}

function subtotal(items) {
  let sum = 0;
  let number = items.map(({ price }) => parseInt(price.replace("$", "")));
  let quantity = items.map(({ qty }) =>
    parseInt(qty.props.children[0].props.value)
  );
  console.log(quantity);
  for (let i = 0; i < number.length; i++) {
    sum = sum + number[i] * quantity[i];
  }
  return sum;
}

const rows = [
  createRow(
    "img",
    "Jet Sky1",
    "$500",
    <div>
      <input type="text" value="1"></input>
      <button>Update</button>
    </div>,
    "yes"
  ),
  createRow(
    "img",
    "Jet Sky2",
    "$500",
    <div>
      <input type="text" value="1"></input>
      <button>Update</button>
    </div>,
    "yes"
  ),
  createRow(
    "img",
    "Jet Sky3",
    "$500",
    <div>
      <input type="text" value="1"></input>
      <button>Update</button>
    </div>,
    "yes"
  )
];

let removeItem = event => {
  let quantity = rows.map(({ qty }) => parseInt(qty));
  quantity.splice(0, 1);
};

const invoiceSubtotal = subtotal(rows);
const invoiceTaxes = TAX_RATE * invoiceSubtotal;
const invoiceTotal = invoiceTaxes + invoiceSubtotal;

export default function SpanningTable() {
  const classes = useStyles();

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
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(row => (
                <TableRow>
                  <TableCell>{row.img}</TableCell>
                  <TableCell>{row.desc}</TableCell>
                  <TableCell>{row.price}</TableCell>
                  <TableCell>{row.qty}</TableCell>
                  <TableCell>
                    <button onClick={removeItem}>remove</button>
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
              At w3schools.com you will learn how to make a website. We offer
              free tutorials in all web development technologies.
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
              <div className="txt-bold">{invoiceSubtotal}</div>
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
