import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'
import React from "react";
import * as axios from "axios";

const cellEditProp = {
    mode: 'click'
};

class TableADMIN_OPERATIONS extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tableData:null,
            columns: [
                { id: 'id', text: 'Id' },
                { id: 'name', text: 'Name' },
                { id: 'animal', text: 'Animal' },
            ],
            data:[
                { id: 1, name: 'George', animal: 'Monkey' },
                { id: 2, name: 'Jeffrey', animal: 'Giraffe' },
                { id: 3, name: 'Alice', animal: 'Giraffe' },
                { id: 4, name: 'Alice', animal: 'Tiger' }
            ]

        }
        //console.log(this.data.sort());
    }
    componentDidMount() {
        this.requestADMIN_OPERATIONS(this.props.store.userState.token);

    }
    async requestADMIN_OPERATIONS  (token) {
        this.props.store.changeLoading(true);
        console.log( token );
        const baseUrl = `/api/Operations`;
        await axios.get(
            baseUrl,
            {
                headers: {
                    "Token" : `${ token }`
                }
            }
        )
            .then((response) => {
                console.log(response.data);
                //console.log(response.data.users);
                //console.log(response.data.Table);


                //this.props.store.showTable(true);

                //this.props.store.addTableData(true, response.data.operations);
                this.setState({
                    tableData: response.data.operations
                });

                this.props.store.changeLoading(false);
                //this.props.store.showTable(true);

            })
            .catch((error) => {
                console.log(error.response);
                console.log(error.response.data);
                //console.log('error_catch');

            });

    }
    activeOperation = (operationArr, operation) => {
        let res;
        operationArr.map(( item , index) => {
            if(item.operation == operation){
                console.log(item.name);
                res = item.name;
            }
        })
        return res;
    }

    render() {
        console.log(this.props.store.menuState.tableData);
        const onDeleteRow = (rowKeys) => {
            console.log(rowKeys);
            //alert('You deleted: ' + rowKeys)
            let res;
            // for(let i = 0; i != rowKeys.length; i++){
            //     res = this.state.columns.filter((item) => {
            //         return item.id == rowKeys[i]
            //     })
            // }
            localStorage.setItem("rows", JSON.stringify(this.state.columns))
            console.log(res);
            console.log(rowKeys);
        }
        const onInsertRow = (row) => {
            let newRowStr = ''
            for (const prop in row) {
                //console.log(row);
                newRowStr += prop + ': ' + row[prop] + ' \n'
                //obj.prop.row[prop]
            }
            //console.log(newRowStr);
            console.log(row);
            //alert('You inserted:\n ' + newRowStr)
        }
        const cellEditFactory = {
            mode: 'click',
            blurToSave: true,
            nonEditableRows: () => [0, 3],
            beforeSaveCell(oldValue, newValue, row, column, done) {
                // console.log( oldValue );
                // console.log( newValue );
                // console.log( row );
                // console.log( column );
                // console.log( done );
                // console.log( '-----------------' );
                // setTimeout(() => {
                //     if (window.confirm('Do you want to accep this change?')) {
                //         done(); // contine to save the changes
                //     } else {
                //         done(false); // reject the changes
                //     }
                // }, 0);
                // return { async: true };
            },
            afterSaveCell: (oldValue, newValue, row, column) => {
                console.log( oldValue );
                // console.log( newValue );
                // console.log( row );
                // console.log( column );
                // console.log( '-----------------' );
            }
        }
        const selectRowProp = {
            mode: 'checkbox'
        }
        const options = {
            afterInsertRow: onInsertRow,
            afterDeleteRow: onDeleteRow
        }
        return (
            <div className="coverTable">
                <div className="headerTable">
                    <div className="titleTable">{this.activeOperation(this.props.store.userState.OPERATIONS, this.props.store.location.pathname.substr(11))}</div>
                    <div className="optionBlock"></div>
                </div>
                <div className="innerTable">
                    <div className="Table">
                        <BootstrapTable data={this.state.tableData}
                                        //insertRow={true}
                                        //deleteRow={true}
                                        //selectRow={selectRowProp}
                                        //options={options}
                                        //cellEdit={cellEditFactory}
                        >

                            {/*{this.testRendColums}*/}

                            <TableHeaderColumn isKey dataField='name' filter={ { type: 'TextFilter', delay: 1000 } }>
                                ????'?? ????????????????
                            </TableHeaderColumn>
                            <TableHeaderColumn dataField='operation' filter={ { type: 'TextFilter', delay: 1000 } }>
                                ????????????????
                            </TableHeaderColumn>
                            <TableHeaderColumn dataField='parent_operation' filter={ { type: 'TextFilter', delay: 1000 } }>
                                ?????????????????????? ????
                            </TableHeaderColumn>

                        </BootstrapTable>
                    </div>
                </div>
            </div>

        );
    }
}

export default TableADMIN_OPERATIONS