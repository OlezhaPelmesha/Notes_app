import React, { Suspense, useEffect } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import NoteItemPage from "./pages/NoteItemPage";
//import NoteEditPage from "./pages/NoteEditPage";
import ConfirmDelete from "./components/confirmPopUp/ConfirmDelete.jsx";
import { useDispatch } from "react-redux";
import { toggleConfirmAC } from "./store/notes/notesActions";
import ThemeToggle from "./components/themeToggle/ThemeToggle";
import { Loader } from "./components/loader/Loader";

const NoteEditPage = React.lazy(() => import("./pages/NoteEditPage"));
const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    document.body.addEventListener("click", closePopUP);

    return () => {
      document.body.removeEventListener(closePopUP);
    };
  }, []);
  const closePopUP = (e) => {
    if (
      document.querySelectorAll(".popup.active").length &&
      !e.target.classList.contains("popup_opener") &&
      !e.target.closest(".popup_opener")
    ) {
      const popups = [...document.querySelectorAll(".popup")];
      popups.forEach((el) => {
        el.classList.remove("active");
      });
    }
    if (
      !e.target.classList.contains("popupConfirm") &&
      !e.target.closest(".popupConfirm")
    ) {
      dispatch(toggleConfirmAC(false));
    }
  };

  return (
    <BrowserRouter>
      <div className="App">
        <ThemeToggle />
        <ConfirmDelete />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/note/:id" element={<NoteItemPage />} />
          <Route
            path="/note/edit/:id"
            element={
              <Suspense fallback={<Loader />}>
                <NoteEditPage />
              </Suspense>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
