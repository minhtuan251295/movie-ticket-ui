import React from 'react';
import Types from "../constants/general";
import { Dispatch } from "redux";
import { toggleSnackbarWithoutThunk } from "./main";
import api from "../api";
import _ from "lodash";
import { connect } from "react-redux";

export default (WrapperComponent: any) => {
  const GeneralActions: React.SFC = (props: any) => {
    //GET DATA
    const getData = (type: string) => {
      const newType: string = "GET_" + _.upperCase(type);
      return api.get(`${type}`)
        .then((res) => {
          props.dispatchData(newType, res.data)
        })
        .catch((err) => console.log(err))

    }

    //GET DATA BY ID
    const getDataById = (type: string, typeSingular: string, id: string) => {
      const newType: string = "GET_" + _.upperCase(typeSingular) + "_BY_ID";
      return api.get(`${type}/${id}`)
        .then((res) => {
          console.log(res.data);
          props.dispatchData(newType, res.data)
        })
        .catch((err) => console.log(err))
    }

    //CREATE DATA
    const createData = (type: string, typeSingular: string, data: any) => {
      const newType: string = "CREATE_" + _.upperCase(typeSingular);
      api.post(`${type}`, data)
        .then((res) => {
          props.dispatchData(newType, res.data);
          props.dispatchSuccessMessage("Create")
        })
        .catch((err) => {
          props.dispatchFailMessage()
        })
    }

    //DELETE DATA
    const deleteData = (type: string, typeSingular: string, id: string) => {
      const newType: string = "DELETE_" + _.upperCase(typeSingular);
      api.delete(`${type}/${id}`)
        .then((res) => {
          props.dispatchData(newType, id);
          props.dispatchSuccessMessage("Delete")
        })
        .catch((err) => props.dispatchFailMessage())

    }

    //UPDATE DATA
    const updateData = (type: string, typeSingular: string, data: any, id: string) => {
      const newTypeUpdate: string = "UPDATE_" + _.upperCase(typeSingular);
      const newTypeGetById: string = "GET_" + _.upperCase(typeSingular) + "_BY_ID";
      api.put(`${type}/${id}`, data)
        .then((res) => {
          props.dispatchData(newTypeUpdate, { data, id });
          props.dispatchData(newTypeGetById, {});
          props.dispatchSuccessMessage("Update")
        })
        .catch((err) => props.dispatchFailMessage())
    }

    //RESET DATA
    const resetData = (typeSingular: string) => {
      const newTypeGetById: string = "GET_" + _.upperCase(typeSingular) + "_BY_ID";
      props.dispatchData(newTypeGetById, {});
    }

    const methods = { getData, getDataById, createData, deleteData, updateData, resetData };
    const newProps = _.omit(props, ['dispatchData', 'dispatchSuccessMessage', 'dispatchFailMessage']);

    return <WrapperComponent {...newProps} {...methods} />
  }

  const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
      dispatchData: (newType: string, data: any) => {
        dispatch({
          type: Types[`${newType}`],
          payload: data
        })
      },
      dispatchSuccessMessage: (type: string) => {
        dispatch(toggleSnackbarWithoutThunk(true, `${type} successfully!`))
        _.debounce(() => { dispatch(toggleSnackbarWithoutThunk(false, '')) }, 2000)();
      },
      dispatchFailMessage: () => {
        dispatch(toggleSnackbarWithoutThunk(true, `Somethings went wrong!`))
        _.debounce(() => { dispatch(toggleSnackbarWithoutThunk(false, '')) }, 2000)();
      }
    }
  }

  return connect(null, mapDispatchToProps)(GeneralActions);
};

