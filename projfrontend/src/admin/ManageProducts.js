import React, { useState, useEffect } from "react";

import Base from "../core/Base";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import { getProducts, deleteProduct } from "./helper/adminapicall";

// Material UI Tables libraryPath
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import {MuiThemeProvider, createMuiTheme, FormControlLabel, Switch} from '@material-ui/core';

const columns = [
  { id: 'name', label: 'Product Name', minWidth: 100, font: 'bold'},
  { id: 'deletee', label: 'Delete Product', minWidth: 10, align: 'center' },
  { id: 'update', label: 'Update Product', minWidth: 10, align: 'center' },

];

function createData(name, deletee, update) {
  
  return { name, deletee, update };
  // return ({

  // })
}
// products.map((product, index) => {
        
// })



const useStyles = makeStyles({
  root: {
    width: '60%', //80 - 200 , 60-380
    position: "relative",
    top: "20px",
    left: "380px"

   
    
  },
  container: {
    maxHeight: 440,
  },
});






export const ManageProducts = () => {

  //MUI-1
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

//  console.log(rows.length)

  const [products, setProducts] = useState([]);

  const { user, token } = isAuthenticated();

  const preload = () => {
    getProducts().then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setProducts(data);
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  const deleteThisProduct = productId => {
    deleteProduct(productId, user._id, token).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        preload();
      }
    });
  };

  // console.log(products.length);
 // our updated functions
function updateButton(product) {
    return (
                <div className="col-12">
                  <Link
                    className="btn btn-success"
                    to={`/admin/product/update/${product._id}`}
                  >
                    <span className="">Update</span>
                  </Link>
                  </div>
    )
}

function updateDeleteButton(product){
  return (
            <div className="col-12">
                  <button
                    onClick={() => {
                      deleteThisProduct(product._id);
                    }}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </div>
  )
}


  var rows = [
  // createData(products.map(product=>{
  //   return product.name
  // }
  
  // ,'IN', 1324171354)),
  // createData('India', 12312312, 1324171354),
  // createData('India', 'IN', 1324171354),
  // createData('India', 'IN', 1324171354),
  // createData('India', 'IN', 1324171354),
  // createData('India', 'IN', 1324171354),

];

 products.map(product => {
    rows.push(createData(product.name, updateButton(product), updateDeleteButton(product)));
  })

  const [darkMode, setdarkMode] = useState(()=>{
    const mode = localStorage.getItem('_tableDarkMode')
    return mode ==="true" || false
  });
  const theme = createMuiTheme({
    palette: {
      type: darkMode ? 'dark' : 'light'
    }
  })
  const handleDarkModeChange = () => {
    setdarkMode(!darkMode)
    localStorage.setItem('_tableDarkMode', !darkMode)
  }
         

  return (
    <Base title="Welcome admin" description="Manage Your Products Here">
      {/* <h2 className="mb-4">All products:</h2> */}

      <Link className="btn btn-info" to={`/admin/dashboard`}>
        <span className="">Admin Home</span>
      </Link>

        {/* Material UI Table ---after including table  */}
       
        <MuiThemeProvider theme={theme}>
        
        <Paper  className={classes.root}>
      {/* darkmode */}
         <FormControlLabel
            value="top"
            control={<Switch color="darken" checked={darkMode}/>}
            onChange={handleDarkModeChange}
            labelPlacement="top"
        />

      <TableContainer className={classes.container}>
      
        <Table stickyHeader aria-label="sticky table" >

          <TableHead >
            <TableRow >
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code} >
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
    </MuiThemeProvider>

  {/* {products.map((product, index) => {
           
            return(
              rows.push(createData(product.name,product.name,product.name))
            )

         }
  } */}
           

            {/* before adding table */}
      {/* <div className="row"> */}
        {/* <div className="col-12"> */}
          {/* <h2 className="text-center text-white my-3">Total 3 products</h2> */}



          {/* {products.map((product, index) => { */}
           
            {/* return ( */}

              {/* <div key={index} className="row text-center mb-2 ">
                <div className="col-4">
                  <h3 className="text-white text-left">{product.name}</h3>
                </div> */}
                

                {/* update product Button*/}
                {/* <div className="col-4">
                  <Link
                    className="btn btn-success"
                    to={`/admin/product/update/${product._id}`}
                  >
                    <span className="">Update</span>
                  </Link>
                </div> */}


                {/* Delete product Button */}
                {/* <div className="col-4">
                  <button
                    onClick={() => {
                      deleteThisProduct(product._id);
                    }}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </div> */}


              {/* </div> */}
            {/* ); */}
          {/* })} */}
          
        {/* </div> */}
      {/* </div> */}



    </Base>
  );
};

export default ManageProducts;
