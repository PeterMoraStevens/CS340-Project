// This code was adapted from the class example found at https://canvas.oregonstate.edu/courses/1976520/files/107026031?wrap=1
// This page was developed by Kathryn

function showform(dowhat) {
    /*
    * four DIVS: browse, insert, update, delete
    * this function sets one visible the others not
    */
    if (dowhat == 'insert') {
      document.getElementById('browse').style.display = 'none';
      document.getElementById('insert').style.display = 'block';
      document.getElementById('update').style.display = 'none';
      document.getElementById('delete').style.display = 'none';
    }
    else if (dowhat == 'update') {
      document.getElementById('browse').style.display = 'none';
      document.getElementById('insert').style.display = 'none';
      document.getElementById('update').style.display = 'block';
      document.getElementById('delete').style.display = 'none';
    }
    else if (dowhat == 'delete') {
      document.getElementById('browse').style.display = 'none';
      document.getElementById('insert').style.display = 'none';
      document.getElementById('update').style.display = 'none';
      document.getElementById('delete').style.display = 'block';
    }
    else if (dowhat == 'all') {
      document.getElementById('browse').style.display = 'block';
      document.getElementById('insert').style.display = 'block';
      document.getElementById('update').style.display = 'block';
      document.getElementById('delete').style.display = 'block';
    }
    else { //by default display browse
      document.getElementById('browse').style.display = 'block';
      document.getElementById('insert').style.display = 'none';
      document.getElementById('update').style.display = 'none';
      document.getElementById('delete').style.display = 'none';
    }
  }
  function newAdmission() { showform('insert'); }
  function updateAdmission(pid) { showform('update'); }
  function deleteAdmission(pid) { showform('delete'); }
  function browseAdmission() { showform('browse'); }
  function showAll() { showform('all'); }