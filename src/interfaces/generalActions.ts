interface GeneralActions {
  getData: (type: string) => void,
  getDataById: (type: string, typeSingular: string, id: string) => void,
  createData: (type: string, typeSingular: string, data: any) => void,
  deleteData: (type: string, typeSingular: string, id: string) => void,
  updateData: (type: string, typeSingular: string, data: any, id: string) => void,
  resetData: (typeSingular: string) => void,
}

export default GeneralActions;