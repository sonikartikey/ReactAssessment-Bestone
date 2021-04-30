import React from 'react';
import axios from 'axios';
import './dataTable.css';
import MaterialTable from "material-table";
import tableIcons from './static/materialTableIcons';

class DataTable extends React.Component {
  constructor() {
    super()
    this.state = {
      employees: [],
      addEmployee:{
        id:null,
        Name:"",
        Email:"",
        Designation:"",
      }
    }
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    axios.get("https://608c69279f42b20017c3de06.mockapi.io/employee/v1/employee")
      .then(result =>
        this.setState({
          employees: result.data,
          isLoading: false
        })
      )
      .catch(error =>
        this.setState({
          error,
          isLoading: false
        })
      );
  }


  employeeDetails = () => {
    const columns = [
      {
        title: "Employee Id",
        field: "id",
        headerStyle: {

        }
      },

      {
        title: "Employee Name",
        field: "Name",
      },
      {
        title: "Employee Email",
        field: "Email",
      },
      {
        title: "Designation",
        field: "Designation",
      },
    ];

    const options = {
      search:false,
      headerStyle: {
        backgroundColor: "darkseagreen",
        fontFamily: "unset",
        fontStyle: "oblique",
      },
      rowStyle:{
        border:"1px solid"
      },
      // cellStyle:{
      //   border:"1px solid"
      // }

    }

    const localization = {
      pagination: {
        labelDisplayedRows: '{from}-{to} of {count}'
      },

      toolbar: {
        nRowsSelected: '{0} row(s) selected'
      },
      header: {
        actions: 'Actions'
      },
      body: {
        emptyDataSourceMessage: 'No records to display',
        filterRow: {
          filterTooltip: 'Filter'
        }
      }
    };


    const editable={
      onRowAdd: newData =>
        

          axios.post("https://608c69279f42b20017c3de06.mockapi.io/employee/v1/employee/" , newData)
          .then(response=>{
            console.log(response)
          })
          .catch(function(error){
            console.log(error)
          })
          // setTimeout(() => {
          //   console.log(newData)
          //   (newData);
            
      
          // , 1000)
        
      }
    return (
      <div className="empDataTable">
        <MaterialTable
          title="Employee Details"
          icons={tableIcons}
          columns={columns}
          data={this.state.employees}
          options={options}
          localization={localization}
          editable={editable}

        />
      </div>
    )
  }

  render() {
    if (this.state.isLoading) {
      return "Loading..."
    }
    if (this.state.error) {
      return <p>{this.state.error.message}</p>
    }
    return (<React.Fragment>
      {/* <h2>Employees</h2>
      <table style={{ width: '60%' }} className='table'>
        <thead className="thead-light">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Position</th>
          </tr>
        </thead>
        <tbody>
          {this.state.employees ?
            this.state.employees.map(employee => {
              return (<tr key={employee.empId}>
                <td>{employee.empId}</td>
                <td>{employee.name}</td>
                <td>{employee.designation}</td>
              </tr>
              )
              
            }) : <tr><td>No Data found</td></tr>
          }
          <button>+ New</button>
        </tbody>
      </table> */}

      {this.state.employees ? this.employeeDetails() : "Loading data"}

    </React.Fragment>
    )
  }
}

export default DataTable;