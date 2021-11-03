import Swal from "sweetalert2";


export const CustomSwal = Swal.mixin({
  customClass: {
    confirmButton: 'btn btn-green m-1',
    cancelButton: 'btn btn-red m-1'
  },
  buttonsStyling: false
});

export const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
});