import React from "react";
import '../App.css'

function DeleteConfirmation({handleCloseDeleteBtn , handleDeleteRecords , recordsDeleted}) {
    return (
        <div class="flex delete-records-popup--container">
        <button class="btn-close-popup" onClick={handleCloseDeleteBtn}>X</button>
        <h2>Are you sure?</h2>
        <p>All your precious records? 😢</p>
        <button class="btn-nav-delete-records-popup" onClick={handleDeleteRecords} >Yes, <span class="clr-accent">delete</span>'em all</button>
      </div>
    )
}

export default DeleteConfirmation;