import * as Types from "../constants/genre";
import * as ITF from "../interfaces/genre";
import { Dispatch } from "redux";
import { toggleSnackbarWithoutThunk } from "./main";
import api from "../api";
import _ from "lodash";

export const getGenres = () => {
  return (dispatch: Dispatch) => {
    api.get("genres")
      .then((res) => {
        dispatch({
          type: Types.GET_GENRES,
          payload: res.data
        })
      })
      .catch((err) => console.log(err))
  }
}

export const getGenreById = (id: string) => {
  return (dispatch: Dispatch) => {
    api.get(`genres/${id}`)
      .then((res) => {
        dispatch({
          type: Types.GET_GENRE_BY_ID,
          payload: res.data,
        })
      })
      .catch((err) => console.log(err))
  }
}

export const addGenre = (data: ITF.Genre) => {
  return (dispatch: Dispatch) => {
    api.post("genres", data)
      .then((res) => {
        dispatch({
          type: Types.CREATE_GENRE,
          payload: res.data
        })
        dispatch(toggleSnackbarWithoutThunk(true, `Create successfully!`))
        _.debounce(() => { dispatch(toggleSnackbarWithoutThunk(false, '')) }, 2000)();
      })
      .catch((err) => {
        dispatch(toggleSnackbarWithoutThunk(true, `Somethings went wrong!`))
        _.debounce(() => { dispatch(toggleSnackbarWithoutThunk(false, '')) }, 2000)();
      })
  }
}

export const deleteGenre = (id: string) => {
  return (dispatch: Dispatch) => {
    api.delete(`genres/${id}`)
      .then((res) => {
        dispatch({
          type: Types.DELETE_GENRE,
          payload: id
        })

        dispatch(toggleSnackbarWithoutThunk(true, `Delete successfully!`))
        _.debounce(() => { dispatch(toggleSnackbarWithoutThunk(false, '')) }, 2000)();
      })
      .catch((err) => {
        dispatch(toggleSnackbarWithoutThunk(true, `Somethings went wrong!`))
        _.debounce(() => { dispatch(toggleSnackbarWithoutThunk(false, '')) }, 2000)();
      })
  }
}

export const updateGenre = (data: ITF.Genre, id: string) => {
  return (dispatch: Dispatch) => {
    api.put(`genres/${id}`, data)
      .then((res) => {
        dispatch({
          type: Types.UPDATE_GENRE,
          payload: { data, id }
        })

        dispatch({
          type: Types.GET_GENRE_BY_ID,
          payload: {}
        })

        dispatch(toggleSnackbarWithoutThunk(true, `Update successfully!`))
        _.debounce(() => { dispatch(toggleSnackbarWithoutThunk(false, '')) }, 2000)();
      })
      .catch((err) => {
        dispatch(toggleSnackbarWithoutThunk(true, `Somethings went wrong!`))
        _.debounce(() => { dispatch(toggleSnackbarWithoutThunk(false, '')) }, 2000)();
      })
  }
}