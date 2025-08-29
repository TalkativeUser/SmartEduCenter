import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface UiState {
  language: "en" | "ar"
  drawerOpen: boolean,
  modalIsOpen:boolean ,
  modalType: "addStudent" | 'editStudent'|'deleteStudent' | 'addClass' | 'editClass' | 'deleteClass' | 'addGroup' | 'editGroup' | 'deleteGroup' | null
}

const initialState: UiState = {
  language: "en",
  drawerOpen: true,
  modalIsOpen:false,
  modalType:null
}

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleLanguage: (state) => {
      state.language = state.language === "en" ? "ar" : "en"
    },
    setLanguage: (state, action: PayloadAction<"en" | "ar">) => {
      state.language = action.payload
    },
    toggleDrawer: (state) => {
      state.drawerOpen = !state.drawerOpen
    },
       toggleModal: (state, action: PayloadAction< "addStudent" | "editStudent" | "deleteStudent" | "addClass" | "editClass" | "deleteClass" | "addGroup" | "editGroup" | "deleteGroup" | null>) => {
      state.modalIsOpen =!state.modalIsOpen
      state.modalType=action.payload
    },
    setDrawerOpen: (state, action: PayloadAction<boolean>) => {
      state.drawerOpen = action.payload
    },
 

  },
})

export const { toggleLanguage, setLanguage, toggleDrawer, toggleModal  } = uiSlice.actions
export default uiSlice.reducer
