import React from "react";
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
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="spanning table">
        <TableHead>
          <TableRow>Orderform</TableRow>
          <div className="CartDiv">
            Cart<div>{rows.length}</div>
          </div>
          <TableRow>Your Cart</TableRow>
          <TableRow>
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
      <div className="parentDiv">
        <div className="LeftDiv">
          Adiitional Comments
          <textarea id="w3mission" rows="6" cols="50">
            At w3schools.com you will learn how to make a website. We offer free
            tutorials in all web development technologies.
          </textarea>
        </div>
        <div className="CenterDiv">
          Delivery Info
          <p>
            All order will be sent by special delivery, which will be insured
            and will need to be signed for. Allow 4-6 weeks for delivery
          </p>
        </div>
        <div className="parentDiv2">
          Tax<div className="CenterDiv">{invoiceTaxes}</div>
          Subtotal:<div className="CenterDiv">{invoiceSubtotal}</div>
          Total<div className="CenterDiv">{invoiceTotal}</div>
        </div>
      </div>
    </TableContainer>
  );
}
