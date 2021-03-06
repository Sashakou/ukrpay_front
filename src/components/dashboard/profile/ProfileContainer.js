import { connect } from "react-redux";
import { addUserDataCreator } from "../../../redux/userReducer";
import {  changeLoadingCreator } from "../../../redux/menuReducer";
import {withRouter} from "react-router-dom";



import Profile from "./Profile";

const mapStateToProps = (state) => {
    console.log(state);
    return {
        userState: state.userState,
        menuState: state.menuState
    }
}

let mapDispatchToProps = (dispatch) => {
    return {

        addUserData: (token, user_code, user_name, user_position, OPERATIONS) => {
            //console.log(`addPhoneNumberCreator - value ${value}`);
            dispatch(addUserDataCreator( token, user_code, user_name, user_position, OPERATIONS ) );
        },
        // showPopupTable: (value, typePopup) => {
        //     //console.log(val);
        //     dispatch(showPopupTableCreator( value, typePopup ) );
        // },
        // addTableData: (showTable, operation) => {
        //     console.log(operation);
        //     dispatch(addTableDataCreator(showTable, operation ) );
        // },
        changeLoading: (operation) => {
            dispatch(changeLoadingCreator( operation ) );
        }
        // operationName: (nameOperation, operation) => {
        //     dispatch(operationNameCreator( nameOperation, operation ) );
        // },

    }
}

let ProfileWithRouter = withRouter( Profile );


const ProfileContainer = connect(mapStateToProps, mapDispatchToProps)(ProfileWithRouter);

export default ProfileContainer;