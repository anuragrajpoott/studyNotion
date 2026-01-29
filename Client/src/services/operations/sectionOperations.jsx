import { toast } from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import {
  sectionEndpoints,
} from "../endpoints";
import {
  setSectionLoading,
  setSections,
  addSection,
  updateSection as updateSectionState,
  removeSection,
  setSectionError,
} from "../../store/slices/sectionSlice";


/* =========================================================
   CREATE SECTION
========================================================= */
export const createSection = (data) => async (dispatch) => {
  dispatch(setSectionLoading(true));
  try {
    const res = await apiConnector({
      method: "POST",
      url: sectionEndpoints.CREATE_SECTION,
      data,
    });

    if (!res.data.success) throw new Error(res.data.message);

    dispatch(addSection(res.data.data));
    toast.success("Section created successfully");
  } catch (err) {
    dispatch(setSectionError(err.message));
    toast.error("Failed to create section");
  } finally {
    dispatch(setSectionLoading(false));
  }
};

/* =========================================================
   UPDATE SECTION
========================================================= */
export const updateSection = (data) => async (dispatch) => {
  dispatch(setSectionLoading(true));
  try {
    const res = await apiConnector({
      method: "PUT",
      url: sectionEndpoints.UPDATE_SECTION,
      data,
    });

    if (!res.data.success) throw new Error(res.data.message);

    dispatch(updateSectionState(res.data.data));
    toast.success("Section updated successfully");
  } catch (err) {
    dispatch(setSectionError(err.message));
    toast.error("Failed to update section");
  } finally {
    dispatch(setSectionLoading(false));
  }
};

/* =========================================================
   DELETE SECTION
========================================================= */
export const deleteSection = (sectionId) => async (dispatch) => {
  dispatch(setSectionLoading(true));
  try {
    const res = await apiConnector({
      method: "DELETE",
      url: sectionEndpoints.DELETE_SECTION,
      data: { sectionId },
    });

    if (!res.data.success) throw new Error(res.data.message);

    dispatch(removeSection(sectionId));
    toast.success("Section deleted successfully");
  } catch (err) {
    dispatch(setSectionError(err.message));
    toast.error("Failed to delete section");
  } finally {
    dispatch(setSectionLoading(false));
  }
};

