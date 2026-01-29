import { toast } from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import {
  subsectionEndpoints,
} from "../endpoints";
import {
  setSubsectionLoading,
  addSubsection,
  updateSubsection as updateSubsectionState,
  removeSubsection,
  setSubsectionError,
} from "../../store/slices/subsectionSlice";


/* =========================================================
   CREATE SUBSECTION
========================================================= */
export const createSubSection = (formData) => async (dispatch) => {
  dispatch(setSubsectionLoading(true));
  try {
    const res = await apiConnector({
      method: "POST",
      url: subsectionEndpoints.CREATE_SUBSECTION,
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    });

    if (!res.data.success) throw new Error(res.data.message);

    dispatch(addSubsection(res.data.data));
    toast.success("Lecture added successfully");
  } catch (err) {
    dispatch(setSubsectionError(err.message));
    toast.error("Failed to add lecture");
  } finally {
    dispatch(setSubsectionLoading(false));
  }
};

/* =========================================================
   UPDATE SUBSECTION
========================================================= */
export const updateSubSection = (formData) => async (dispatch) => {
  dispatch(setSubsectionLoading(true));
  try {
    const res = await apiConnector({
      method: "PUT",
      url: subsectionEndpoints.UPDATE_SUBSECTION,
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    });

    if (!res.data.success) throw new Error(res.data.message);

    dispatch(updateSubsectionState(res.data.data));
    toast.success("Lecture updated successfully");
  } catch (err) {
    dispatch(setSubsectionError(err.message));
    toast.error("Failed to update lecture");
  } finally {
    dispatch(setSubsectionLoading(false));
  }
};

/* =========================================================
   DELETE SUBSECTION
========================================================= */
export const deleteSubSection = (subSectionId) => async (dispatch) => {
  dispatch(setSubsectionLoading(true));
  try {
    const res = await apiConnector({
      method: "DELETE",
      url: subsectionEndpoints.DELETE_SUBSECTION,
      data: { subSectionId },
    });

    if (!res.data.success) throw new Error(res.data.message);

    dispatch(removeSubsection(subSectionId));
    toast.success("Lecture deleted successfully");
  } catch (err) {
    dispatch(setSubsectionError(err.message));
    toast.error("Failed to delete lecture");
  } finally {
    dispatch(setSubsectionLoading(false));
  }
};
